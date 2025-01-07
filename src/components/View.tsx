import {
    View as RNview,
    ViewStyle,
    type ViewProps,
} from 'react-native';
import React, { memo, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { themeColors, ThemeName } from '../constants/Colors';

export type Props = ViewProps & {
    themeScheme?: "light" | "dark";
    variant?: "default" | "secondary" | "danger" | "warning" | "success" | "outline" | ThemeName;
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    center?: boolean;
};

const View = memo(function View({
    style,
    themeScheme,
    width = 0,
    height = 0,
    center = false,
    variant = "default",
    ...otherProps }: Props) {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.primary,
                color: currentTheme.primary_foreground,
                borderColor: currentTheme.border,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.secondary,
                color: currentTheme.secondary_foreground,
                borderColor: currentTheme.secondary,
            };
        }

        if (variant === 'danger') {
            return {
                backgroundColor: currentTheme.destructive,
                color: currentTheme.destructive_foreground,
                borderColor: currentTheme.destructive,
            };
        }

        if (variant === 'warning') {
            return {
                backgroundColor: "hsl(47.9 95.8% 53.1%)",
                color: "hsl(26 83.3% 14.1%)",
                borderColor: "hsl(47.9 95.8% 53.1%)",
            };
        }

        if (variant === 'success') {
            return {
                backgroundColor: "hsl(142.1 76.2% 36.3%)",
                color: "hsl(355.7 100% 97.3%)",
                borderColor: "hsl(142.1 76.2% 36.3%)",
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.primary || currentTheme.primary,
            color: theme?.primary_foreground || currentTheme.primary_foreground,
            borderColor: theme?.border || currentTheme.border,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    if (!currentTheme) return <></>

    return (
        <RNview
            style={[{
                width,
                height,
                marginHorizontal: center ? "auto" : 0,
            },
                style,
                colorStyle,
            ]}
            {...otherProps} />
    )
})

export default View;