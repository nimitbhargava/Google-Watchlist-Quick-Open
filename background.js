const SAVED_URL = "https://www.google.com/interests/saved";

async function openWatchlist() {
  // Open Saved page in a NEW tab
  const newTab = await chrome.tabs.create({ url: SAVED_URL });
  const targetTabId = newTab.id;

  // When the new tab finishes loading, inject the content script
  function handleUpdated(tabId, changeInfo, updatedTabInfo) {
    if (
      tabId === targetTabId &&
      changeInfo.status === "complete" &&
      updatedTabInfo.url &&
      updatedTabInfo.url.startsWith(SAVED_URL)
    ) {
      chrome.tabs.onUpdated.removeListener(handleUpdated);

      chrome.scripting.executeScript({
        target: { tabId: targetTabId },
        files: ["content.js"]
      });
    }
  }

  chrome.tabs.onUpdated.addListener(handleUpdated);
}

chrome.action.onClicked.addListener(async () => {
  await openWatchlist();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_WATCHLIST") {
    openWatchlist();
  }
});
