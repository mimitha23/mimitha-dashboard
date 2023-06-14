/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { AppStyles } from "styles/GlobalStyles";
import { ThemeLight, ThemeDark } from "styles/Theme";

const ThemeContext = createContext({
  currentThemeMode: "",
  changeTheme: (mode) => {},
});

export default function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState({
    mode: ThemeLight.mode,
    theme: ThemeLight,
  });

  function setTheme(mode) {
    if (mode === "DARK") {
      setActiveTheme({
        mode: ThemeDark.mode,
        theme: ThemeDark,
      });
    } else if (mode === "LIGHT") {
      setActiveTheme({
        mode: ThemeLight.mode,
        theme: ThemeLight,
      });
    }
  }

  function changeTheme(mode) {
    setTheme(mode);
    localStorage.setItem("mimitha_dashboard_theme", JSON.stringify(mode));
  }

  useEffect(() => {
    const cachedMode = localStorage.getItem("mimitha_dashboard_theme")
      ? JSON.parse(localStorage.getItem("mimitha_dashboard_theme"))
      : "";

    if (cachedMode && cachedMode !== activeTheme.mode) setTheme(cachedMode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        currentThemeMode: activeTheme.mode,
      }}
    >
      <StyledThemeProvider theme={activeTheme.theme}>
        <AppStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
