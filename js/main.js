// Highlight the current section's nav link while scrolling.
(function () {
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();

// Reveal the work tiles, staggered, whenever they enter view.
(function () {
  const tiles = Array.from(document.querySelectorAll(".work-tile"));
  if (!tiles.length) return;

  if (!("IntersectionObserver" in window)) {
    tiles.forEach((tile) => tile.classList.add("in-view"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );
  tiles.forEach((tile) => revealObserver.observe(tile));
})();

// Reveal each section's heading and content block as it enters view.
(function () {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => revealObserver.observe(item));
})();

// Type out the hero tagline once the hero has finished fading in. Falls
// back to showing the full text immediately if the user prefers reduced
// motion, or if anything about the markup is missing.
(function () {
  const lines = Array.from(document.querySelectorAll(".tw-line"));
  const cursor = document.querySelector(".tw-cursor");
  if (!lines.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    lines.forEach((line) => {
      line.textContent = line.dataset.text || "";
    });
    return;
  }

  const CHAR_DELAY = 32;
  const START_DELAY = 1150; // lets the tagline's own fade-in finish first

  // Clear immediately (well inside the tagline's opacity:0 window) so
  // there is no flash of full text before typing begins.
  lines.forEach((line) => {
    line.textContent = "";
  });

  const typeLine = (line) =>
    new Promise((resolve) => {
      const text = line.dataset.text || "";
      let i = 0;
      const step = () => {
        line.textContent = text.slice(0, i);
        i += 1;
        if (i <= text.length) {
          setTimeout(step, CHAR_DELAY);
        } else {
          resolve();
        }
      };
      step();
    });

  const typeAll = async () => {
    for (const line of lines) {
      await typeLine(line);
    }
    if (cursor) cursor.classList.add("done");
  };

  window.setTimeout(typeAll, START_DELAY);
})();

// Cursor-following highlight on each work tile, tracked only on pointer
// devices, and only while the pointer is actually over the tile.
(function () {
  const tiles = document.querySelectorAll(".work-tile");
  if (!tiles.length || window.matchMedia("(pointer: coarse)").matches) return;

  tiles.forEach((tile) => {
    tile.addEventListener("pointermove", (event) => {
      const rect = tile.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      tile.style.setProperty("--mx", `${x}%`);
      tile.style.setProperty("--my", `${y}%`);
    });
  });
})();
