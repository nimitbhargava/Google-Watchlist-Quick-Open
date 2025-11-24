# Verification Walkthrough: Placement & Layout

## Goal
Verify the "My List" button is correctly placed at the end of the row (as a sibling) and stays on the same line.

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
    - **Check**: Does the button appear?

3.  **Verify Placement**
    - **Check**: Is the "My List" button **outside** the "Already watched" button?
    - **Check**: It should be a separate circle next to the others, not nested inside.
    - **Check**: Is it at the **end** of the row?

4.  **Verify Layout**
    - **Check**: Is the button on the **same horizontal line**?
    - **Check**: Ensure it has **NOT** wrapped to a new line.
    - **Check**: If the window is narrow, does the row allow horizontal scrolling?

5.  **Verify Visuals**
    - **Check**: Clean list icon.
    - **Check**: White circle with gray border.
    - **Check**: Text color matches "Want to watch".

6.  **Verify Interaction**
    - **Action**: Click the button.
    - **Check**: Does it open the watchlist?

## Troubleshooting
- **Button inside another button?**
    - The script logic for finding the row parent might be failing. Inspect the DOM to see where `my-custom-watchlist-btn` is inserted.
