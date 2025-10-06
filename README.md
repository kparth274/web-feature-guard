# 🧭 Baseline Auto-Linter

A **web compatibility analyzer and developer tool** that checks your web code against official **Baseline data** to ensure browser support and modern standards compliance.

---

## 🚀 Overview

**Baseline Auto-Linter** helps developers instantly identify browser compatibility issues across **JavaScript**, **CSS**, and **HTML** using the latest **Baseline** data from the W3C WebDX Community Group.

It includes:

* A **web application** for quick compatibility checks.
* A **VS Code extension** for real-time linting and diagnostics inside your IDE.

---

## 🧩 Key Features

* **⚡ Real-Time Compatibility Checking** — Instantly see which features are safe to use across major browsers.
* **🧠 VS Code Integration** — Get compatibility warnings and hover details directly in your IDE.
* **🌐 Multi-language Support** — Analyze JavaScript, TypeScript, CSS, and HTML files.
* **📊 Baseline Data Integration** — Uses official `web-features` and `compute-baseline` packages from the W3C WebDX Community Group.
* **🔧 Smart Suggestions** — Get fallback guidance and polyfill recommendations automatically.

---

## 🛠️ Tech Stack

| Component              | Technology                                       |
| ---------------------- | ------------------------------------------------ |
| **Frontend (Web App)** | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Extension**          | VS Code API, TypeScript                          |
| **Data Source**        | W3C WebDX Baseline (`web-features`)              |

---

## 🧠 Project Structure

### 1. 🌍 Web Application

Interactive web interface for testing code compatibility.

**Features**

* Live code editor with syntax highlighting
* Real-time linting for JS, CSS, and HTML
* Browser support visualization
* Detailed compatibility reports

**Run Locally**

```bash
git clone <REPO_URL>
cd <PROJECT_NAME>
npm install
npm run dev
```

---

### 2. 🧩 VS Code Extension

Located in the `vscode-extension/` directory.

**Install & Run**

```bash
cd vscode-extension
npm install
npm run compile
npm run package
code --install-extension baseline-auto-linter-1.0.0.vsix
```

> The extension is published via **GitHub Releases** instead of the VS Code Marketplace due to payment verification requirements.

**Features**

* Inline diagnostics and hover info
* Multi-file and multi-language support
* Configurable severity levels

See [vscode-extension/INSTALLATION.md](./vscode-extension/INSTALLATION.md) for detailed setup instructions.

---

## 🧩 Detected Features

**JavaScript APIs**

```
navigator.share(), fetch(), Array.flatMap(), structuredClone(), Object.hasOwn(), etc.
```

**CSS Properties**

```
backdrop-filter, aspect-ratio, :has(), color-scheme, etc.
```

**HTML Elements**

```
<dialog>, <details>, <input type="date">, <input type="color">, etc.
```

---

## 📊 Compatibility Levels

| Symbol | Meaning                                               |
| :----: | ----------------------------------------------------- |
|    ✅   | **Widely Available** – Safe to use (Baseline High)    |
|   ⚠️   | **Newly Available** – Use with caution (Baseline Low) |
|    ❌   | **Limited Support** – Not yet in Baseline             |

---

## 📚 Resources

* [Baseline Documentation](https://web.dev/baseline/)
* [web-features Package](https://github.com/web-platform-dx/web-features)
* [Web Platform Dashboard](https://web-platform-dx.github.io/)

---

**Maintained for the web development community.** 🛠️
Building confidence in modern web compatibility — one lint at a time.
