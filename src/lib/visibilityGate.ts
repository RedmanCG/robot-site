const DEFAULT_ROOT_MARGIN = 320;

interface VisibilityGateOptions {
  element: Element;
  onChange: (active: boolean) => void;
  rootMargin?: number;
}

export function createVisibilityGate({
  element,
  onChange,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: VisibilityGateOptions) {
  let isInView = false;
  let isPageVisible = document.visibilityState === "visible";

  const update = () => {
    onChange(isInView && isPageVisible);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isInView = entry.isIntersecting;
      update();
    },
    { rootMargin: `${rootMargin}px 0px` }
  );

  const handleVisibilityChange = () => {
    isPageVisible = document.visibilityState === "visible";
    update();
  };

  observer.observe(element);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  const rect = element.getBoundingClientRect();
  isInView =
    rect.top < window.innerHeight + rootMargin && rect.bottom > -rootMargin;
  update();

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}
