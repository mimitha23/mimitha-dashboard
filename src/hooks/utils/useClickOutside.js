import { useEffect, useRef } from "react";

export default function useClickOutside(isActive, handler) {
  const container_ref = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event) => {
      if (
        container_ref.current &&
        !container_ref.current.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, isActive]);

  return container_ref;
}
