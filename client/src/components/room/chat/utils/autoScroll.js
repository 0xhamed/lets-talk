export default container => {
  const lastElement = container.lastElementChild;
  if (!lastElement) return;
  const lastElementStyles = getComputedStyle(lastElement);
  const lastElementMargin = parseInt(lastElementStyles.marginBottom);
  const lastElementHeight = lastElement.offsetHeight + lastElementMargin;
  const visibleHeight = container.offsetHeight;
  const containerHeight = container.scrollHeight;
  const scrollOffset = container.scrollTop + visibleHeight;

  if (containerHeight - lastElementHeight <= scrollOffset) {
    container.scrollTop = container.scrollHeight;
  }
};
