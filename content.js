(function () {
  const TARGET_LABELS = ["search watchlist", "watchlist search"];
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));

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

  async function clickSearchWatchlistTile(timeout = 10000) {
    const start = performance.now();
    while (performance.now() - start < timeout) {
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
      await wait(250);
    }
    return false;
  }

  (async () => {
    console.log("[Google Watchlist Quick Open] Searching for tile...");
    const ok = await clickSearchWatchlistTile();
    if (!ok) console.warn("[Google Watchlist Quick Open] Tile not found.");
  })();
})();
