window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 屏蔽广告 + 修改UA
(function() {
    // 1. 修改 UA，伪装成桌面浏览器
    try {
        Object.defineProperty(navigator, 'userAgent', {
            get: function() {
                return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
            }
        });
    } catch(e) {}

    // 2. 拦截广告请求
    var originalFetch = window.fetch;
    if (originalFetch) {
        window.fetch = function(url, options) {
            if (typeof url === 'string' && (url.includes('douhua') || url.includes('adservice') || url.includes('ad.doubleclick'))) {
                console.log('Blocked ad:', url);
                return Promise.reject(new Error('Blocked'));
            }
            return originalFetch(url, options);
        };
    }

    // 3. 定时清理广告元素
    setInterval(function() {
        var selectors = ['[id*="douhua"]', '[class*="douhua"]', 'iframe[src*="ad"]'];
        selectors.forEach(function(sel) {
            document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
        });
    }, 2000);
})();