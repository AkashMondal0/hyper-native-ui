import { createContext } from "react";
import { ThemeName, ThemeColors, ThemeSchema, StatusBarVariant } from "../constants/Colors";
export type ThemeState = {
    colorScheme: "light" | "dark",
    currentColorScheme: ThemeSchema,
    themeName: ThemeName,
    statusBarColor: StatusBarVariant,
    currentTheme: ThemeColors,
}

export type ThemeAction = {
    type: "TOGGLE_THEME_LIGHT_AND_DARK" | "SET_SYSTEM_THEME" | "SET_INITIAL_THEME" | "CHANGE_THEME" | "CHANGE_STATUSBAR_COLOR";
    payload?: {
        colorScheme?: "light" | "dark",
        currentColorScheme?: ThemeSchema,
        themeName?: ThemeName,
        statusBarColor?: StatusBarVariant,
        currentTheme?: ThemeColors,
    } | undefined,
}

export type ThemeReducer = (state: ThemeState, action: ThemeAction) => ThemeState;
export interface ThemeHook {
    themeScheme: "light" | "dark",
    currentColorScheme: ThemeSchema,
    themeName: ThemeName,
    currentTheme: ThemeColors,
    toggleTheme: (themeSchema?: "light" | "dark") => void,
    changeTheme: (themeName: ThemeName) => void,
    changeStatusBarColor: (themeName: StatusBarVariant) => void,
    statusBarColor: StatusBarVariant
}
const ThemeContext = createContext<ThemeHook | undefined>(undefined);
export default ThemeContext;