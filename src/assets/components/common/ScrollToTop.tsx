import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  // Ensure the browser doesn't auto-restore scroll on navigation
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
    return undefined;
  }, []);

  // Scroll to top on path or query change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}


