import { useEffect } from 'react';

/**
 * Closes when clicked outside of the reference
 * @param ref - the reference (targer) to close
 * @param callback - action to close
 */
export default function useClickOutside(
  ref: { current: any } | null,
  callback: any
) {
  const handler = (event: any) => {
    // if click happened outside of the div where the ref is used
    if (ref!.current && !ref!.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    // Clears the event listeners
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
}
