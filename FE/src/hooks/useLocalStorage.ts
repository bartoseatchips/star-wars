import { useState } from 'react';
import LZString from 'lz-string';

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(LZString.decompressFromUTF16(value));
      } else {
        const defaultValueCompressed = LZString.compressToUTF16(
          JSON.stringify(defaultValue)
        );
        window.localStorage.setItem(keyName, defaultValueCompressed);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      const newValueCompressed = LZString.compressToUTF16(
        JSON.stringify(newValue)
      );
      window.localStorage.setItem(keyName, newValueCompressed);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
