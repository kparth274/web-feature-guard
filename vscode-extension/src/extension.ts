import * as vscode from 'vscode';
import { features } from 'web-features';
import { LinterEngine } from './linter-engine';

let diagnosticCollection: vscode.DiagnosticCollection;
let linterEngine: LinterEngine;

export function activate(context: vscode.ExtensionContext) {
  console.log('Baseline Auto-Linter extension is now active!');

  // Initialize diagnostic collection
  diagnosticCollection = vscode.languages.createDiagnosticCollection('baseline');
  context.subscriptions.push(diagnosticCollection);

  // Initialize linter engine
  linterEngine = new LinterEngine();

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('baselineLinter.checkFile', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        lintDocument(editor.document);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('baselineLinter.clearDiagnostics', () => {
      diagnosticCollection.clear();
    })
  );

  // Register hover provider for all supported languages
  const hoverProvider = vscode.languages.registerHoverProvider(
    ['javascript', 'typescript', 'javascriptreact', 'typescriptreact', 'css', 'html'],
    {
      provideHover(document, position) {
        return provideBaselineHover(document, position);
      }
    }
  );
  context.subscriptions.push(hoverProvider);

  // Lint on file open and save
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(lintDocument),
    vscode.workspace.onDidSaveTextDocument(lintDocument),
    vscode.workspace.onDidChangeTextDocument(event => {
      // Debounce changes
      setTimeout(() => lintDocument(event.document), 500);
    })
  );

  // Lint all open documents
  vscode.workspace.textDocuments.forEach(lintDocument);
}

function lintDocument(document: vscode.TextDocument) {
  const config = vscode.workspace.getConfiguration('baselineLinter');
  if (!config.get('enableDiagnostics', true)) {
    return;
  }

  const language = document.languageId;
  if (!['javascript', 'typescript', 'javascriptreact', 'typescriptreact', 'css', 'html'].includes(language)) {
    return;
  }

  const diagnostics: vscode.Diagnostic[] = [];
  const text = document.getText();
  const lines = text.split('\n');

  const results = linterEngine.lint(text, language);

  for (const result of results) {
    const line = document.lineAt(result.line - 1);
    const range = new vscode.Range(
      result.line - 1,
      result.column - 1,
      result.line - 1,
      line.text.length
    );

    const severity = result.type === 'destructive' 
      ? vscode.DiagnosticSeverity.Error
      : result.type === 'warning'
      ? vscode.DiagnosticSeverity.Warning
      : vscode.DiagnosticSeverity.Information;

    const diagnostic = new vscode.Diagnostic(
      range,
      result.message,
      severity
    );

    diagnostic.source = 'Baseline';
    diagnostic.code = result.feature;

    if (result.suggestion) {
      diagnostic.message += `\n\n💡 Suggestion: ${result.suggestion}`;
    }

    diagnostics.push(diagnostic);
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

function provideBaselineHover(
  document: vscode.TextDocument,
  position: vscode.Position
): vscode.Hover | undefined {
  const config = vscode.workspace.getConfiguration('baselineLinter');
  if (!config.get('showBaselineStatus', true)) {
    return undefined;
  }

  const range = document.getWordRangeAtPosition(position);
  if (!range) {
    return undefined;
  }

  const word = document.getText(range);
  const line = document.lineAt(position.line).text;

  // Try to find matching feature
  const featureId = linterEngine.findFeatureForText(word, line, document.languageId);
  if (!featureId) {
    return undefined;
  }

  const feature = features[featureId as keyof typeof features];
  if (!feature) {
    return undefined;
  }

  let statusBadge = '';
  let statusText = '';
  let baseline: string | undefined;
  let status: any;

  // ✅ Type guard fix — only FeatureData has 'status'
  if ('status' in feature && feature.status) {
    status = feature.status;
    baseline = status.baseline;

    if (baseline === 'high') {
      statusBadge = '✅';
      statusText = '**Widely Available** - Safe to use across all major browsers';
    } else if (baseline === 'low') {
      statusBadge = '⚠️';
      statusText = '**Newly Available** - Available in latest browsers, consider fallbacks for older versions';
    } else {
      statusBadge = '❌';
      statusText = '**Limited Availability** - Not widely supported, use with caution';
    }
  } else {
    statusBadge = '❓';
    statusText = '**Status Unknown** - Feature information unavailable';
  }

  const markdown = new vscode.MarkdownString();
  markdown.isTrusted = true;
  markdown.supportHtml = true;

  // ✅ Safe name access for all feature types
  const featureName = 'name' in feature && feature.name ? feature.name : featureId;
  markdown.appendMarkdown(`${statusBadge} **${featureName}**\n\n`);

  markdown.appendMarkdown(`${statusText}\n\n`);

  if ('description' in feature && feature.description) {
    markdown.appendMarkdown(`${feature.description}\n\n`);
  }

  if (status?.support) {
    markdown.appendMarkdown(`**Browser Support:**\n\n`);
    markdown.appendMarkdown(`- Chrome: ${status.support.chrome || 'Not supported'}\n`);
    markdown.appendMarkdown(`- Firefox: ${status.support.firefox || 'Not supported'}\n`);
    markdown.appendMarkdown(`- Safari: ${status.support.safari || 'Not supported'}\n`);
    markdown.appendMarkdown(`- Edge: ${status.support.edge || 'Not supported'}\n\n`);
  }

  if ('spec' in feature && feature.spec) {
    markdown.appendMarkdown(`[View Specification](${feature.spec})\n`);
  }

  return new vscode.Hover(markdown, range);
}


export function deactivate() {
  if (diagnosticCollection) {
    diagnosticCollection.dispose();
  }
}
