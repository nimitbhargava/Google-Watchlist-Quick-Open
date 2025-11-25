# Verification Walkthrough: Placement & Layout & Dynamic Color & State & Hover & Analytics & Config & Landing Page

## Goal
Verify the "My List" button is correctly placed, layout is correct, icon/text color adapts to the theme, state is independent, hover style is correct, analytics events are sent, configuration is loaded correctly, and **the marketing landing page (including Privacy Policy, Analytics, and Social Preview) looks good**.

## Prerequisites
- Chrome Browser
- The extension code is updated locally.
- **IMPORTANT**: You must replace `G-XXXXXXXXXX` and `YOUR_API_SECRET` in `extension/config.js` with your actual Google Analytics credentials.
- **IMPORTANT**: For the landing page, you must replace `G-XXXXXXXXXX` in `landing-page/analytics.js` with your Web Data Stream ID.

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
    - **Check**: `extension/config.js` should **NOT** be listed.

6.  **Verify Landing Page (Desktop & Mobile)**
    - **Action**: Open the file `landing-page/index.html` in your browser.
    - **Desktop Check**:
        - Does the page load with the "Google Watchlist Quick Open" title?
        - **Hero Video**: Does the video at the top start playing automatically? Is it muted?
    - **Mobile Check**:
        - Resize your browser window to be narrow (like a phone).
        - **Check**: Does the layout stack vertically?
        - **Check**: Is the text readable (not too big/small)?
        - **Check**: Is there enough spacing between elements?
        - **Check**: The "Add to Chrome" button in the header should disappear to save space.
    - **Check Privacy Policy**:
        - Scroll to the footer.
        - Click the "Privacy Policy" link.
        - Does it open `privacy.html`?
        - Does the content look correct?

7.  **Verify Landing Page Analytics**
    - **Action**: View the source code of `landing-page/index.html` (Right-click -> View Page Source).
    - **Check**: Is `<script src="analytics.js"></script>` present in the `<head>`?
    - **Action**: Open the **Network** tab in DevTools.
    - **Check**: Reload the page. Do you see requests to `clarity.ms` and `googletagmanager.com`?

8.  **Verify Social Media Preview**
    - **Action**: View the source code of `landing-page/index.html`.
    - **Check**: Look for `<meta property="og:image" ...>`.
    - **Check**: Does it point to `https://google-watchlist.nimit.dev/assets/social-preview.png`?
    - **Action**: Open `landing-page/assets/social-preview.png` in your browser to see the image that will be used.

## Troubleshooting
- **Video not playing?**
    - Ensure `google-watchlist-quick-open.webm` is in `landing-page/assets/`.
    - Some browsers block autoplay if not muted. Ensure `muted` attribute is present.
