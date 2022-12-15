import React, { useState, useContext, useEffect, createContext } from "react";

type DarkModeContext = {
  isDarkMode: boolean;
  changeDarkMode(value: boolean): void;
};

const DarkModeContext = createContext<DarkModeContext | null>(null);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

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

  return (
    <DarkModeContext.Provider value={{ isDarkMode, changeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }
  return context;
};
