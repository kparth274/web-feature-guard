# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/5d8bc074-f0e5-42bc-960d-fb36bc71ef1a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5d8bc074-f0e5-42bc-960d-fb36bc71ef1a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5d8bc074-f0e5-42bc-960d-fb36bc71ef1a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

# Baseline Auto-Linter Project

This project implements a **Baseline Auto-Linter & DevTool Plugin** that checks web code for browser compatibility using official [Baseline](https://web.dev/baseline) data.

## 🚀 Features

- **Web Application** - Interactive code editor with real-time compatibility checking
- **VS Code Extension** - IDE integration for in-editor diagnostics and hover information
- **Baseline Data** - Uses official web-features package from W3C WebDX Community Group
- **Multi-language Support** - Works with JavaScript, TypeScript, CSS, and HTML
- **Smart Suggestions** - Provides polyfill recommendations and fallback approaches

## 📦 Components

### 1. Web Application (Current Project)

The web app provides an interactive interface for testing code compatibility:

**Features:**
- Live code editor with syntax highlighting
- Real-time linting for JavaScript, CSS, and HTML
- Browser support matrix visualization
- Detailed compatibility reports

**Access:** Click "Try Live Demo" from the homepage or navigate to `/linter`

### 2. VS Code Extension

Located in `vscode-extension/` directory.

**Installation:**
```bash
cd vscode-extension
npm install
npm run compile
npm run package
code --install-extension baseline-auto-linter-1.0.0.vsix
```

**Features:**
- Real-time diagnostics in Problems panel
- Hover information with Baseline status
- Multi-file support
- Configurable severity levels

See [vscode-extension/INSTALLATION.md](vscode-extension/INSTALLATION.md) for detailed setup.

## 🔍 Detected Features

### JavaScript APIs
- `navigator.share()`, `fetch()`, `Array.flatMap()`, `structuredClone()`, `Object.hasOwn()`, and more

### CSS Properties
- `backdrop-filter`, `container-type`, `aspect-ratio`, `:has()`, `color-scheme`, and more

### HTML Elements
- `<dialog>`, `<input type="date">`, `<input type="color">`, `<details>`, and more

## 📊 Baseline Status

- ✅ **Widely Available** - Safe to use (Baseline High)
- ⚠️ **Newly Available** - Use with caution (Baseline Low)
- ❌ **Limited Availability** - Not widely supported (Not Baseline)

## 🛠️ Tech Stack

- **Core:** web-features + compute-baseline packages
- **Web App:** React + TypeScript + Vite + Tailwind CSS
- **VS Code:** Extension API + TypeScript

## 📚 Resources

- [Baseline Documentation](https://web.dev/baseline)
- [web-features Package](https://www.npmjs.com/package/web-features)
- [Web Platform Dashboard](https://webstatus.dev)

---

**Built for the web development community** ❤️
