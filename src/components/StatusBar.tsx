import React from 'react';
import { StatusBar, View, type ViewProps, StatusBarProps } from 'react-native';
import { componentVariant, themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';

export type Props = StatusBarProps & {
    viewProps: ViewProps
    safeAreaTopPadding: number
    variant?: componentVariant;
    themeScheme?: "light" | "dark";
};

const Statusbar = ({ viewProps,
    variant = "default",
    safeAreaTopPadding = 20,
    themeScheme,
    ...otherProps }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorVariant = () => {
        switch (variant) {
            case "secondary":
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }
            case "default":
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        color: theme.primary_foreground,
                        borderColor: theme.border,
                        backgroundColor: theme.primary
                    }
                }
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }

        }
    };

    const colors = { ...colorVariant() };

    return (<>
        <View style={{ paddingTop: safeAreaTopPadding }} {...viewProps} />
        <StatusBar barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={colors.backgroundColor} {...otherProps} />
    </>)
}

export default Statusbar