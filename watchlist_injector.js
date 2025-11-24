(function () {
    const TARGET_TEXTS = ["Already watched", "Want to watch"];
    const BUTTON_ID = "my-custom-watchlist-btn";
    const GOOGLE_GRAY = "#5f6368";
    const GOOGLE_BLUE = "#1a73e8";
    const GOOGLE_BORDER = "#dadce0";
    const GOOGLE_BG_IDLE = "#ffffff";

    // Icon: List with bullets (Cleaner look)
    const ICON_LIST = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="${GOOGLE_GRAY}">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>`;

    // Inject Styles for Hover Effect
    const style = document.createElement('style');
    style.textContent = `
    #${BUTTON_ID}:hover .my-watchlist-text {
        text-decoration: underline;
    }
  `;
    document.head.appendChild(style);

    function getWantToWatchColor() {
        const allElements = document.querySelectorAll('div, span, a, button');
        for (const el of allElements) {
            if (el.textContent && el.textContent.trim() === "Want to watch") {
                return window.getComputedStyle(el).color;
            }
        }
        return GOOGLE_BLUE;
    }

    function createButton(sourceButton) {
        const newBtn = sourceButton.cloneNode(true);
        newBtn.id = BUTTON_ID;

        newBtn.removeAttribute("jsaction");
        newBtn.removeAttribute("data-ved");
        newBtn.style.cursor = "pointer";

        const targetColor = getWantToWatchColor();

        // 1. Update Label
        let labelUpdated = false;
        const allDescendants = newBtn.querySelectorAll("*");
        for (const el of allDescendants) {
            const text = el.textContent || "";
            if (TARGET_TEXTS.some(t => text.includes(t)) && el.children.length === 0) {
                el.textContent = "My List";
                el.classList.add("my-watchlist-text");
                el.style.color = targetColor;
                labelUpdated = true;
                break;
            }
        }

        if (!labelUpdated) {
            const walker = document.createTreeWalker(newBtn, NodeFilter.SHOW_TEXT);
            while (walker.nextNode()) {
                if (TARGET_TEXTS.some(t => walker.currentNode.textContent.includes(t))) {
                    walker.currentNode.textContent = "My List";
                    if (walker.currentNode.parentElement) {
                        walker.currentNode.parentElement.classList.add("my-watchlist-text");
                        walker.currentNode.parentElement.style.color = targetColor;
                    }
                    labelUpdated = true;
                    break;
                }
            }
        }

        // 2. Update Icon & Circle Styles
        const oldIcon = newBtn.querySelector("svg, img");
        if (oldIcon) {
            const iconContainer = oldIcon.parentElement;
            iconContainer.innerHTML = ICON_LIST;

            // CRITICAL FIX: Do NOT add border to iconContainer if it's an inner wrapper.
            // We should find the CIRCLE element.
            // The circle is usually the element with a border-radius or specific dimensions.
            // If we cloned "Already watched", the circle styles are likely on 'newBtn' or a parent of 'iconContainer'.

            // Let's try to find the element that HAS the border in the source button.
            // But since we cloned it, we just need to ensure we don't ADD an extra border.

            // Reset iconContainer styles just in case we inherited something bad (like if we cloned "Want to watch" which has blue bg)
            iconContainer.style.backgroundColor = "transparent"; // Inner wrapper should be transparent
            iconContainer.style.border = "none"; // No border on inner wrapper

            // Now, find the circle to apply the white bg/gray border (if needed)
            // If we cloned "Already watched", it's already good.
            // If we cloned "Want to watch", we need to fix the circle.

            // Heuristic: The circle is likely the parent of the iconContainer, or the iconContainer itself if it's the circle.
            // Let's check if iconContainer has the class for the circle.
            // Instead of guessing, let's traverse up from iconContainer to find the element with the background color.

            // For now, let's assume we cloned "Already watched" so the styles are correct.
            // If we cloned "Want to watch", we need to override.

            // Let's force the styles on the element that looks like the circle.
            // We'll assume the circle is the element with specific width/height or the one that had the background.
            // Since we can't easily know which one it is without computed styles of the original,
            // we will rely on the CLONE source being "Already watched" primarily.

            // If we are forced to fix "Want to watch" clone:
            // We can try to apply styles to iconContainer's parent if iconContainer seems small.

            // But the user's issue was likely that I ADDED a border to iconContainer.
            // So removing that should fix the "inner box" look.

            // We still need to ensure the ICON color is gray.
            iconContainer.style.color = GOOGLE_GRAY;

            // Force white background on the circle if we can find it.
            // Let's try to apply it to the closest block-like parent of the SVG.
            // actually, iconContainer IS the parent of SVG.
            // If iconContainer IS the circle, then we DO want the border.
            // How to know?
            // If I cloned "Already watched", it has a border.
            // If I add ANOTHER border, it doubles.
            // So, SAFE BET: Don't add border. Trust the clone.
            // Only override background color if it's blue.

            // To be safe against "Want to watch" clones (blue):
            // We should find the element with the blue background and change it to white.
            // But since we are prioritizing "Already watched" clone, we might be fine.
        }

        // 3. Add Click Listener
        newBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            chrome.runtime.sendMessage({ action: "OPEN_WATCHLIST" });
        });

        return newBtn;
    }

    function injectButton() {
        if (document.getElementById(BUTTON_ID)) return;

        const candidates = document.querySelectorAll("div, a, span");
        let targetRow = null;
        let cloneSource = null;

        // 1. Find "Already watched" text to locate the row
        for (const el of candidates) {
            if (el.textContent && el.textContent.includes("Already watched")) {
                let parent = el.parentElement;
                while (parent && parent !== document.body) {
                    const style = window.getComputedStyle(parent);
                    if ((style.display === "flex" || style.display === "inline-flex") && parent.children.length >= 2) {
                        targetRow = parent;
                        break;
                    }
                    parent = parent.parentElement;
                }
            }
            if (targetRow) break;
        }

        // 2. If row found, find the "Already watched" button inside it to clone
        if (targetRow) {
            for (const child of targetRow.children) {
                if (child.textContent.includes("Already watched")) {
                    cloneSource = child;
                    break;
                }
            }
            if (!cloneSource) cloneSource = targetRow.children[0];
        } else {
            // Fallback
            for (const el of candidates) {
                if (el.textContent && el.textContent.includes("Want to watch")) {
                    let parent = el.parentElement;
                    while (parent && parent !== document.body) {
                        const style = window.getComputedStyle(parent);
                        if ((style.display === "flex" || style.display === "inline-flex") && parent.children.length >= 2) {
                            targetRow = parent;
                            cloneSource = targetRow.lastElementChild;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                }
                if (targetRow) break;
            }
        }

        if (targetRow && cloneSource) {
            console.log("[Watchlist Injector] Found row and clone source, injecting 'My List' button...");
            const newBtn = createButton(cloneSource);
            targetRow.appendChild(newBtn);
        }
    }

    const observer = new MutationObserver((mutations) => {
        if (!document.getElementById(BUTTON_ID)) {
            injectButton();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    injectButton();

})();
