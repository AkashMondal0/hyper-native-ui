import { useContext } from "react";
import { StatusBarVariant, ThemeColors, ThemeName, ThemeSchema } from "../constants/Colors";
import ThemeContext, { ThemeHook } from "../context/themeContext";

const useTheme = (): {
    currentTheme: ThemeColors,
    themeScheme: ThemeSchema,
    themeName: ThemeName,
    toggleTheme: () => void,
    changeTheme: (themeName: ThemeName) => void,
    navigationThemeValues: ThemeHook["navigationThemeValues"],
    changeStatusBarColor: (themeName: StatusBarVariant) => void,
    statusBarColor: StatusBarVariant
} => {
    const themeContext = useContext(ThemeContext);

    return {
        themeScheme: themeContext!.themeScheme,
        currentTheme: themeContext!.currentTheme,
        toggleTheme: themeContext!.toggleTheme,
        changeTheme: themeContext!.changeTheme,
        themeName: themeContext!.themeName,
        changeStatusBarColor: themeContext!.changeStatusBarColor,
        navigationThemeValues: themeContext!.navigationThemeValues,
        statusBarColor: themeContext!.statusBarColor
    };
};

export default useTheme;