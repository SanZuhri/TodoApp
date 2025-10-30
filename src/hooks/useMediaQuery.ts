import { useState, useEffect } from "react";

/**
 * Custom hook for responsive media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks
 */
export function useIsSmall() {
  return useMediaQuery("(max-width: 639px)");
}

export function useIsMedium() {
  return useMediaQuery("(min-width: 640px) and (max-width: 767px)");
}

export function useIsLarge() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsExtraLarge() {
  return useMediaQuery("(min-width: 1024px)");
}
