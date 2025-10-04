# Baseline Auto-Linter for VS Code

Real-time web compatibility checker that flags unsupported or partially supported web features directly in your IDE using official Baseline data from web.dev.

## Features

- **Real-time Diagnostics**: Automatically detects web features in your code and flags compatibility issues
- **Baseline Integration**: Uses official web-features package from the W3C WebDX Community Group
- **Multi-language Support**: Works with JavaScript, TypeScript, CSS, and HTML
- **Hover Information**: Hover over features to see detailed Baseline status and browser support
- **Severity Levels**: Configurable severity for different types of compatibility issues

## Supported Languages

- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- CSS (.css)
- HTML (.html)

## Detected Features

### JavaScript APIs
- `navigator.share()` - Web Share API
- `Array.flatMap()` - Array flat map method
- `fetch()` - Fetch API
- `Array.prototype.at()` - Array at method
- `Object.hasOwn()` - Object.hasOwn method
- `structuredClone()` - Structured clone API

### CSS Properties
- `backdrop-filter` - Backdrop filter effects
- `scroll-behavior` - Smooth scrolling
- `container-type` - Container queries
- `aspect-ratio` - Aspect ratio property
- `:has()` - CSS :has() selector
- `color-scheme` - Color scheme property

### HTML Elements
- `<dialog>` - Dialog element
- `<input type="color">` - Color input
- `<input type="date">` - Date input
- `<details>` - Details/Summary element

## Usage

1. Install the extension
2. Open any JavaScript, TypeScript, CSS, or HTML file
3. The extension will automatically analyze your code
4. Hover over web features to see Baseline status
5. View diagnostics in the Problems panel

### Commands

- **Check Web Compatibility**: Manually run compatibility check on current file
- **Clear Compatibility Diagnostics**: Clear all compatibility warnings

## Configuration

Configure the extension in VS Code settings:

```json
{
  "baselineLinter.enableDiagnostics": true,
  "baselineLinter.severity": "warning",
  "baselineLinter.showBaselineStatus": true
}
```

### Settings

- `baselineLinter.enableDiagnostics` - Enable/disable real-time diagnostics (default: true)
- `baselineLinter.severity` - Set severity level: "error", "warning", or "information" (default: "warning")
- `baselineLinter.showBaselineStatus` - Show Baseline status on hover (default: true)

## Baseline Status Indicators

- ✅ **Widely Available** - Safe to use across all major browsers
- ⚠️ **Newly Available** - Available in latest browsers, consider fallbacks
- ❌ **Limited Availability** - Not widely supported, use with caution

## Building from Source

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Package extension
npm run package
```

## Publishing

```bash
# Package
npm run package

# Publish to marketplace
npm run publish
```

## Requirements

- VS Code 1.80.0 or higher
- Node.js 18.0 or higher

## Data Source

This extension uses the official [web-features](https://www.npmjs.com/package/web-features) package maintained by the W3C WebDX Community Group, which provides curated Baseline compatibility data.

## License

MIT

## Contributing

Contributions welcome! Please open an issue or pull request on GitHub.

## Links

- [Baseline Documentation](https://web.dev/baseline)
- [web-features Package](https://www.npmjs.com/package/web-features)
- [VS Code Extension API](https://code.visualstudio.com/api)
