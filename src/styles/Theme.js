const BaseTheme = {
  colors: {
    gray_shade: "rgba(215, 215, 215, 1)",
    gray_tint: "rgba(240, 240, 240, 1)",
    white: "#fff",
    black: "#000",
    black_tr_05: "rgba(0,0,0,0.5)",
    black_tr_02: "rgba(0,0,0,0.2)",
    green: "#26E066",
    green_shade: "#018849",
    red: "#d01345",
    blue: "#1481ee",
    blue_tint: "#cde2f5",
  },
  fontSize: {
    sm: "1.2rem",
    md: "1.4rem",
    base: "1.6rem",
    lg: "1.8rem",
    xl: "2rem",
    xxl: "2.2rem",
    h3: "3rem",
  },
  app: {
    nav_h: "6rem",
  },
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
