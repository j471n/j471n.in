import React, { useState, useContext, useEffect, createContext } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  changeDarkMode(value: boolean): void;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setDarkMode] = useState(false);

  function updateTheme() {
    const currentTheme = localStorage.getItem("isDarkMode") || "false";
    if (currentTheme === "true") {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }
  useEffect(() => {
    updateTheme();
  }, []);
  function changeDarkMode(value: boolean) {
    localStorage.setItem("isDarkMode", value.toString());
    // setDarkMode(value);
    updateTheme();
  }

  const contextValue: DarkModeContextType = {
    isDarkMode,
    changeDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = (): DarkModeContextType | null => {
  return useContext(DarkModeContext);
};
