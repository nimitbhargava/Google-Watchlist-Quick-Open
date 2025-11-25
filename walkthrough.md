# Verification Walkthrough: Placement & Layout & Dynamic Color & State & Hover & Analytics & Config

## Goal
Verify the "My List" button is correctly placed, layout is correct, icon/text color adapts to the theme, state is independent, hover style is correct, analytics events are sent, and **configuration is loaded correctly**.

## Prerequisites
- Chrome Browser
- The extension code is updated locally.
- **IMPORTANT**: You must replace `G-XXXXXXXXXX` and `YOUR_API_SECRET` in `config.js` (NOT `background.js`) with your actual Google Analytics credentials.

## Steps

1.  **Reload the Extension**
    - Go to `chrome://extensions`.
    - Find "Google Watchlist Quick Open".
    - Click the **Refresh** (circular arrow) icon.
    - **Check**: Ensure there are no errors (red "Errors" button). If there are errors about "import", ensure your Chrome version supports ES modules in Service Workers (Chrome 91+).

2.  **Perform a Search**
    - Open a new tab and go to [Google.com](https://www.google.com).
    - Search for a movie (e.g., "Inception").
    - **Check**: Does the button appear?

3.  **Verify Visuals & Interaction**
    - **Check**: Icon/Text color adapts to theme (Dark/Light).
    - **Check**: Hover underline is blue (`#1a0dab`).
    - **Check**: Button state is independent.

4.  **Verify Analytics (Network Check)**
    - **Open Service Worker Console**:
        - Go to `chrome://extensions`.
        - Click the blue link **"service worker"** (or "background page").
    - **Go to Network Tab**:
        - Switch to the **Network** tab.
        - Filter by "collect".
    - **Trigger Events**:
        1.  **Click Extension Icon**: Click the extension icon.
            - **Check**: A request to `google-analytics.com/mp/collect` should appear.
        2.  **Click "My List" Button**: Click the "My List" button on the search page.
            - **Check**: Another request to `google-analytics.com/mp/collect` should appear.

5.  **Verify Git Ignore**
    - **Action**: Run `git status` in your terminal.
    - **Check**: `config.js` should **NOT** be listed as untracked or modified (if it was previously tracked, you might need to `git rm --cached config.js`).
    - **Check**: `config.example.js` **SHOULD** be tracked.

## Troubleshooting
- **"Cannot use import statement outside a module"**:
    - Ensure `manifest.json` has `"type": "module"` in the `background` section.
