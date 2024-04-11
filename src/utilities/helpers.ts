import { useEffect, useState } from "react";

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function checkIsFavorite(id: string, favorites: string[]) {
  if (!favorites.length) {
    return;
  }
  if (favorites.includes(id)) {
    return true;
  } else false;
}

export function getStringFromArray(array: { iso_3166_1?: string; id?: number; name: string }[]) {
  return array.map((item, index) => {
    if (index === array.length - 1) {
      return item.name;
    } else return item.name + ", ";
  });
}

export const USDollar = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "USD",
});

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 1500);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
