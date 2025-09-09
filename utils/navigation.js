import Colors from "../constants/Colors";

export const getNavigationTheme = (theme) => {
  const currentColors = Colors[theme];
  return {
    dark: theme === 'dark',
    colors: {
      primary: currentColors.primary,
      background: currentColors.background,
      card: currentColors.cardBackground,
      text: currentColors.text,
      border: currentColors.borderColor,
      notification: currentColors.secondary,
    },
    fonts: {
      regular: {}
    },
  };
};
