(function () {
    const BUTTON_ID = "my-custom-watchlist-btn";
    const GOOGLE_GRAY = "#5f6368";
    const GOOGLE_BLUE = "#1a73e8";
    const GOOGLE_BORDER = "#dadce0";
    const GOOGLE_BG_IDLE = "#ffffff";

    // Icon Signatures (SVG Path Data)
    const ICON_SIGNATURES = {
        // "Already watched" checkmark
        CHECKMARK: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z",
        // "Want to watch" bookmark
        BOOKMARK: "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
    };

    // Icon: List with bullets
    const ICON_LIST = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="${GOOGLE_GRAY}">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>`;

    // Inject Styles
    const style = document.createElement('style');
    style.textContent = `
    #${BUTTON_ID}:hover .my-watchlist-text {
        text-decoration: underline;
    }
    /* Force row to not wrap and allow scrolling */
    .my-watchlist-row {
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
        justify-content: flex-start !important;
    }
    .my-watchlist-row::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }
  `;
    document.head.appendChild(style);

    function getWantToWatchColor() {
        // Try to find by text first (common languages)
        const allElements = document.querySelectorAll('div, span, a, button');
        for (const el of allElements) {
            const text = el.textContent ? el.textContent.trim() : "";
            if (["Want to watch", "Añadir a Mi lista", "希望观看", "À voir"].includes(text)) {
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
        newBtn.removeAttribute("jscontroller"); // Remove controller to prevent interference
        newBtn.style.cursor = "pointer";
        newBtn.style.flexShrink = "0";

        const targetColor = getWantToWatchColor();

        // 1. Update Label
        let labelUpdated = false;

        // Helper to find text nodes
        const walker = document.createTreeWalker(newBtn, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        for (const node of textNodes) {
            if (node.textContent.trim().length > 0) {
                node.textContent = "My List";
                if (node.parentElement) {
                    node.parentElement.classList.add("my-watchlist-text");
                    node.parentElement.style.color = targetColor;
                }
                labelUpdated = true;
            }
        }

        // 2. Update Icon & Circle Styles
        const oldIcon = newBtn.querySelector("svg, img");
        if (oldIcon) {
            // We need to find the container of the icon.
            // Usually it's the parent or grandparent.
            // We want to replace the SVG but keep the container styles if possible,
            // OR reset them if they are specific to the old icon.

            // In the dump, the icon is in a span -> div.niO4u -> div.Q6Aqdc
            // We want to replace the SVG inside the span.
            const iconParent = oldIcon.parentElement;
            iconParent.innerHTML = ICON_LIST;

            // Ensure the icon container (circle) has the right look.
            // If we cloned "Already watched", it should be white with gray border.
            // If we cloned "Want to watch", it might be blue.
            // We need to find the element that has the background color.

            // Heuristic: Reset styles on the icon parent to be safe
            iconParent.style.backgroundColor = "transparent";
            iconParent.style.border = "none";
            iconParent.style.color = GOOGLE_GRAY;
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

        let targetRow = null;
        let cloneSource = null;

        // Strategy: Find buttons by SVG Path (Language Agnostic)
        const paths = document.querySelectorAll('path');

        for (const path of paths) {
            const d = path.getAttribute('d');
            if (!d) continue;

            // Check for "Already watched" (Checkmark) or "Want to watch" (Bookmark)
            if (d === ICON_SIGNATURES.CHECKMARK || d.includes("M9 16.2L4.8 12") ||
                d === ICON_SIGNATURES.BOOKMARK || d.includes("M17 3H7")) {

                // Traverse up to find the BUTTON element
                let current = path.parentElement;
                let buttonCandidate = null;

                // Go up max 5 levels to find role="button" or tag="A" or class="fOYFme" (from dump)
                for (let i = 0; i < 6; i++) {
                    if (!current || current === document.body) break;

                    const role = current.getAttribute("role");
                    const tag = current.tagName;

                    // Check if this is the button wrapper
                    if (role === "button" || tag === "A" || current.classList.contains("fOYFme")) {
                        buttonCandidate = current;
                        // Don't break yet, we want the outermost button wrapper if nested
                        // Actually, usually the outermost one is the one in the flex row.
                        // In the dump: div#lbaHdc (role=button) is the child of div.ynrNJf (row)

                        // Let's verify if the PARENT is a row (flex container)
                        const parentStyle = window.getComputedStyle(current.parentElement);
                        if (parentStyle.display === "flex" || parentStyle.display === "inline-flex") {
                            // Found it!
                            cloneSource = current;
                            targetRow = current.parentElement;
                            break;
                        }
                    }
                    current = current.parentElement;
                }

                if (targetRow && cloneSource) break;
            }
        }

        if (targetRow && cloneSource) {
            console.log("[Watchlist Injector] Found row via Icon/Role, injecting 'My List' button...");
            const newBtn = createButton(cloneSource);

            targetRow.classList.add("my-watchlist-row");
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
