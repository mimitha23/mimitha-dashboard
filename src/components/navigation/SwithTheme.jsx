import { useThemeContext } from "providers/ThemeProvider";
import { SunIcon, MoonIcon } from "components/layouts/Icons";

export default function SwithTheme() {
  const { changeTheme, currentThemeMode } = useThemeContext();

  return (
    <div>
      <button
        onClick={() =>
          changeTheme(currentThemeMode === "DARK" ? "LIGHT" : "DARK")
        }
      >
        {currentThemeMode === "DARK" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}
