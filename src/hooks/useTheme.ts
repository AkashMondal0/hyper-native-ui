import { useContext } from "react";
import { ThemeColors, ThemeName, ThemeSchema } from "../constants/Colors";
import ThemeContext from "../../src/context/themeContext";

export const useTheme = (): {
    currentTheme: ThemeColors,
    themeScheme: ThemeSchema,
    themeName: ThemeName,
    toggleTheme: () => void,
    changeTheme: (themeName: ThemeName) => void
} => {
    const themeContext = useContext(ThemeContext);

    return {
        themeScheme: themeContext!.themeScheme,
        currentTheme: themeContext!.currentTheme,
        toggleTheme: themeContext!.toggleTheme,
        changeTheme: themeContext!.changeTheme,
        themeName: themeContext!.themeName,
    };
};