const ANALYTICS_CONFIG = {
    GA_ID: 'G-TZECWHLSW6',
    CLARITY_ID: 'ubosi54uti'
};

// Microsoft Clarity
(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", ANALYTICS_CONFIG.CLARITY_ID);

// Google Analytics
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_ID}`;
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', ANALYTICS_CONFIG.GA_ID);
