export function scrollToSection(selector: string) {
  if (selector === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });

    return;
  }

  const element = document.querySelector(selector);

  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
