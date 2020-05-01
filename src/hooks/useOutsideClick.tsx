import { useEffect, RefObject } from "react";

export default function useOutsideClick(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      } else {
        handler(event);
      }
    }
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener)
  }, [handler, ref]);
}
