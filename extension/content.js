(function () {
  const TARGET_LABELS = ["search watchlist", "watchlist search"];

  function matchesTarget(el) {
    const text = (
      (el.textContent || "") +
      " " +
      (el.getAttribute("aria-label") || "") +
      " " +
      (el.getAttribute("title") || "")
    ).toLowerCase().trim();

    if (!text) return false;
    if (text.includes("watchlist") && text.includes("search")) return true;
    return TARGET_LABELS.some((label) => text.includes(label));
  }

  function clickSearchWatchlistTile() {
    const elements = document.querySelectorAll(
      'a, button, div[role="link"], [aria-label], [title]'
    );

    for (const el of elements) {
      if (matchesTarget(el)) {
        console.log("[Google Watchlist Quick Open] Found tile, clicking...");
        el.click();
        return true;
      }
    }
    return false;
  }

  // Initial check
  if (clickSearchWatchlistTile()) return;

  // Observer for dynamic loading
  const observer = new MutationObserver((mutations) => {
    if (clickSearchWatchlistTile()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Safety timeout to stop observing after 10 seconds
  setTimeout(() => {
    observer.disconnect();
    console.log("[Google Watchlist Quick Open] Observer disconnected (timeout).");
  }, 10000);
})();
