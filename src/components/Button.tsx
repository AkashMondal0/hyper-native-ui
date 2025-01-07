import {
    Text,
    TouchableOpacity,
    ActivityIndicator,
    type TextProps,
    type TouchableOpacityProps,
    type ActivityIndicatorProps,
    ViewStyle
} from 'react-native';
import React, { memo, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { themeColors, ThemeName } from '../constants/Colors';

export type Props = TouchableOpacityProps & {
    themeScheme?: "light" | "dark";
    children?: string | React.ReactNode;
    textStyle?: TextProps["style"];
    textTextProps?: TextProps;
    loadingStyle?: ActivityIndicatorProps["style"];
    loadingProps?: ActivityIndicatorProps;
    size?: "small" | "medium" | "large" | "extraLarge";
    icon?: React.ReactNode;
    loading?: boolean;
    disableMemo?: boolean;
    variant?: "default" | "secondary" | "danger" | "warning" | "success" | "outline" | ThemeName;
    width?: ViewStyle["width"];
    center?: boolean;
};

const Button = memo(function Button({
    children = "Button",
    style,
    themeScheme,
    textStyle,
    loadingStyle,
    loadingProps,
    textTextProps,
    width,
    center = false,
    variant = "default",
    size = "medium",
    icon = undefined,
    loading = false,
    disabled = false,
    // disableMemo is used to disable memoization of the component
    disableMemo = false,
    ...otherProps }: Props) {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    // Determine the computed width
    const computedWidth =
        typeof width === 'number' || /^[0-9]+$/.test(width as string)
            ? Number(width) // Convert numeric strings to numbers
            : width; // Use string as-is for percentages

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

    const sizeVariant = useMemo(() => {
        switch (size) {
            case "small":
                return {
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    fontSize: 12,
                }
            case "large":
                return {
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: 15,
                    fontSize: 16
                }
            case "extraLarge":
                return {
                    paddingVertical: 20,
                    paddingHorizontal: 25,
                    borderRadius: 20,
                    fontSize: 18
                }
            default:
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    fontSize: 14,
                }
        }
    }, [size]);

    if (!currentTheme) return <></>

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            disabled={disabled}
            style={[{
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 0.4,
                flexDirection: 'row',
                gap: 5,
                opacity: disabled ? 0.6 : 1,
                borderWidth: 0.6,
                flexWrap: 'wrap',
                width: computedWidth ?? "auto",
                marginHorizontal: center ? "auto" : 0,
                borderRadius: sizeVariant.borderRadius,
            },
                style,
                colorStyle,
            ]}
            {...otherProps}>
            <ButtonContent children={children}
                textStyle={[textStyle, sizeVariant]}
                icon={icon}
                textTextProps={textTextProps}
                loadingStyle={loadingStyle}
                loadingProps={loadingProps}
                loading={loading}
                color={colorStyle.color} />
        </TouchableOpacity>
    )
})

export default Button

const ButtonContent = ({
    children,
    textStyle,
    icon,
    loading,
    loadingStyle,
    loadingProps,
    textTextProps,
    color
}: {
    children: string | React.ReactNode,
    icon: React.ReactNode,
    loading: boolean,
    textTextProps?: TextProps,
    textStyle: TextProps["style"],
    loadingProps?: ActivityIndicatorProps,
    loadingStyle: ActivityIndicatorProps["style"],
    color: string,
}) => {

    if (typeof children === "string") {
        return <>
            {icon ? icon : <></>}
            <Text
                {...textTextProps}
                numberOfLines={1}
                style={[{
                    color: color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    fontWeight: "700",
                }, textStyle]}>
                {loading ? <ActivityIndicator color={color}
                    size={20}
                    style={[loadingStyle]} {...loadingProps} /> : children}
            </Text>
        </>
    }

    else if (typeof children === "object") {
        //@ts-ignore
        return children.map((child, index) => {
            if (typeof child === "string") {
                return <Text key={index} style={[{
                    color: color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    fontWeight: "700",
                }, textStyle]}>
                    {loading ? <ActivityIndicator color={color}
                        size={20}
                        style={[loadingStyle]} {...loadingProps} /> : child}
                </Text>
            }
            else {
                return child
            }
        })
    }
    return (
        <>
            {children}
        </>
    )
}