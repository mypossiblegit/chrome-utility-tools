# Chrome Utility Tools

A modular, lightweight Chrome extension designed to streamline your browsing experience with automated utility features. This extension is built with a modular architecture, allowing you to toggle specific tools on and off based on your needs.

## 🚀 Features

### 1. Fandom English Force
Automatically redirects non-English Fandom wiki pages to their English counterparts.
- **How it works**: Detects language-specific paths (e.g., `/pl/wiki/`, `/fr/wiki/`) in Fandom subdomains and redirects you to the standard `/wiki/` path.
- **Benefit**: Ensures you always land on the most comprehensive version of a wiki without manual URL editing.

### 2. Google Comma to Dot
Automatically corrects mathematical queries in Google Search by replacing commas with dots.
- **How it works**: Monitors Google Search URLs and replaces commas (`%2C`) with dots (`.`) in the search query parameter.
- **Benefit**: Perfect for users who frequently perform calculations or search for coordinates where a comma might break the search engine's interpretation.

## 🛠 Modular Architecture

This extension is designed for growth. All features are managed through a central configuration, making it easy to add new tools without cluttering the codebase.

- **Central Control**: Enable or disable any feature instantly via the extension popup.
- **Background Processing**: Features run in a service worker for maximum performance and reliability, bypassing on-page security restrictions (CSP).
- **Lightweight**: No external libraries or heavy assets—just pure, efficient JavaScript.

## 📥 Installation

1. **Download/Clone**: Clone this repository to your local machine.
2. **Open Extensions**: Navigate to `chrome://extensions/` in your Chrome browser.
3. **Developer Mode**: Enable "Developer mode" using the toggle in the top right corner.
4. **Load Unpacked**: Click the "Load unpacked" button and select the folder containing this repository.

## ➕ Adding New Features

To add a new utility:
1. Define the logic in `background.js` within the `chrome.tabs.onUpdated` listener.
2. Register the feature in `features.json` to make it appear in the popup UI.

---
*Built for efficiency and customization.*
