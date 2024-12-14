import { createContext } from "react";
import { ThemeName, ThemeColors, ThemeSchema } from "../constants/Colors";
interface ThemeHook {
    currentTheme: ThemeColors,
    themeName: ThemeName,
    themeScheme: ThemeSchema,
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
    toggleTheme: () => void,
    changeTheme: (themeName: ThemeName) => void,
    setInitialTheme: () => void,
}
const ThemeContext = createContext<ThemeHook | undefined>(undefined);
export default ThemeContext;