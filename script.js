// Theme toggle (class-based, matches jdhruv.dev's next-themes setup) + persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  toggle?.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
    document.dispatchEvent(new CustomEvent("themechange", { detail: { isDark } }));
  });
})();

// View count badge: background color matched to the page's own
// background so the badge box visually disappears, leaving only the
// number -- no square, like jdhruv.dev's plain live number. Only
// increments once on page load; theme toggles just re-fetch the same
// count in the new matching color, without counting another visit.
(function () {
  const img = document.getElementById("view-count-badge");
  if (!img) return;

  const LIGHT_BG = "ffffff";
  const DARK_BG = "060607";

  function badgeUrl(isDark, action) {
    const bg = isDark ? DARK_BG : LIGHT_BG;
    return `https://hits.sh/0x0khalid.github.io.svg?style=flat-square&action=${action}&color=${bg}&label=%20`;
  }

  const isDarkNow = document.documentElement.classList.contains("dark");
  img.src = badgeUrl(isDarkNow, "increment");

  document.addEventListener("themechange", (e) => {
    img.src = badgeUrl(e.detail.isDark, "view");
  });
})();

// Search modal — real client-side search over this page's own content
(function () {
  const modal = document.getElementById("search-modal");
  const btn = document.getElementById("search-btn");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const backdrop = modal?.querySelector(".search-backdrop");
  if (!modal || !input || !results) return;

  // EDIT: keep this in sync with the page's real content as you edit it
  const index = [
    { title: "About", snippet: "Cybersecurity & AI — leading teams bridging Red and Blue, Purple Team operations, AI-driven detection, threat intelligence", href: "#about" },
    { title: "Connect — Twitter", snippet: "x.com/5e9", href: "#connect" },
    { title: "Connect — LinkedIn", snippet: "linkedin.com/in/khalid-alsubhi", href: "#connect" },
    { title: "Connect — Mail", snippet: "khalid5e9@outlook.sa", href: "#connect" },
    { title: "GitHub Activity", snippet: "Contribution graph for 0x0khalid", href: "#activity" },
    { title: "Projects", snippet: "Personal Notion Site — Notion + GitHub Pages", href: "#projects" },
    { title: "Home", snippet: "⁵ᵉ⁹ by Khalid", href: "#top" },
  ];

  let activeIndex = -1;
  let currentMatches = [];

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function highlight(text, query) {
    const safe = escapeHtml(text);
    if (!query) return safe;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return safe;
    return escapeHtml(text.slice(0, i)) + "<mark>" + escapeHtml(text.slice(i, i + query.length)) + "</mark>" + escapeHtml(text.slice(i + query.length));
  }

  function render(query) {
    results.innerHTML = "";
    activeIndex = -1;
    if (!query) { currentMatches = []; return; }

    currentMatches = index.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.snippet.toLowerCase().includes(query.toLowerCase())
    );

    if (currentMatches.length === 0) {
      const li = document.createElement("li");
      li.className = "search-empty";
      li.textContent = `No results for "${query}"`;
      results.appendChild(li);
      return;
    }

    currentMatches.forEach((item, i) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.dataset.active = i === 0 ? "true" : "false";
      button.innerHTML = `<span class="sr-title">${highlight(item.title, query)}</span><span class="sr-snippet">${highlight(item.snippet, query)}</span>`;
      button.addEventListener("click", () => go(item.href));
      li.appendChild(button);
      results.appendChild(li);
    });
    activeIndex = 0;
  }

  function go(href) {
    close();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateActive(next) {
    const buttons = results.querySelectorAll(".search-result");
    if (!buttons.length) return;
    activeIndex = (next + buttons.length) % buttons.length;
    buttons.forEach((b, i) => (b.dataset.active = i === activeIndex ? "true" : "false"));
    buttons[activeIndex].scrollIntoView({ block: "nearest" });
  }

  input.addEventListener("input", () => render(input.value.trim()));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); updateActive(activeIndex + 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); updateActive(activeIndex - 1); }
    if (e.key === "Enter" && currentMatches[activeIndex]) go(currentMatches[activeIndex].href);
  });

  function open() {
    modal.hidden = false;
    input.value = "";
    results.innerHTML = "";
    input.focus();
  }
  function close() {
    modal.hidden = true;
  }

  btn?.addEventListener("click", open);
  backdrop?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      modal.hidden ? open() : close();
    }
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();

// "More" nav dropdown
(function () {
  const btn = document.getElementById("more-btn");
  const menu = document.getElementById("more-menu");
  if (!btn || !menu) return;

  function close() {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  }
  function toggle() {
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    btn.setAttribute("aria-expanded", String(willOpen));
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle();
  });
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

// Avatar toggle: real photo <-> illustrated portrait
(function () {
  const avatar = document.getElementById("hero-avatar");
  const btn = document.getElementById("avatar-toggle");
  if (!avatar || !btn) return;

  btn.addEventListener("click", () => {
    const next = avatar.dataset.mode === "photo" ? "alt" : "photo";
    avatar.dataset.mode = next;
    btn.setAttribute("title", next === "alt" ? "Back to photo" : "Toggle avatar");
  });
})();

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
