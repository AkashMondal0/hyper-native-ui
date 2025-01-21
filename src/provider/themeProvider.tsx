import { Appearance } from "react-native";
import React, { ReactNode, useCallback, useEffect, useReducer } from "react";
import StatusBar from "../components/StatusBar";
import { ThemeName, ThemeSchema, themeColors, StatusBarVariant } from "../constants/Colors";
import ThemeContext, { ThemeReducer } from "../context/themeContext";

const themeReducer: ThemeReducer = (state, action) => {
    if (action.type === 'TOGGLE_THEME_LIGHT_AND_DARK') {
        if (!action?.payload?.colorScheme) {
            const themeSchema = state.colorScheme === "dark" ? "light" : "dark";
            return {
                ...state,
                colorScheme: themeSchema,
                currentColorScheme: action?.payload?.currentColorScheme ?? state.currentColorScheme,
                currentTheme: themeColors.find(theme => theme.name === state.themeName)![themeSchema],
            }
        };
        const themeSchema = action?.payload?.colorScheme;
        return {
            ...state,
            colorScheme: themeSchema,
            currentColorScheme: action?.payload?.currentColorScheme ?? state.currentColorScheme,
            currentTheme: themeColors.find(theme => theme.name === state.themeName)![themeSchema],
        }
    }
    if (action.type === 'CHANGE_THEME') {
        if (!action?.payload || !action.payload?.themeName) return state;
        return {
            ...state,
            themeName: action.payload?.themeName ?? state.themeName,
            currentTheme: themeColors.find(theme => theme.name === action.payload?.themeName)![state.colorScheme],
        }
    }
    if (action.type === 'CHANGE_STATUSBAR_COLOR') {
        if (!action?.payload?.statusBarColor) return state;
        return {
            ...state,
            statusBarColor: action?.payload?.statusBarColor,
        }
    }
    return state;
}

const ThemeProvider: React.FC<{
    children: ReactNode,
    initialScheme?: ThemeSchema,
    themeName?: ThemeName,
    enableThemedStatusBar?: boolean
}> = ({
    children,
    initialScheme = "system",
    themeName = "Grey",
    enableThemedStatusBar = false
}) => {
        const appliedSchema = initialScheme === "system" ? Appearance.getColorScheme() as "dark" | "light" : initialScheme;
        const [state, dispatch] = useReducer<ThemeReducer>(themeReducer, {
            colorScheme: appliedSchema,
            themeName: themeName,
            statusBarColor: 'default',
            currentColorScheme: initialScheme,
            currentTheme: themeColors[0][appliedSchema]
        });

        const toggleTheme = useCallback((_themeSchema?: "dark" | "light") => {
            dispatch({ type: 'TOGGLE_THEME_LIGHT_AND_DARK', payload: { colorScheme: _themeSchema } });
        }, []);

        const changeTheme = useCallback((_themeName: ThemeName) => {
            dispatch({ type: 'CHANGE_THEME', payload: { themeName: _themeName } });
        }, []);

        const changeStatusBarColor = useCallback((themeName: StatusBarVariant) => {
            dispatch({ type: "CHANGE_STATUSBAR_COLOR", payload: { statusBarColor: themeName } });
        }, []);

        useEffect(() => {
            const unSubscribe = Appearance.addChangeListener(({ colorScheme: cs }) => {
                // console.log("colorScheme", cs)
                if (state.currentColorScheme === "system") {
                    dispatch({
                        type: 'TOGGLE_THEME_LIGHT_AND_DARK', payload: {
                            colorScheme: cs as any,
                            currentColorScheme: 'system'
                        }
                    });
                };
            });

            return () => {
                unSubscribe.remove();
            };
        }, [state.currentColorScheme]);

        return (
            <ThemeContext.Provider value={{
                currentTheme: state.currentTheme,
                themeName: state.themeName,
                themeScheme: state.colorScheme,
                currentColorScheme: state.currentColorScheme,
                toggleTheme,
                changeTheme,
                changeStatusBarColor,
                statusBarColor: state.statusBarColor,
            }}>
                {enableThemedStatusBar ? <StatusBar /> : <></>}
                {children}
            </ThemeContext.Provider>
        )
    };

export default ThemeProvider;