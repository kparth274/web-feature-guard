// Mock Baseline compatibility data
const baselineData = {
  // JavaScript APIs
  "navigator.share": {
    support: { chrome: true, firefox: false, safari: true, edge: true },
    type: 'warning',
    message: 'Web Share API - Partial support: Not available in Firefox desktop',
    suggestion: 'Consider providing a fallback sharing method for Firefox users',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share'
  },
  "Array.flatMap": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'Array.flatMap() - Widely supported in modern browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap'
  },
  "fetch": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'Fetch API - Widely supported across all major browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'
  },
  
  // CSS Properties
  "backdrop-filter": {
    support: { chrome: true, firefox: false, safari: true, edge: true },
    type: 'destructive',
    message: 'backdrop-filter - Limited support: Not supported in Firefox, partial support in older browsers',
    suggestion: 'Consider using a solid background color as fallback or check for support with @supports',
    polyfill: 'https://github.com/Schepp/CSS-backdrop-filter-polyfill',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter'
  },
  "scroll-behavior": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'scroll-behavior - Widely supported across all major browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior'
  },
  "container-type": {
    support: { chrome: true, firefox: false, safari: true, edge: true },
    type: 'warning',
    message: 'CSS Container Queries - Partial support: Not available in Firefox',
    suggestion: 'Use @supports (container-type: inline-size) to provide fallbacks',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries'
  },
  "background-clip": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'background-clip - Well supported, but use -webkit- prefix for text value',
    suggestion: 'Use both background-clip: text and -webkit-background-clip: text for compatibility',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip'
  },
  
  // HTML Elements
  "dialog": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'HTML Dialog element - Good support in modern browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog'
  },
  "input[type=color]": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'Color input type - Well supported across modern browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color'
  },
  "input[type=date]": {
    support: { chrome: true, firefox: true, safari: true, edge: true },
    type: 'success',
    message: 'Date input type - Well supported across modern browsers',
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date'
  }
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
      const data = baselineData["navigator.share"];
      results.push({
        feature: 'navigator.share',
        line: lineNumber,
        column: line.indexOf('navigator.share') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        suggestion: data.suggestion,
        mdn: data.mdn
      });
    }
    
    // Check for Array.flatMap
    if (line.includes('.flatMap')) {
      const data = baselineData["Array.flatMap"];
      results.push({
        feature: 'Array.flatMap',
        line: lineNumber,
        column: line.indexOf('.flatMap') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
    
    // Check for fetch
    if (line.includes('fetch(')) {
      const data = baselineData["fetch"];
      results.push({
        feature: 'fetch',
        line: lineNumber,
        column: line.indexOf('fetch(') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
    
    // Check for backdrop-filter in CSS-in-JS
    if (line.includes('backdropFilter')) {
      const data = baselineData["backdrop-filter"];
      results.push({
        feature: 'backdrop-filter',
        line: lineNumber,
        column: line.indexOf('backdropFilter') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        suggestion: data.suggestion,
        polyfill: data.polyfill,
        mdn: data.mdn
      });
    }
    
    // Check for scroll-behavior in CSS-in-JS
    if (line.includes('scrollBehavior')) {
      const data = baselineData["scroll-behavior"];
      results.push({
        feature: 'scroll-behavior',
        line: lineNumber,
        column: line.indexOf('scrollBehavior') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
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
      const data = baselineData["backdrop-filter"];
      results.push({
        feature: 'backdrop-filter',
        line: lineNumber,
        column: line.indexOf('backdrop-filter:') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        suggestion: data.suggestion,
        polyfill: data.polyfill,
        mdn: data.mdn
      });
    }
    
    // Check for scroll-behavior
    if (line.includes('scroll-behavior:')) {
      const data = baselineData["scroll-behavior"];
      results.push({
        feature: 'scroll-behavior',
        line: lineNumber,
        column: line.indexOf('scroll-behavior:') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
    
    // Check for container-type
    if (line.includes('container-type:')) {
      const data = baselineData["container-type"];
      results.push({
        feature: 'container-type',
        line: lineNumber,
        column: line.indexOf('container-type:') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        suggestion: data.suggestion,
        mdn: data.mdn
      });
    }
    
    // Check for background-clip: text
    if (line.includes('background-clip:') && line.includes('text')) {
      const data = baselineData["background-clip"];
      results.push({
        feature: 'background-clip: text',
        line: lineNumber,
        column: line.indexOf('background-clip:') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        suggestion: data.suggestion,
        mdn: data.mdn
      });
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
      const data = baselineData["dialog"];
      results.push({
        feature: 'dialog element',
        line: lineNumber,
        column: line.indexOf('<dialog') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
    
    // Check for input type="color"
    if (line.includes('type="color"')) {
      const data = baselineData["input[type=color]"];
      results.push({
        feature: 'input[type="color"]',
        line: lineNumber,
        column: line.indexOf('type="color"') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
    
    // Check for input type="date"
    if (line.includes('type="date"')) {
      const data = baselineData["input[type=date]"];
      results.push({
        feature: 'input[type="date"]',
        line: lineNumber,
        column: line.indexOf('type="date"') + 1,
        type: data.type as any,
        message: data.message,
        support: data.support,
        mdn: data.mdn
      });
    }
  });
  
  return results;
};