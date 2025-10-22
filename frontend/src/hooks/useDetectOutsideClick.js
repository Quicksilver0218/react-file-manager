import { useCallback, useEffect, useRef, useState } from "react";

export const useDetectOutsideClick = (handleOutsideClick = () => {}) => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);

  const handleClick = useCallback(event => {
    if (!ref.current?.contains(event.target)) {
      setIsClicked(true);
      handleOutsideClick(event, ref);
    } else {
      setIsClicked(false);
    }
  }, [handleOutsideClick]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return { ref, isClicked, setIsClicked };
};
