Baseline Auto-Linter

A web compatibility analyzer and developer tool that checks your web code against official Baseline
 data to ensure browser support and modern standards compliance.

🚀 Overview

Baseline Auto-Linter helps developers quickly identify compatibility issues across JavaScript, CSS, and HTML using the latest browser Baseline data.
It includes both a web application and a VS Code extension for real-time linting and diagnostics.

🧩 Key Features

Real-Time Compatibility Checking – Instantly see which features are safe to use across major browsers.

VS Code Integration – View compatibility warnings directly inside your IDE.

Multi-language Support – Analyze JavaScript, TypeScript, CSS, and HTML files.

Baseline Data Integration – Uses official web-features and compute-baseline packages from the W3C WebDX Community Group.

Smart Suggestions – Get polyfill recommendations and fallback guidance.

🛠️ Tech Stack

Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn-ui

Extension: VS Code API, TypeScript

Data Source: W3C WebDX Baseline (web-features)

🧠 Project Structure
1. Web Application

Interactive web interface for testing code compatibility.

Features:

Live code editor with syntax highlighting

Real-time linting for JS/CSS/HTML

Browser support visualization

Compatibility reports

Run it locally:

git clone <REPO_URL>
cd <PROJECT_NAME>
npm install
npm run dev

2. VS Code Extension

Found in the vscode-extension/ directory.

Install and Run:

cd vscode-extension
npm install
npm run compile
npm run package
code --install-extension baseline-auto-linter-1.0.0.vsix


Features:

Inline diagnostics and hover info

Multi-file support

Configurable severity levels

See vscode-extension/INSTALLATION.md for details.

🧩 Detected Features
JavaScript APIs

navigator.share(), fetch(), Array.flatMap(), structuredClone(), Object.hasOwn(), etc.

CSS Properties

backdrop-filter, aspect-ratio, :has(), color-scheme, etc.

HTML Elements

<dialog>, <details>, <input type="date">, <input type="color">, etc.

📊 Compatibility Levels
Symbol	Meaning
✅	Widely Available – Safe to use (Baseline High)
⚠️	Newly Available – Use with caution (Baseline Low)
❌	Limited Support – Not yet Baseline
📚 Resources

Baseline Documentation

web-features Package

Web Platform Dashboard

Maintained for the web development community. 🛠️