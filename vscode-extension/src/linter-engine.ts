import { features } from 'web-features';

export interface LinterResult {
  feature: string;
  line: number;
  column: number;
  type: 'success' | 'warning' | 'destructive';
  message: string;
  support: {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
    edge: boolean;
  };
  suggestion?: string;
  mdn?: string;
}

const featureMapping: Record<string, string> = {
  // JavaScript APIs
  "navigator.share": "web-share",
  "Array.flatMap": "array-flat",
  "fetch": "fetch",
  "Array.prototype.at": "array-at",
  "Object.hasOwn": "object-hasown",
  "structuredClone": "structured-clone",
  
  // CSS Properties
  "backdrop-filter": "backdrop-filter",
  "scroll-behavior": "css-scroll-behavior",
  "container-type": "container-queries",
  "background-clip": "background-clip-text",
  "aspect-ratio": "aspect-ratio",
  "gap": "flexbox-gap",
  ":has": "css-has",
  "color-scheme": "color-scheme",
  
  // HTML Elements
  "dialog": "dialog",
  "input[type=color]": "input-color",
  "input[type=date]": "input-date",
  "details": "details-summary"
};

export class LinterEngine {
  private getFeatureStatus(featureId: string) {
    const feature = features[featureId as keyof typeof features];
    
    if (!feature) {
      return null;
    }

    const status = feature.status;
    const baseline = status?.baseline;
    
    let type: 'success' | 'warning' | 'destructive' = 'success';
    let message = '';
    
    if (baseline === 'high') {
      type = 'success';
      message = `${feature.name} - Widely available across all major browsers`;
    } else if (baseline === 'low') {
      type = 'warning';
      message = `${feature.name} - Newly available. May need fallbacks for older browsers`;
    } else {
      type = 'destructive';
      message = `${feature.name} - Limited availability. Consider using alternatives or polyfills`;
    }

    const support = {
      chrome: !!status?.support?.chrome,
      firefox: !!status?.support?.firefox,
      safari: !!status?.support?.safari,
      edge: !!status?.support?.edge
    };

    return {
      type,
      message,
      support,
      name: feature.name,
      description: feature.description,
      baselineStatus: baseline
    };
  }

  public lint(code: string, language: string): LinterResult[] {
    const lines = code.split('\n');
    
    switch (language) {
      case 'javascript':
      case 'typescript':
      case 'javascriptreact':
      case 'typescriptreact':
        return this.lintJavaScript(lines);
      case 'css':
        return this.lintCSS(lines);
      case 'html':
        return this.lintHTML(lines);
      default:
        return [];
    }
  }

  public findFeatureForText(word: string, line: string, language: string): string | null {
    // Map common patterns to feature IDs
    const patterns: Record<string, string> = {
      'share': 'web-share',
      'flatMap': 'array-flat',
      'fetch': 'fetch',
      'backdrop-filter': 'backdrop-filter',
      'container-type': 'container-queries',
      'dialog': 'dialog',
      ':has': 'css-has',
      'aspect-ratio': 'aspect-ratio'
    };

    for (const [pattern, featureId] of Object.entries(patterns)) {
      if (line.includes(pattern)) {
        return featureId;
      }
    }

    return null;
  }

  private lintJavaScript(lines: string[]): LinterResult[] {
    const results: LinterResult[] = [];
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for various JavaScript features
      const checks = [
        { pattern: 'navigator.share', key: 'navigator.share', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share' },
        { pattern: '.flatMap', key: 'Array.flatMap', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap' },
        { pattern: 'fetch(', key: 'fetch', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
        { pattern: '.at(', key: 'Array.prototype.at', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at' },
        { pattern: 'Object.hasOwn', key: 'Object.hasOwn', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn' },
        { pattern: 'structuredClone', key: 'structuredClone', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/structuredClone' },
        { pattern: 'backdropFilter', key: 'backdrop-filter', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter' }
      ];

      for (const check of checks) {
        if (line.includes(check.pattern)) {
          const featureId = featureMapping[check.key];
          const featureData = this.getFeatureStatus(featureId);
          
          if (featureData) {
            results.push({
              feature: check.key,
              line: lineNumber,
              column: line.indexOf(check.pattern) + 1,
              type: featureData.type,
              message: featureData.message,
              support: featureData.support,
              suggestion: featureData.baselineStatus === false ? `Consider providing a polyfill or fallback for ${featureData.name}` : undefined,
              mdn: check.mdn
            });
          }
        }
      }
    });
    
    return results;
  }

  private lintCSS(lines: string[]): LinterResult[] {
    const results: LinterResult[] = [];
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      const checks = [
        { pattern: 'backdrop-filter:', key: 'backdrop-filter', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter' },
        { pattern: 'scroll-behavior:', key: 'scroll-behavior', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior' },
        { pattern: 'container-type:', key: 'container-type', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries' },
        { pattern: 'aspect-ratio:', key: 'aspect-ratio', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' },
        { pattern: ':has(', key: ':has', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has' },
        { pattern: 'color-scheme:', key: 'color-scheme', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme' }
      ];

      for (const check of checks) {
        if (line.includes(check.pattern)) {
          const featureId = featureMapping[check.key];
          const featureData = this.getFeatureStatus(featureId);
          
          if (featureData) {
            results.push({
              feature: check.key,
              line: lineNumber,
              column: line.indexOf(check.pattern) + 1,
              type: featureData.type,
              message: featureData.message,
              support: featureData.support,
              suggestion: featureData.baselineStatus === false ? `Use @supports (${check.pattern.replace(':', '')}) for fallback` : undefined,
              mdn: check.mdn
            });
          }
        }
      }
    });
    
    return results;
  }

  private lintHTML(lines: string[]): LinterResult[] {
    const results: LinterResult[] = [];
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      const checks = [
        { pattern: '<dialog', key: 'dialog', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog' },
        { pattern: 'type="color"', key: 'input[type=color]', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color' },
        { pattern: 'type="date"', key: 'input[type=date]', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date' },
        { pattern: '<details', key: 'details', mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details' }
      ];

      for (const check of checks) {
        if (line.includes(check.pattern)) {
          const featureId = featureMapping[check.key];
          const featureData = this.getFeatureStatus(featureId);
          
          if (featureData) {
            results.push({
              feature: check.key,
              line: lineNumber,
              column: line.indexOf(check.pattern) + 1,
              type: featureData.type,
              message: featureData.message,
              support: featureData.support,
              mdn: check.mdn
            });
          }
        }
      }
    });
    
    return results;
  }
}
