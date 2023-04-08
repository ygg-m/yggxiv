export function scrollToTop(value?: number): void {
  setTimeout(() => {
    window.scrollTo({
      top: value || 0,
      behavior: "smooth",
    });
  }, 50);
}

export function scrollToBottom(): void {
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, 50);
}
