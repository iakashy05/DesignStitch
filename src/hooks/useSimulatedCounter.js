import { useState, useEffect } from 'react';

/**
 * A custom hook to simulate a dynamically growing counter.
 * Persists the counter in localStorage so it doesn't reset on page refresh.
 * 
 * @param {string} storageKey The key to store in localStorage
 * @param {number} initialValue The starting count value if not stored
 * @param {number} minIncrement Minimum amount to increase by
 * @param {number} maxIncrement Maximum amount to increase by
 * @param {number} intervalMs How often to increase the counter (in milliseconds)
 */
export const useSimulatedCounter = (
  storageKey,
  initialValue = 49923,
  minIncrement = 1,
  maxIncrement = 3,
  intervalMs = 5000
) => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = parseInt(saved, 10);
      return isNaN(parsed) ? initialValue : parsed;
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, count.toString());
  }, [count, storageKey]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [minIncrement, maxIncrement, intervalMs]);

  return count;
};
