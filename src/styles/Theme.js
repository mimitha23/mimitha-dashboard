const BaseTheme = {
  colors: {
    white: "#fff",
    black: "#000",
    gray_shade: "rgba(215, 215, 215, 1)",
    gray_tint: "rgba(240, 240, 240, 1)",
    dark_gray: "#2D2D2D",
    black_tr_08: "rgba(0,0,0,0.8)",
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
  shadow: {
    bottom_right_md_dark: "3px 3px 9px 0px rgba(0, 0, 0, 0.75)",
    top_left_md_dark: "-3px -3px 9px 0px rgba(0, 0, 0, 0.75)",
    bottom_right_md_light: "3px 3px 9px 0px rgba(299, 299, 299, 0.75)",
    radial_sm_dark: "0 0 0.5rem rgba(0, 0, 0, 0.5)",
    radial_sm_light: "0 0 0.5rem rgba(299, 299, 299, 0.5)",
    radial_sm_dark_fade: "0 0 0.75rem 0.2rem rgba(0, 0, 0, 0.2)",
    radial_sm_light_fade: "0 0 0.75rem 0.2rem rgba(299, 299, 299, 0.2)",
    radial_lg_dark: "0 0 2.5rem 0.5rem rgba(0, 0, 0, 0.5)",
    radial_lg_light: "0 0 2.5rem 0.5rem rgba(299, 299, 299, 0.5)",
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
