import { GA_MEASUREMENT_ID, GA_API_SECRET } from "./config.js";

const SAVED_URL = "https://www.google.com/interests/saved";

// --- Analytics Configuration ---
const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect";

// --- Analytics Helpers ---

// Get or create a unique client ID
async function getOrCreateClientId() {
  const result = await chrome.storage.local.get("clientId");
  let clientId = result.clientId;
  if (!clientId) {
    // Generate a unique ID
    clientId = self.crypto.randomUUID();
    await chrome.storage.local.set({ clientId });
  }
  return clientId;
}

// Send an event to Google Analytics
async function sendAnalyticsEvent(eventName, params = {}) {
  const clientId = await getOrCreateClientId();

  const requestBody = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: {
          session_id: "1", // Basic session tracking
          engagement_time_msec: "100",
          ...params,
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `${GA_ENDPOINT}?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      console.error("GA4 Error:", response.statusText);
    } else {
      // console.log("GA4 Event Sent:", eventName); // Uncomment for debugging
    }
  } catch (e) {
    console.error("GA4 Request Failed:", e);
  }
}

// --- Main Extension Logic ---

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

// Track Extension Icon Click
chrome.action.onClicked.addListener(async () => {
  sendAnalyticsEvent("extension_icon_click");
  await openWatchlist();
});

// Track "My List" Button Click (via Message)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_WATCHLIST") {
    sendAnalyticsEvent("my_list_button_click");
    openWatchlist();
  }
});
