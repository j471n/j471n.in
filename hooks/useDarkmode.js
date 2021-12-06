import React, { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  function updateTheme() {
    const currentTheme = localStorage.getItem("darkMode") || "false";

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
  function changeDarkMode(value) {
    localStorage.setItem("darkMode", value ? "true" : "false");
    // setDarkMode(value);
    updateTheme();
  }

  return { darkMode, changeDarkMode };
}
