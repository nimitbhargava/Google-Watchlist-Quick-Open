# Verification Walkthrough: UI Refinements

## Goal
Verify the "My List" button has the correct visual style: white circle (idle state), clean list icon (no inner box), text color matching "Want to watch", and text underline on hover.

## Prerequisites
- Chrome Browser
- The extension code is updated locally.

## Steps

1.  **Reload the Extension**
    - Go to `chrome://extensions`.
    - Find "Google Watchlist Quick Open".
    - Click the **Refresh** (circular arrow) icon.

2.  **Perform a Search**
    - Open a new tab and go to [Google.com](https://www.google.com).
    - Search for a movie (e.g., "Inception").
    - Locate the buttons row.

3.  **Verify Icon Style**
    - **Check**: Is the "My List" icon a **clean list** (bullets + lines)?
    - **Check**: Ensure there is **NO box or border** directly around the icon itself (inside the circle).
    - **Check**: The icon should look similar in style to the "Already watched" checkmark (floating in the circle).

4.  **Verify Circle Style**
    - **Check**: Is the "My List" circle background **white**?
    - **Check**: Does it have a **gray border**?

5.  **Verify Label**
    - **Check**: Does the button say **"My List"**?

6.  **Verify Interaction**
    - **Action**: Click the button.
    - **Check**: Does it still open the watchlist correctly?

## Troubleshooting
- **Still see a box around icon?**
    - Inspect the SVG element. Ensure no border styles are applied to it or its immediate parent.
