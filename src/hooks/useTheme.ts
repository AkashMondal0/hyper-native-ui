import { useContext } from "react";
import ThemeContext, { ThemeHook } from "../context/themeContext";

const useTheme = (): ThemeHook => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeProvider Not Found')
    };

    return {
        themeScheme: themeContext!.themeScheme,
        currentTheme: themeContext!.currentTheme,
        toggleTheme: themeContext!.toggleTheme,
        changeTheme: themeContext!.changeTheme,
        themeName: themeContext!.themeName,
        changeStatusBarColor: themeContext!.changeStatusBarColor,
        statusBarColor: themeContext!.statusBarColor,
        currentColorScheme: themeContext!.currentColorScheme,
        initialTheme: themeContext!.initialTheme,
    };
};

export default useTheme;