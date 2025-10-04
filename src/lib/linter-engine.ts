// Import JSON data directly to avoid Node.js dependencies
import webFeaturesData from 'web-features/data.json';

const features = webFeaturesData.features;

// Feature mapping for detection
const featureMapping = {
  // JavaScript APIs
  "navigator.share": "web-share",
  "Array.flatMap": "array-flat",
  "fetch": "fetch",
  
  // CSS Properties
  "backdrop-filter": "backdrop-filter",
  "scroll-behavior": "css-scroll-behavior",
  "container-type": "container-queries",
  "background-clip": "background-clip-text",
  
  // HTML Elements
  "dialog": "dialog",
  "input[type=color]": "input-color",
  "input[type=date]": "input-date"
};

// Get Baseline status for a feature
const getFeatureStatus = (featureId: string) => {
  const feature = features[featureId as keyof typeof features];
  
  if (!feature) {
    return null;
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
    
    // Check for navigator.share
    if (line.includes('navigator.share')) {
      const featureData = getFeatureStatus(featureMapping["navigator.share"]);
      if (featureData) {
        results.push({
          feature: 'navigator.share',
          line: lineNumber,
          column: line.indexOf('navigator.share') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          suggestion: featureData.baselineStatus === false ? 'Consider providing a fallback for browsers without Web Share API support' : undefined,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share'
        });
      }
    }
    
    // Check for Array.flatMap
    if (line.includes('.flatMap')) {
      const featureData = getFeatureStatus(featureMapping["Array.flatMap"]);
      if (featureData) {
        results.push({
          feature: 'Array.flatMap',
          line: lineNumber,
          column: line.indexOf('.flatMap') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap'
        });
      }
    }
    
    // Check for fetch
    if (line.includes('fetch(')) {
      const featureData = getFeatureStatus(featureMapping["fetch"]);
      if (featureData) {
        results.push({
          feature: 'fetch',
          line: lineNumber,
          column: line.indexOf('fetch(') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'
        });
      }
    }
    
    // Check for backdrop-filter in CSS-in-JS
    if (line.includes('backdropFilter')) {
      const featureData = getFeatureStatus(featureMapping["backdrop-filter"]);
      if (featureData) {
        results.push({
          feature: 'backdrop-filter',
          line: lineNumber,
          column: line.indexOf('backdropFilter') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          suggestion: featureData.baselineStatus === false ? 'Consider using a solid background color as fallback' : undefined,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter'
        });
      }
    }
    
    // Check for scroll-behavior in CSS-in-JS
    if (line.includes('scrollBehavior')) {
      const featureData = getFeatureStatus(featureMapping["scroll-behavior"]);
      if (featureData) {
        results.push({
          feature: 'scroll-behavior',
          line: lineNumber,
          column: line.indexOf('scrollBehavior') + 1,
          type: featureData.type,
          message: featureData.message,
          support: featureData.support,
          mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior'
        });
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