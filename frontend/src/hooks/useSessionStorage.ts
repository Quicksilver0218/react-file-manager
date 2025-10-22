import { useEffect, useState } from "react";

export default function useSessionStorage(key: string, initialValue?: string) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const value = sessionStorage.getItem(key);
    if (value)
      setValue(JSON.parse(value));
  }, [key]);
  return [value, (value?: string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }];
}