import { useState, useEffect } from "react";

export function useAntojos() {
  const [antojos, setAntojos] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("alma_antojos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("alma_antojos", JSON.stringify(antojos));
  }, [antojos]);

  const toggleAntojo = (key: string) => {
    setAntojos((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const isAntojo = (key: string) => antojos.includes(key);

  return {
    antojos,
    toggleAntojo,
    isAntojo,
  };
}
