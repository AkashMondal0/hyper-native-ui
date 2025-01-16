import { createContext } from "react";
import { ThemeName, ThemeColors, ThemeSchema, StatusBarVariant } from "../constants/Colors";
export interface ThemeHook {
    currentTheme: ThemeColors,
    themeName: ThemeName,
    themeScheme: ThemeSchema,
    systemTheme: boolean,
    navigationThemeValues: {
        dark: boolean,
        colors: {
            primary: string,
            background: string,
            card: string,
            text: string,
            border: string,
            notification: string,
        }
    },
    toggleTheme: (themeSchema?: ThemeSchema) => void,
    changeTheme: (themeName: ThemeName) => void,
    changeStatusBarColor: (themeName: StatusBarVariant) => void,
    statusBarColor: StatusBarVariant,
    setSystemTheme: (systemTheme: boolean) => void
    setInitialTheme: ({ themeSchema, themeName }: { themeSchema: ThemeSchema | "system", themeName: ThemeName }) => void
}
const ThemeContext = createContext<ThemeHook | undefined>(undefined);
export default ThemeContext;