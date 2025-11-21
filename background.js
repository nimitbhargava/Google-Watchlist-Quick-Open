const SAVED_URL = "https://www.google.com/interests/saved";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) return;

  if (tab.url && tab.url.startsWith(SAVED_URL)) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
    return;
  }

  const updatedTab = await chrome.tabs.update(tab.id, { url: SAVED_URL });
  const targetTabId = updatedTab.id;

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
});
