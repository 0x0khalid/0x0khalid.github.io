// Theme toggle (class-based, matches jdhruv.dev's next-themes setup) + persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  toggle?.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (e) {}
  });
})();

// Search modal (visual/UX only — no index behind it yet)
(function () {
  const modal = document.getElementById("search-modal");
  const btn = document.getElementById("search-btn");
  const input = document.getElementById("search-input");
  const backdrop = modal?.querySelector(".search-backdrop");

  function open() {
    modal.hidden = false;
    input?.focus();
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

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
