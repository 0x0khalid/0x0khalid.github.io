// Theme toggle with persistence
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  const toggle = document.getElementById("theme-toggle");
  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
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

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
