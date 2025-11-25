# Google Watchlist Quick Open - Extension Source

This directory contains the source code for the Chrome Extension.

## 📂 File Structure

- **`manifest.json`**: The configuration file that defines the extension's metadata, permissions, and scripts.
- **`background.js`**: Service worker that handles extension events (like icon clicks) and navigation logic.
- **`content.js`**: Script injected into Google Search results to add the "My List" button.
- **`watchlist_injector.js`**: Script injected into the Google Saved page to automate clicking the "Search watchlist" tile.
- **`config.js`**: Configuration file for API keys (e.g., Google Analytics). **Note:** You must create this file from `config.example.js`.
- **`assets/`**: Icons and other static resources.

## 🔧 Development & Installation

1.  **Setup Config**:
    - Copy `config.example.js` to `config.js`.
    - Fill in your Google Analytics credentials (or leave empty if not using analytics).

2.  **Load in Chrome**:
    - Open `chrome://extensions/`.
    - Enable **Developer mode** (top right toggle).
    - Click **Load unpacked**.
    - Select this `extension` folder.

## 🛠 Debugging

- **Background Script**: Go to `chrome://extensions/`, find the extension, and click "service worker" to open the DevTools for the background process.
- **Content Script**: Open the DevTools (F12) on any Google Search result page to debug `content.js`.
