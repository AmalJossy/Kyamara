import { useState, useEffect } from "react";

/**
 * Custom hook for working with Chrome extension storage
 * !Warning:The storage is local to the extension but data is shared across tabs
 * @see https://developer.chrome.com/docs/extensions/reference/storage/
 * @param key The storage key to use
 * @param defaultValue The default value if no value exists in storage
 * @returns [currentValue, setterFunction] similar to useState
 */
function useStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial value from storage
  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (key in result) {
        setValue(result[key]);
      } else {
        setValue(defaultValue);
      }
      setIsInitialized(true);
    });

    // Listen for changes to this key from other contexts
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      area: string
    ) => {
      if (area === "local" && key in changes) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [key, defaultValue]);

  // Function to update the value in state and storage
  const setStorageValue = (newValue: T) => {
    // Only update if initialized to prevent overwriting with default value
    if (isInitialized) {
      chrome.storage.local.set({ [key]: newValue });
      setValue(newValue);
    }
  };

  return [value, setStorageValue];
}

export default useStorage;
