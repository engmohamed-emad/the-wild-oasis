import { useRef, useEffect } from 'react';
export function UseOutsideClick({handler, listeningCapture}) {
  const ref = useRef();
  useEffect(function() {
    function handleClick(e)
    {
      if ((ref.current && !ref.current.contains(e.target)) || (e.key === "Escape")) {
        handler();
      }
    }
    document.addEventListener("keydown", handleClick, listeningCapture);
    document.addEventListener("click", handleClick, listeningCapture);
    return () => {

      document.removeEventListener("keydown", handleClick, listeningCapture);
      document.removeEventListener("click", handleClick, listeningCapture);
    };
  }, [handler]);
    return ref;
}


