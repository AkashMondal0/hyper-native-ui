import { useCallback, useState } from "react";
import { ColorNames, ColorScheme, ThemeSchema, themeColors } from "../constants/Colors";

export const useTheme = (): {
    currentTheme: ColorScheme,
    theme: ThemeSchema,
    toggleTheme: () => void,
    changeTheme: (themeName: ColorNames) => void
} => {
    const [theme, setTheme] = useState<ThemeSchema>('light');
    const [themeName, setThemeName] = useState<ColorNames>("Zinc");
    const [currentTheme, setCurrentTheme] = useState<ColorScheme>(themeColors[0][theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        const index = themeColors.findIndex((theme) => theme.name === themeName);
        if (index === -1) return;
        setCurrentTheme(themeColors[index][(theme === 'light' ? 'dark' : 'light')]);
    }, [theme, themeName]);

    const changeTheme = useCallback((_themeName: ColorNames) => {
        const index = themeColors.findIndex((theme) => theme.name === _themeName);
        if (index === -1) return;
        setThemeName(themeName);
        setCurrentTheme(themeColors[index][theme]);
    }, [theme, themeColors]);

    return {
        theme,
        currentTheme,
        toggleTheme,
        changeTheme
    };
};