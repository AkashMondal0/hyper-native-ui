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
    variant?: "default" | "secondary" | ThemeName;
    width?: ViewStyle["width"];
    height?: ViewStyle["height"];
    center?: boolean;
};

const View = memo(function View({
    style,
    themeScheme,
    width = "auto",
    height = "auto",
    center = false,
    variant = "default",
    ...otherProps }: Props) {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.border,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.foreground,
                color: currentTheme.background,
                borderColor: currentTheme.secondary,
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