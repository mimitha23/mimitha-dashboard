const BaseTheme = {
  colors: {},
};

export const ThemeLight = {
  ...BaseTheme,
  colors: {
    ...BaseTheme.colors,
    text: "#000",
    bg: "#fff",
  },
  mode: "LIGHT",
};

export const ThemeDark = {
  ...BaseTheme,
  colors: {
    ...BaseTheme.colors,
    text: "#fff",
    bg: "#000",
  },
  mode: "DARK",
};
