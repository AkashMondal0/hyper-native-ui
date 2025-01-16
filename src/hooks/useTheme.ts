import { useContext } from "react";
import ThemeContext, { ThemeHook } from "../context/themeContext";

const useTheme = (): ThemeHook => {
    const themeContext = useContext(ThemeContext);

    return {
        themeScheme: themeContext!.themeScheme,
        currentTheme: themeContext!.currentTheme,
        toggleTheme: themeContext!.toggleTheme,
        changeTheme: themeContext!.changeTheme,
        systemTheme: themeContext!.systemTheme,
        themeName: themeContext!.themeName,
        changeStatusBarColor: themeContext!.changeStatusBarColor,
        navigationThemeValues: themeContext!.navigationThemeValues,
        statusBarColor: themeContext!.statusBarColor,
        setInitialTheme: themeContext!.setInitialTheme,
        setSystemTheme: themeContext!.setSystemTheme
    };
};

export default useTheme;