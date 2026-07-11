const sectionLinks = document.querySelectorAll(".nav-link[data-section]");

const sections = Array.from(sectionLinks)
  .map((link) => {
    const sectionId = link.getAttribute("data-section");
    const section = document.getElementById(sectionId);

    return {
      link,
      section,
    };
  })
  .filter((item) => item.section);

function setActiveNavLink() {
  let currentSectionId = null;

  sections.forEach(({ section }) => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.id;
    }
  });

  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("data-section") === currentSectionId;
    link.classList.toggle("active", isActive);
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);
// Projects page category filter
const projectFilterButtons = document.querySelectorAll(".project-filter-button");
const projectPageCards = document.querySelectorAll(".project-page-card[data-category]");

if (projectFilterButtons.length && projectPageCards.length) {
  projectFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      projectFilterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      projectPageCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const isCombinedAiFilter = selectedFilter === "ai-combined";
        const shouldShow =
          selectedFilter === "all" ||
          (isCombinedAiFilter && (categories.includes("ai") || categories.includes("genai"))) ||
          categories.includes(selectedFilter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}
