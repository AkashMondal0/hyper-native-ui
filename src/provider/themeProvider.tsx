import React, { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { ThemeName, ThemeColors, ThemeSchema, themeColors, StatusBarVariant } from "../constants/Colors";
import ThemeContext from "../context/themeContext";
import { Appearance } from "react-native";

type ThemeAction = {
    type: "TOGGLE_THEME_LIGHT_AND_DARK" | "SET_SYSTEM_THEME" | "SET_INITIAL_THEME" | "CHANGE_THEME" | "CHANGE_STATUSBAR_COLOR";
    payload?: {
        themeName?: ThemeName,
        themeSchema?: ThemeSchema,
        statusBarVariant?: StatusBarVariant,
        systemTheme?: boolean
    } | undefined,
}

type ThemeReducer = (state: ThemeState, action: ThemeAction) => ThemeState

type ThemeState = {
    theme: ThemeSchema,
    systemTheme: boolean,
    themeName: ThemeName,
    statusBarColor: StatusBarVariant,
    currentTheme: ThemeColors,
}

const initialTheme: ThemeState = {
    theme: 'light',
    systemTheme: true,
    themeName: 'Zinc',
    statusBarColor: 'default',
    currentTheme: themeColors[0]['light']
}

const themeReducer: ThemeReducer = (state, action) => {
    if (action.type === 'TOGGLE_THEME_LIGHT_AND_DARK') {
        if (!action?.payload || !action.payload.themeSchema) {
            const themeSchema = state.theme === 'light' ? 'dark' : 'light';
            return {
                ...state,
                theme: themeSchema,
                currentTheme: themeColors.find(theme => theme.name === state.themeName)![themeSchema],
            }
        } else {
            const themeSchema = action.payload.themeSchema;
            return {
                ...state,
                theme: themeSchema,
                currentTheme: themeColors.find(theme => theme.name === state.themeName)![themeSchema],
            }
        }
    }
    if (action.type === 'CHANGE_THEME') {
        if (!action?.payload || !action.payload?.themeName) return state;
        return {
            ...state,
            themeName: action.payload?.themeName ?? state.themeName,
            currentTheme: themeColors.find(theme => theme.name === action.payload?.themeName)![state.theme],
        }
    }
    if (action.type === 'SET_SYSTEM_THEME') {
        if (!action?.payload) return state;
        return {
            ...state,
            systemTheme: action.payload?.systemTheme ?? state.systemTheme,
        }
    }
    if (action.type === 'SET_INITIAL_THEME') {
        if (!action?.payload || !action?.payload?.themeSchema) return state;
        return {
            ...state,
            theme: action?.payload.themeSchema,
            themeName: action.payload.themeName ?? state.themeName,
            systemTheme: action.payload.systemTheme ?? state.systemTheme,
            currentTheme: themeColors.find(theme => theme.name === action.payload?.themeName)![action?.payload?.themeSchema],
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

    const toggleTheme = useCallback((themeSchema?: ThemeSchema) => {
        if (state.systemTheme) return;
        dispatch({ type: 'TOGGLE_THEME_LIGHT_AND_DARK', payload: { themeSchema } });
    }, [state.themeName]);

    const setSystemTheme = useCallback((systemTheme: boolean) => {
        dispatch({ type: 'SET_SYSTEM_THEME', payload: { systemTheme } });
    }, [state.systemTheme]);

    const changeTheme = useCallback((_themeName: ThemeName) => {
        dispatch({ type: 'CHANGE_THEME', payload: { themeName: _themeName } });
    }, []);

    const changeStatusBarColor = useCallback((themeName: StatusBarVariant) => {
        dispatch({ type: "CHANGE_STATUSBAR_COLOR", payload: { statusBarVariant: themeName } });
    }, []);

    const setInitialTheme = useCallback(({ themeSchema, themeName }: { themeSchema: ThemeSchema | "system", themeName: ThemeName }) => {
        if (themeSchema !== "system") {
            dispatch({ type: 'SET_INITIAL_THEME', payload: { themeSchema, themeName, systemTheme: false } });
            return;
        }
        const st = Appearance.getColorScheme() as ThemeSchema;
        dispatch({ type: 'SET_INITIAL_THEME', payload: { themeSchema: st, themeName, systemTheme: true } });
    }, []);

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
        };
    }, [state.theme, state.currentTheme])

    useEffect(() => {
        const unSubscribe = Appearance.addChangeListener(({ colorScheme }) => {
            if (state.systemTheme) {
                dispatch({
                    type: 'TOGGLE_THEME_LIGHT_AND_DARK', payload: {
                        themeSchema: colorScheme as ThemeSchema
                    }
                });
            }
        })

        return () => {
            unSubscribe.remove()
        }
    }, [state.systemTheme])

    return (
        <ThemeContext.Provider value={{
            currentTheme: state.currentTheme,
            themeName: state.themeName,
            themeScheme: state.theme,
            systemTheme: state.systemTheme,
            navigationThemeValues: navigationThemeValues,
            toggleTheme,
            changeTheme,
            setInitialTheme,
            setSystemTheme,
            changeStatusBarColor,
            statusBarColor: state.statusBarColor,
        }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;