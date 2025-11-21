# Google Watchlist Quick Open

**Google Watchlist Quick Open** is a lightweight Chrome extension that gives you a one-click shortcut to your **Search Watchlist** on Google’s Saved page.

Instead of navigating through Google Search → Saved Items → Watchlist → Search Watchlist, this extension takes you **directly** to the correct view with a single click.

<img width="1280" height="800" alt="Frame 3" src="https://github.com/user-attachments/assets/6ca5e0d2-8b78-48cc-864f-0a05cae12df2" />

---

## ⭐ Features

- **One-click access** to Google’s Search Watchlist  
- Automatically opens:  
  `https://www.google.com/interests/saved`  
- Detects and clicks the **“Search watchlist”** tile  
- Works instantly from any tab  
- No configuration required  
- No data collection  
- Fully offline — all code runs locally  
- Zero background tracking, zero analytics, zero remote requests  

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

1. You click the extension icon.  
2. If you’re not on the Saved page, it navigates there automatically.  
3. Once loaded, the extension locates the **Search watchlist** tile.  
4. It clicks the tile for you.  
5. You land instantly in the Search Watchlist view.

---

## 🔧 Installation (Developer Mode)

1. Download this repository or ZIP.  
2. Unzip the folder.  
3. Open `chrome://extensions/`.  
4. Enable **Developer mode**.  
5. Click **Load unpacked**.  
6. Select the extension folder.  
7. Pin the extension icon (recommended).

---

## 🔐 Permissions Explained

### **tabs**
Used only to:
- Navigate the current tab to Google’s Saved page  
- Check if the user is already on the correct page  

### **scripting**
Used only to:
- Inject a small script into `https://www.google.com/interests/saved*`  
- Click the “Search watchlist” tile

### **Host Permission**
```
https://www.google.com/interests/saved*
```
Allows the injected script to run on **that page only**.

---

## 🔒 Privacy & Data Use

This extension:

- Collects **no user data**  
- Sends **no data** to servers  
- Includes **no analytics**  
- Uses **no remote code**  
- Does **not** read browsing history  
- Does **not** interact with pages outside the Saved page  

**Everything runs locally on the user's device.**

---

## 📄 Privacy Policy

If publishing to the Chrome Web Store, include a link to your hosted privacy policy page.  
Suggested text is provided in this repository’s `/PRIVACY.md`.

---

## 💬 Support

If you encounter issues or want new features, feel free to open an issue or request enhancements.

---

## Privacy Policy – Google Watchlist Quick Open

Google Watchlist Quick Open does not collect, store, or transmit any personal data from users.

The extension’s only behavior is:
- Opening the Google Saved page at https://www.google.com/interests/saved when the user clicks the extension icon, and
- Injecting a small script on that page to automatically click the “Search watchlist” collection tile.

The extension does not:
- Track browsing history
- Read or modify the content of other websites
- Send any data to external servers
- Use analytics, advertising, or third-party tracking

If you have any questions about this extension, please contact at nimitbhargava@gmail.com
