import {
    Text,
    TouchableOpacity,
    ActivityIndicator,
    type TextProps,
    type TouchableOpacityProps,
    type ActivityIndicatorProps,
    ViewStyle
} from 'react-native';
import React, { memo } from 'react';
import useTheme from '../hooks/useTheme';
import { componentVariant, themeColors, } from '../constants/Colors';

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
    variant?: componentVariant;
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

    const sizeVariant = () => {
        switch (size) {
            case "medium":
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 24,
                    borderRadius: 12
                }
            case "large":
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 42,
                    borderRadius: 14,
                }
            case "extraLarge":
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    borderRadius: 12,
                }
            default:
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 18,
                    borderRadius: 12,
                }
        }
    }

    const textStyleVariant = () => {
        switch (size) {
            case "medium":
                return {
                    fontSize: 14,
                }
            case "large":
                return {
                    fontSize: 16
                }
            case "extraLarge":
                return {
                    fontSize: 18
                }
            default:
                return {
                    fontSize: 14
                }
        }
    }

    const buttonStyle = {
        ...colorVariant(),
        ...sizeVariant(),
    };

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
            },
                style,
                buttonStyle,
            ]}
            {...otherProps}>
            <ButtonContent children={children}
                textStyle={[textStyle, textStyleVariant()]}
                icon={icon}
                textTextProps={textTextProps}
                loadingStyle={loadingStyle}
                loadingProps={loadingProps}
                loading={loading}
                buttonStyle={buttonStyle} />
        </TouchableOpacity>
    )
})

export default Button

const ButtonContent = ({
    children,
    textStyle,
    icon,
    loading,
    buttonStyle,
    loadingStyle,
    loadingProps,
    textTextProps
}: {
    children: string | React.ReactNode,
    icon: React.ReactNode,
    loading: boolean,
    textTextProps?: TextProps,
    textStyle: TextProps["style"],
    loadingProps?: ActivityIndicatorProps,
    loadingStyle: ActivityIndicatorProps["style"],
    buttonStyle: {
        backgroundColor: string,
        color: string,
        borderColor: string,
        paddingVertical: number,
        paddingHorizontal: number,
        borderRadius: number
    }
}) => {
    if (loading) return <ActivityIndicator color={buttonStyle.color} style={[loadingStyle]} {...loadingProps} />

    if (typeof children === "string") {
        return <>
            {icon ? icon : <></>}
            <Text
                {...textTextProps}
                numberOfLines={1}
                style={[{
                    color: buttonStyle.color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    fontWeight: "700",
                }, textStyle]}>
                {children}
            </Text>
        </>
    }

    else if (typeof children === "object") {
        //@ts-ignore
        return children.map((child, index) => {
            if (typeof child === "string") {
                return <Text key={index} style={[{
                    color: buttonStyle.color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    fontWeight: "700",
                }, textStyle]}>
                    {child}
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