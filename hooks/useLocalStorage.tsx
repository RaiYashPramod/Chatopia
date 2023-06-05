import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: string) => {
  // Get the initial value from local storage or use the provided initial value
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update local storage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
