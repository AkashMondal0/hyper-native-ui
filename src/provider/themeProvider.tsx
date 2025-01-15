import React, { ReactNode, useCallback, useMemo, useReducer } from "react";
import { ThemeName, ThemeColors, ThemeSchema, themeColors } from "../constants/Colors";
import ThemeContext from "../context/themeContext";

type ThemeAction = {
    type: "TOGGLE_THEME_LIGHT_AND_DARK" | "SET_INITIAL_THEME" | "CHANGE_THEME",
    payload?: { themeName?: ThemeName, themeSchema?: ThemeSchema } | undefined,
}

type ThemeReducer = (state: ThemeState, action: ThemeAction) => ThemeState

type ThemeState = {
    theme: ThemeSchema,
    themeName: ThemeName,
    currentTheme: ThemeColors,
}

const initialTheme: ThemeState = {
    theme: 'light',
    themeName: 'Zinc',
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
        return {
            ...state,
            currentTheme: themeColors.find(theme => theme.name === state.themeName)![state.theme],
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

    const setInitialTheme = useCallback(() => {
        dispatch({ type: "SET_INITIAL_THEME", payload: { themeName: "Zinc", themeSchema: "dark" } })
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
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;