import React, { useMemo } from 'react';
import { StatusBar, View, type ViewProps, StatusBarProps } from 'react-native';
import { themeColors, ThemeName } from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StatusBarProps & {
    viewProps?: ViewProps
    safeAreaTopPadding?: number
    variant?: "default" | "secondary" | "danger" | "warning" | "success" | "outline" | ThemeName;
    themeScheme?: "light" | "dark";
};

const Statusbar = ({
    viewProps,
    variant = "default",
    safeAreaTopPadding = 0,
    themeScheme,
    ...otherProps }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    const insets = useSafeAreaInsets();

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.background,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.secondary,
            };
        }

        if (variant === 'danger') {
            return {
                backgroundColor: currentTheme.destructive,
            };
        }

        if (variant === 'warning') {
            return {
                backgroundColor: "hsl(47.9 95.8% 53.1%)",
            };
        }

        if (variant === 'success') {
            return {
                backgroundColor: "hsl(142.1 76.2% 36.3%)",
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.primary || currentTheme.primary,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    return (<>
        <View style={{ paddingTop: insets.top }} {...viewProps} />
        <StatusBar barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={colorStyle.backgroundColor} {...otherProps} />
    </>)
}

export default Statusbar