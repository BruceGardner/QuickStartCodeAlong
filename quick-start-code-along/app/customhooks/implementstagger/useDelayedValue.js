import { useEffect, useState } from 'react';

export function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    let frame = requestAnimationFrame(() => {
      const id = setTimeout(() => {
        setDelayedValue(value);
      }, delay);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [value, delay]);

  return delayedValue;
}