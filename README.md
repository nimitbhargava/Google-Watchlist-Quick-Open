# Google Watchlist Quick Open

**Google Watchlist Quick Open** is a lightweight Chrome extension that gives you a one-click shortcut to your **Search Watchlist** on Google’s Saved page.

Instead of navigating through Google Search → Saved Items → Watchlist → Search Watchlist, this extension takes you **directly** to the correct view.

It provides two ways to access your list:
1.  **Extension Icon**: Click the toolbar icon to open your watchlist.
2.  **"My List" Button**: A handy button injected directly into Google Search results for movies and TV shows.

[![Available in the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/i7586G99c68iF0mZ9h4a.png)](https://chromewebstore.google.com/detail/google-watchlist-quick-op/dofpcochmgmdamiiffjhbfheapnhldce)

<img width="1280" height="800" alt="Frame 3" src="https://github.com/user-attachments/assets/6ca5e0d2-8b78-48cc-864f-0a05cae12df2" />

---

## ⭐ Features

- **"My List" Button** injected directly into Google Search results (next to "Want to watch")
- **Dynamic Theming**: Adapts to Dark/Light mode automatically
- **Hover Effects**: Interactive blue underline on hover
- **One-click access** to Google’s Search Watchlist via toolbar icon
- Automatically opens:  
  `https://www.google.com/search?q=my+watchlist`  
- Works instantly from any tab  
- No data collection (except anonymous usage stats via GA4)  
- Fully offline code execution (except analytics)  

---

## 🎯 Why Use It?

Google’s Watchlist is useful but buried behind several UI layers.  
This extension exists to eliminate that friction.

Perfect for:

- Users who often save movies/series to Google’s Watchlist  
- YouTube, Google Search, or Google TV users collecting “watch later” items  
- Movie/TV enthusiasts who want quick access to their list  
- Anyone who prefers automation, speed, and simplicity  

With **Google Watchlist Quick Open**, you get:

✔ No searching  
✔ No scrolling  
✔ No clicking through menus  
✔ Just one action → direct to Search Watchlist

---

## 🚀 How It Works

### Method 1: Extension Icon
1. You click the extension icon.  
2. It opens a new tab with the Google Search query "my watchlist".
3. You usually see your watchlist immediately.

### Method 2: "My List" Button
1. Search for a movie or TV show on Google (e.g., "Inception").
2. Look for the **"My List"** button next to the "Already watched" / "Want to watch" icons.
3. Click it to open your watchlist in a new tab.

---

## 🔧 Installation (Developer Mode)

1. Download this repository or ZIP.  
2. Unzip the folder.  
3. **Configuration**:
    - Navigate to the `extension` folder.
    - Copy `config.example.js` to `config.js`.
    - Open `config.js` and replace the placeholders with your Google Analytics credentials:
      ```javascript
      export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
      export const GA_API_SECRET = "YOUR_API_SECRET";
      ```
4. Open `chrome://extensions/`.  
5. Enable **Developer mode**.  
6. Click **Load unpacked**.  
7. Select the `extension` folder.  
8. Pin the extension icon (recommended).

---

## 🔐 Permissions Explained

### **tabs**
Used only to:
- Open the new tab with the "my watchlist" search query.

### **scripting**
*(No longer actively used for logic, may be removed in future versions)*
Previously used to inject scripts into the Saved page, now simplified.

### **Host Permission**
*(None)*
The extension no longer requires host permissions for the Saved page.

### **Content Scripts**
- Runs on `https://www.google.com/search*`
- Purpose: To inject the "My List" button into the movie/TV show knowledge panel.
- **Privacy Note**: The script only looks for the "Want to watch" button to place the "My List" button next to it. It does **not** read your search queries or results.

---

## 🔒 Privacy & Data Use

This extension:

- Collects **no personal user data**  
- Does **not** read browsing history  
- Does **not** interact with pages outside the Saved page (except for button injection on Google Search)

**Analytics (GA4)**:
- The extension uses Google Analytics 4 to track anonymous usage statistics:
    - **Extension Icon Clicks**: To measure usage frequency.
    - **"My List" Button Clicks**: To measure feature engagement.
- No personal identifiable information (PII) is collected.
- You can disable analytics by removing the credentials in `config.js`.

**Everything else runs locally on the user's device.**

---

## 💬 Support

If you encounter issues or want new features, feel free to open an issue or request enhancements.

---

## Privacy Policy – Google Watchlist Quick Open

Google Watchlist Quick Open respects your privacy.

The extension’s behavior includes:
- Opening the Google Search page for "my watchlist" when the user clicks the extension icon.
- Injecting a "My List" button on Google Search results.
- Sending anonymous usage events (clicks) to Google Analytics.

The extension does not:
- Track browsing history
- Read or modify the content of other websites (except Google Search for button injection)
- Send personal data to external servers

If you have any questions about this extension, please contact at nimitbhargava@gmail.com
