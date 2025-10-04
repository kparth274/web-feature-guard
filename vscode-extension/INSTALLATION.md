# VS Code Extension Installation Guide

## Development Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- VS Code 1.80.0 or higher

### Building the Extension

1. **Navigate to the extension directory:**
   ```bash
   cd vscode-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile TypeScript:**
   ```bash
   npm run compile
   ```

4. **Test the extension locally:**
   - Press `F5` in VS Code to open a new Extension Development Host window
   - Or run: `code --extensionDevelopmentPath=/path/to/vscode-extension`

### Packaging for Distribution

1. **Install vsce (VS Code Extension Manager):**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Package the extension:**
   ```bash
   npm run package
   ```
   This creates a `.vsix` file in the current directory.

3. **Install the packaged extension:**
   ```bash
   code --install-extension baseline-auto-linter-1.0.0.vsix
   ```

### Publishing to Marketplace

1. **Create a publisher account:**
   - Go to https://marketplace.visualstudio.com/manage
   - Create a new publisher ID

2. **Get a Personal Access Token (PAT):**
   - Go to https://dev.azure.com
   - Create a PAT with `Marketplace (publish)` scope

3. **Login with vsce:**
   ```bash
   vsce login <publisher-name>
   ```

4. **Publish the extension:**
   ```bash
   npm run publish
   ```

## Quick Install (For Users)

Once published, users can install the extension in three ways:

### Method 1: VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Baseline Auto-Linter"
4. Click Install

### Method 2: Command Line
```bash
code --install-extension baseline-auto-linter
```

### Method 3: Manual Installation
1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions
4. Click "..." menu → "Install from VSIX..."
5. Select the downloaded file

## Configuration

After installation, configure the extension in VS Code settings:

```json
{
  "baselineLinter.enableDiagnostics": true,
  "baselineLinter.severity": "warning",
  "baselineLinter.showBaselineStatus": true
}
```

## Usage

1. Open any JavaScript, TypeScript, CSS, or HTML file
2. The extension automatically analyzes your code
3. Hover over web features to see compatibility information
4. View all issues in the Problems panel (Ctrl+Shift+M / Cmd+Shift+M)

### Commands

Access commands via Command Palette (Ctrl+Shift+P / Cmd+Shift+P):

- `Baseline: Check Web Compatibility` - Run manual check
- `Baseline: Clear Compatibility Diagnostics` - Clear all warnings

## Troubleshooting

### Extension Not Working

1. **Check the Output panel:**
   - View → Output
   - Select "Baseline Auto-Linter" from dropdown

2. **Reload VS Code:**
   - Press Ctrl+Shift+P / Cmd+Shift+P
   - Type "Reload Window"

3. **Verify extension is activated:**
   - Check Extensions panel
   - Ensure Baseline Auto-Linter is enabled

### No Diagnostics Appearing

1. Verify file language is supported (JS/TS/CSS/HTML)
2. Check settings: `baselineLinter.enableDiagnostics` is true
3. Try running manual check command

### Performance Issues

1. Disable for large files if needed
2. Adjust debounce timing in extension settings
3. Use manual check mode instead of auto-check

## Development

### Project Structure
```
vscode-extension/
├── src/
│   ├── extension.ts       # Main extension entry point
│   └── linter-engine.ts   # Linting logic
├── dist/                  # Compiled output
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
└── README.md            # Documentation
```

### Making Changes

1. Edit source files in `src/`
2. Run `npm run compile` or `npm run watch`
3. Press F5 to test changes
4. Reload extension host window to see updates

### Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [web-features Package](https://www.npmjs.com/package/web-features)
- [Baseline Documentation](https://web.dev/baseline)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
