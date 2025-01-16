import React, { ReactNode, useCallback, useMemo, useReducer } from "react";
import { ThemeName, ThemeColors, ThemeSchema, themeColors, StatusBarVariant } from "../constants/Colors";
import ThemeContext from "../context/themeContext";

type ThemeAction = {
    type: "TOGGLE_THEME_LIGHT_AND_DARK" | "SET_INITIAL_THEME" | "CHANGE_THEME" | "CHANGE_STATUSBAR_COLOR";
    payload?: { themeName?: ThemeName, themeSchema?: ThemeSchema, statusBarVariant?: StatusBarVariant } | undefined,
}

type ThemeReducer = (state: ThemeState, action: ThemeAction) => ThemeState

type ThemeState = {
    theme: ThemeSchema,
    themeName: ThemeName,
    statusBarColor: StatusBarVariant,
    currentTheme: ThemeColors,
}

const initialTheme: ThemeState = {
    theme: 'light',
    themeName: 'Zinc',
    statusBarColor: 'default',
    currentTheme: themeColors[0]['light']
}

const themeReducer: ThemeReducer = (state, action) => {
    if (action.type === 'TOGGLE_THEME_LIGHT_AND_DARK') {
        const themeSchema = state.theme === 'light' ? 'dark' : 'light';
        return {
            ...state,
            theme: themeSchema,
            currentTheme: themeColors.find(theme => theme.name === state.themeName)![themeSchema],
        }
    }
    if (action.type === 'CHANGE_THEME') {
        if (!action?.payload || !action.payload.themeName) return state;
        return {
            ...state,
            themeName: action.payload.themeName,
            currentTheme: themeColors.find(theme => theme.name === action.payload?.themeName)![state.theme],
        }
    }
    if (action.type === 'SET_INITIAL_THEME') {
        if (!action?.payload || !action.payload.themeName || !action.payload.themeSchema) return state;
        return {
            ...state,
            theme: action?.payload.themeSchema,
            themeName: action.payload.themeName,
            currentTheme: themeColors.find(theme => theme.name === action.payload?.themeName)![action?.payload.themeSchema],
        }
    }
    if (action.type === 'CHANGE_STATUSBAR_COLOR') {
        if (!action?.payload || !action.payload.statusBarVariant) return state;
        return {
            ...state,
            statusBarColor: action.payload.statusBarVariant,
        }
    }
    return state;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer<ThemeReducer>(themeReducer, initialTheme);

    const toggleTheme = useCallback(() => {
        dispatch({ type: 'TOGGLE_THEME_LIGHT_AND_DARK' })
    }, [state.themeName])

    const changeTheme = useCallback((_themeName: ThemeName) => {
        dispatch({ type: 'CHANGE_THEME', payload: { themeName: _themeName } })
    }, [])

    const changeStatusBarColor = useCallback((themeName: StatusBarVariant) => {
        dispatch({ type: "CHANGE_STATUSBAR_COLOR", payload: { statusBarVariant: themeName } })
    }, [])

    const setInitialTheme = useCallback(({ themeSchema, themeName }: { themeSchema: ThemeSchema, themeName: ThemeName }) => {
        dispatch({ type: 'SET_INITIAL_THEME', payload: { themeSchema, themeName } })
    }, [])

    const navigationThemeValues = useMemo(() => {
        return {
            dark: state.theme === 'dark',
            colors: {
                primary: state.currentTheme.primary,
                background: state.currentTheme.background,
                card: state.currentTheme.card,
                text: state.currentTheme.primary_foreground,
                border: state.currentTheme.border,
                notification: state.currentTheme.destructive,
            },
        }
    }, [state.theme, state.currentTheme])

    return (
        <ThemeContext.Provider value={{
            currentTheme: state.currentTheme,
            themeName: state.themeName,
            themeScheme: state.theme,
            navigationThemeValues: navigationThemeValues,
            toggleTheme,
            changeTheme,
            setInitialTheme,
            changeStatusBarColor,
            statusBarColor: state.statusBarColor,
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;