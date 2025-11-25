# Verification Walkthrough: Placement & Layout & Dynamic Color & State & Hover

## Goal
Verify the "My List" button is correctly placed, layout is correct, icon/text color adapts to the theme, state is independent, and **hover style is correct**.

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

3.  **Verify State Independence**
    - **Action**: Click "Already watched" (or "Want to watch") so it becomes active/checked.
    - **Check**: Does the "My List" button remain **unchecked** (normal state)?
    - **Check**: The "My List" button should **not** have a filled background or look "pressed".

4.  **Verify Visuals & Dynamic Colors**
    - **Check**: Clean list icon.
    - **Check**: White circle with gray border.
    
    **Theme Verification:**
    - **Light Mode**:
        - **Check Icon**: Bluish gray (`rgb(84, 93, 126)`).
        - **Check Text**: Almost black (`#1f1f1f`).
    - **Dark Mode**:
        - **Check Icon**: Light gray (`rgb(195, 198, 214)`).
        - **Check Text**: Off-white (`#e8e8e8`).

5.  **Verify Hover Style**
    - **Action**: Hover over the "My List" button (specifically the text).
    - **Check**: Does the text get underlined?
    - **Check**: Is the underline color **Blue** (`#1a0dab`)?
    - **Note**: The text color itself should remain the theme color (black/white), only the underline should be blue.

6.  **Verify Interaction**
    - **Action**: Click the button.
    - **Check**: Does it open the watchlist?

## Troubleshooting
- **Underline not blue?**
    - Inspect the element in DevTools.
    - Force "hover" state.
    - Check if `text-decoration-color: #1a0dab` is applied.
