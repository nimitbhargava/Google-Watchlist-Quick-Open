# Verification Walkthrough: Placement & Layout & Dynamic Color & State & Hover & Analytics & Config & Landing Page

## Goal
Verify the "My List" button is correctly placed, layout is correct, icon/text color adapts to the theme, state is independent, hover style is correct, analytics events are sent, configuration is loaded correctly, and **the marketing landing page looks good with the hero video**.

## Prerequisites
- Chrome Browser
- The extension code is updated locally.
- **IMPORTANT**: You must replace `G-XXXXXXXXXX` and `YOUR_API_SECRET` in `config.js` with your actual Google Analytics credentials.

## Steps

1.  **Reload the Extension**
    - Go to `chrome://extensions`.
    - Find "Google Watchlist Quick Open".
    - Click the **Refresh** (circular arrow) icon.

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
        - Click the blue link **"service worker"**.
    - **Go to Network Tab**:
        - Switch to the **Network** tab.
        - Filter by "collect".
    - **Trigger Events**:
        1.  **Click Extension Icon**: Click the extension icon.
            - **Check**: A request to `google-analytics.com/mp/collect` should appear.
        2.  **Click "My List" Button**: Click the "My List" button on the search page.
            - **Check**: Another request to `google-analytics.com/mp/collect` should appear.

5.  **Verify Git Ignore**
    - **Action**: Run `git status`.
    - **Check**: `config.js` should **NOT** be listed.

6.  **Verify Landing Page**
    - **Action**: Open the file `landing-page/index.html` in your browser.
    - **Check**:
        - Does the page load with the "Google Watchlist Quick Open" title?
        - **Hero Video**: Does the video at the top start playing automatically? Is it muted?
        - Are the other images (Features) displayed correctly?
        - Is the layout responsive?

## Troubleshooting
- **Video not playing?**
    - Ensure `google-watchlist-quick-open.webm` is in `landing-page/assets/`.
    - Some browsers block autoplay if not muted. Ensure `muted` attribute is present.
