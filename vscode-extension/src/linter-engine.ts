// Import JSON data directly to avoid Node.js dependencies
import webFeaturesData from 'web-features/data.json';

const features = webFeaturesData.features;

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
  "navigator.clipboard": "async-clipboard",
  "Array.flatMap": "array-flat",
  "Array.at": "array-find-from-last",
  "fetch": "fetch",
  "structuredClone": "structured-clone",
  "Object.hasOwn": "object-hasown",
  
  // CSS Properties
  "backdrop-filter": "backdrop-filter",
  "scroll-behavior": "css-scroll-behavior",
  "container-type": "container-queries",
  "background-clip": "background-clip-text",
  "aspect-ratio": "aspect-ratio",
  "scroll-snap-type": "css-scroll-snap",
  "scrollSnapType": "css-scroll-snap",
  "aspectRatio": "aspect-ratio",
  "gap": "flexbox-gap",
  ":has": "css-has",
  "color-scheme": "color-scheme",
  
  // HTML Elements
  "dialog": "dialog",
  "input[type=color]": "input-color",
  "input[type=date]": "input-date",
  "details": "details-summary"
};

// Alternative mappings to try if primary doesn't work
const alternativeFeatureIds: Record<string, string[]> = {
  "Array.at": ["array-at", "array-find-from-last", "at-array"],
  "structuredClone": ["structured-clone", "structuredclone", "global-structured-clone"],
  "navigator.clipboard": ["async-clipboard", "clipboard-api", "clipboard"],
  "scrollSnapType": ["css-scroll-snap", "scroll-snap", "scroll-snap-type"],
  "aspectRatio": ["aspect-ratio", "css-aspect-ratio"]
};

export class LinterEngine {
  private getFeatureStatus(featureId: string, featureKey?: string) {
    if (!featureId) return null;
    
    // Try primary feature ID
    let feature = features[featureId as keyof typeof features];
    
    // If not found and we have alternatives, try those
    if (!feature && featureKey && alternativeFeatureIds[featureKey]) {
      for (const altId of alternativeFeatureIds[featureKey]) {
        feature = features[altId as keyof typeof features];
        if (feature) {
          console.log(`Found alternative feature ID: ${altId} for ${featureKey}`);
          break;
        }
      }
    }
    
    if (!feature) {
      // Feature not found in database, return a default "unknown" status
      console.warn(`Feature "${featureId}" not found in web-features database`);
      return {
        type: 'warning' as const,
        message: `Feature check not available - ${featureId} not in compatibility database yet`,
        support: {
          chrome: false,
          firefox: false,
          safari: false,
          edge: false
        },
        name: featureKey || featureId,
        description: 'This feature is not yet tracked in the Baseline database',
        baselineStatus: false as const
      };
    }

    // Type guard to check if feature has status property
    if (!('status' in feature) || !feature.status) {
      return null;
    }

    const status = feature.status;
    const baseline = status.baseline;
    const featureName = 'name' in feature ? feature.name : featureId;
    
    let type: 'success' | 'warning' | 'destructive' = 'success';
    let message = '';
    
    if (baseline === 'high') {
      type = 'success';
      message = `${featureName} - Widely available across all major browsers`;
    } else if (baseline === 'low') {
      type = 'warning';
      message = `${featureName} - Newly available. May need fallbacks for older browsers`;
    } else {
      type = 'destructive';
      message = `${featureName} - Limited availability. Consider using alternatives or polyfills`;
    }

    const support = {
      chrome: !!(status?.support && 'chrome' in status.support && status.support.chrome),
      firefox: !!(status?.support && 'firefox' in status.support && status.support.firefox),
      safari: !!(status?.support && 'safari' in status.support && status.support.safari),
      edge: !!(status?.support && 'edge' in status.support && status.support.edge)
    };

    return {
      type,
      message,
      support,
      name: featureName,
      description: 'description' in feature ? feature.description : undefined,
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
        { pattern: 'navigator.clipboard', key: 'navigator.clipboard', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard' },
        { pattern: '.flatMap', key: 'Array.flatMap', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap' },
        { pattern: '.at(', key: 'Array.at', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at' },
        { pattern: 'fetch(', key: 'fetch', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API' },
        { pattern: 'structuredClone', key: 'structuredClone', mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/structuredClone' },
        { pattern: 'Object.hasOwn', key: 'Object.hasOwn', mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn' },
        { pattern: 'backdropFilter', key: 'backdrop-filter', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter' },
        { pattern: 'scrollBehavior', key: 'scroll-behavior', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior' },
        { pattern: 'scrollSnapType', key: 'scrollSnapType', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type' },
        { pattern: 'aspectRatio', key: 'aspectRatio', mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio' }
      ];

      for (const check of checks) {
        if (line.includes(check.pattern)) {
          const featureId = featureMapping[check.key];
          if (featureId) {
            const featureData = this.getFeatureStatus(featureId, check.key);
            
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
          if (featureId) {
            const featureData = this.getFeatureStatus(featureId, check.key);
            
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
          if (featureId) {
            const featureData = this.getFeatureStatus(featureId, check.key);
            
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
      }
    });
    
    return results;
  }
}
