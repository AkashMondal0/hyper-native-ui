import {
    View as RNview,
    ViewStyle,
    type ViewProps,
} from 'react-native';
import React, { memo } from 'react';
import useTheme from '../hooks/useTheme';
import { componentVariant, themeColors } from '../constants/Colors';

export type Props = ViewProps & {
    themeScheme?: "light" | "dark";
    variant?: componentVariant;
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

    const colorVariant = () => {
        switch (variant) {
            case "outline":
                return {
                    backgroundColor: currentTheme.secondary,
                    color: currentTheme.secondary_foreground,
                    borderColor: currentTheme.secondary_foreground
                }
            case "secondary":
                return {
                    backgroundColor: currentTheme.secondary,
                    color: currentTheme.secondary_foreground,
                    borderColor: currentTheme.secondary
                }
            case "danger":
                return {
                    backgroundColor: currentTheme.destructive,
                    color: currentTheme.destructive_foreground,
                    borderColor: currentTheme.destructive
                }
            case "warning":
                return {
                    backgroundColor: "hsl(47.9 95.8% 53.1%)",
                    color: "hsl(26 83.3% 14.1%)",
                    borderColor: "hsl(47.9 95.8% 53.1%)"
                }
            case "success":
                return {
                    backgroundColor: "hsl(142.1 76.2% 36.3%)",
                    color: "hsl(355.7 100% 97.3%)",
                    borderColor: "hsl(142.1 76.2% 36.3%)"
                }
            case "default":
                return {
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        backgroundColor: theme.primary,
                        color: theme.primary_foreground,
                        borderColor: theme.border,
                    }
                }
                return {
                    backgroundColor: currentTheme.primary,
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                }

        }
    }

    if (!currentTheme) return <></>

    return (
        <RNview
            style={[{
                width,
                height,
                marginHorizontal: center ? "auto" : 0,
            },
                style,
            colorVariant(),
            ]}
            {...otherProps} />
    )
})

export default View;