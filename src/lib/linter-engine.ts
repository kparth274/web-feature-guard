// Import JSON data directly to avoid Node.js dependencies
import webFeaturesData from 'web-features/data.json';

const features = webFeaturesData.features;

// Feature mapping for detection
const featureMapping: Record<string, string> = {
  // JavaScript APIs - using common patterns
  "navigator.share": "web-share",
  "navigator.clipboard": "async-clipboard",
  "Array.flatMap": "array-flat",
  "Array.at": "array-find-from-last", // or might be in array methods
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
  
  // HTML Elements
  "dialog": "dialog",
  "input[type=color]": "input-color",
  "input[type=date]": "input-date"
};

// Alternative mappings to try if primary doesn't work
const alternativeFeatureIds: Record<string, string[]> = {
  "Array.at": ["array-at", "array-find-from-last", "at-array"],
  "structuredClone": ["structured-clone", "structuredclone", "global-structured-clone"],
  "navigator.clipboard": ["async-clipboard", "clipboard-api", "clipboard"],
  "scrollSnapType": ["css-scroll-snap", "scroll-snap", "scroll-snap-type"],
  "aspectRatio": ["aspect-ratio", "css-aspect-ratio"]
};

// Get Baseline status for a feature, trying alternative IDs if needed
const getFeatureStatus = (featureId: string, featureKey?: string) => {
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
      spec: undefined,
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
  
  // Determine type based on baseline status
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

  // Extract browser support - safely handle missing properties
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
    spec: 'spec' in feature ? feature.spec : undefined,
    baselineStatus: baseline
  };
};

interface LinterResult {
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
  polyfill?: string;
  mdn?: string;
}

export const lintCode = async (code: string, language: string): Promise<LinterResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const results: LinterResult[] = [];
  const lines = code.split('\n');
  
  switch (language) {
    case 'javascript':
      return lintJavaScript(lines);
    case 'css':
      return lintCSS(lines);
    case 'html':
      return lintHTML(lines);
    default:
      return results;
  }
};

const lintJavaScript = (lines: string[]): LinterResult[] => {
  const results: LinterResult[] = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Define checks for various JavaScript features
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
          const featureData = getFeatureStatus(featureId, check.key);
          
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
};

const lintCSS = (lines: string[]): LinterResult[] => {
  const results: LinterResult[] = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Check for backdrop-filter
    if (line.includes('backdrop-filter:')) {
      const featureData = getFeatureStatus(featureMapping["backdrop-filter"]);
      if (featureData) {
        results.push({
          feature: 'backdrop-filter',
          line: lineNumber,
          column: line.indexOf('backdrop-filter:') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          suggestion: featureData.baselineStatus === false ? 'Use @supports (backdrop-filter: blur(10px)) for fallback' : undefined,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter'
        });
      }
    }
    
    // Check for scroll-behavior
    if (line.includes('scroll-behavior:')) {
      const featureData = getFeatureStatus(featureMapping["scroll-behavior"]);
      if (featureData) {
        results.push({
          feature: 'scroll-behavior',
          line: lineNumber,
          column: line.indexOf('scroll-behavior:') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior'
        });
      }
    }
    
    // Check for container-type
    if (line.includes('container-type:')) {
      const featureData = getFeatureStatus(featureMapping["container-type"]);
      if (featureData) {
        results.push({
          feature: 'container-type',
          line: lineNumber,
          column: line.indexOf('container-type:') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          suggestion: featureData.baselineStatus === false ? 'Use @supports (container-type: inline-size) for fallback' : undefined,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries'
        });
      }
    }
    
    // Check for background-clip: text
    if (line.includes('background-clip:') && line.includes('text')) {
      const featureData = getFeatureStatus(featureMapping["background-clip"]);
      if (featureData) {
        results.push({
          feature: 'background-clip: text',
          line: lineNumber,
          column: line.indexOf('background-clip:') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          suggestion: 'Use both background-clip: text and -webkit-background-clip: text',
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip'
        });
      }
    }
  });
  
  return results;
};

const lintHTML = (lines: string[]): LinterResult[] => {
  const results: LinterResult[] = [];
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Check for dialog element
    if (line.includes('<dialog')) {
      const featureData = getFeatureStatus(featureMapping["dialog"]);
      if (featureData) {
        results.push({
          feature: 'dialog element',
          line: lineNumber,
          column: line.indexOf('<dialog') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog'
        });
      }
    }
    
    // Check for input type="color"
    if (line.includes('type="color"')) {
      const featureData = getFeatureStatus(featureMapping["input[type=color]"]);
      if (featureData) {
        results.push({
          feature: 'input[type="color"]',
          line: lineNumber,
          column: line.indexOf('type="color"') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color'
        });
      }
    }
    
    // Check for input type="date"
    if (line.includes('type="date"')) {
      const featureData = getFeatureStatus(featureMapping["input[type=date]"]);
      if (featureData) {
        results.push({
          feature: 'input[type="date"]',
          line: lineNumber,
          column: line.indexOf('type="date"') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date'
        });
      }
    }
  });
  
  return results;
};