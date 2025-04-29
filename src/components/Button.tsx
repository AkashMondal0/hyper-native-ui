import {
    Text,
    TouchableOpacity,
    ActivityIndicator,
    type TextProps,
    type TouchableOpacityProps,
    type ActivityIndicatorProps,
    ViewStyle,
    View,
} from 'react-native';
import React, { memo, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { themeColors, ThemeName } from '../constants/Colors';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

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
    disableMemo = false,
    ...otherProps
}: Props) {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 120 }) }],
    }));

    const computedWidth =
        typeof width === "number" || /^[0-9]+$/.test(width as string)
            ? Number(width)
            : width;

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
        if (variant === 'outline') {
            return {
                backgroundColor: currentTheme.card,
                color: currentTheme.foreground,
                borderColor: currentTheme.border,
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
                };
            case "large":
                return {
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    borderRadius: 15,
                    fontSize: 16,
                };
            case "extraLarge":
                return {
                    paddingVertical: 20,
                    paddingHorizontal: 25,
                    borderRadius: 20,
                    fontSize: 18,
                };
            default:
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    fontSize: 14,
                };
        }
    }, [size]);

    if (!currentTheme) return <></>;

    return (
        <Animated.View style={[animatedStyle, style]}>
            <TouchableOpacity
                activeOpacity={0.9}
                disabled={disabled}
                onPressIn={() => { if (!disabled) scale.value = 0.96; }}
                onPressOut={() => { if (!disabled) scale.value = 1; }}
                style={[
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 0,
                        flexDirection: 'row',
                        gap: 5,
                        opacity: disabled ? 0.6 : 1,
                        borderWidth: variant === 'outline' ? 0.8 : 0.6,
                        borderColor: colorStyle.borderColor,
                        flexWrap: 'wrap',
                        width: computedWidth ?? "auto",
                        marginHorizontal: center ? "auto" : 0,
                        borderRadius: sizeVariant.borderRadius,
                        backgroundColor: colorStyle.backgroundColor,
                    },
                    style,
                ]}
                {...otherProps}
            >
                <ButtonContent
                    children={children}
                    textStyle={[textStyle, sizeVariant]}
                    icon={icon}
                    textProps={textTextProps}
                    loadingStyle={loadingStyle}
                    loadingProps={loadingProps}
                    loading={loading}
                    color={colorStyle.color}
                />
            </TouchableOpacity>
        </Animated.View>
    );
});

export default Button

const ButtonContent = ({
    children,
    textStyle,
    icon,
    loading,
    loadingStyle,
    loadingProps,
    textProps,
    color
}: {
    children: string | React.ReactNode,
    icon: React.ReactNode,
    loading: boolean,
    textProps?: TextProps,
    textStyle: TextProps["style"],
    loadingProps?: ActivityIndicatorProps,
    loadingStyle: ActivityIndicatorProps["style"],
    color: string,
}) => {

    if (typeof children === "string") {
        return <>
            {icon ? icon : <></>}
            <Text
                {...textProps}
                numberOfLines={1}
                style={[{
                    color: color,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    marginHorizontal: "auto",
                    fontSize: 16,
                    fontWeight: "700",
                    opacity: loading ? 0 : 1,
                }, textStyle]}>
                {children}
            </Text>
            <ActivityIndicator color={color}
                // size={20}
                style={[loadingStyle,
                    {
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        opacity: loading ? 1 : 0,
                        transform: [
                            { translateX: -10 },
                            { translateY: -10 }
                        ]
                    }
                ]} {...loadingProps} />
        </>
    }

    else if (typeof children === "object") {
        //@ts-ignore
        return children.map((child, index) => {
            if (typeof child === "string") {
                return <>
                    <Text key={index} style={[{
                        color: color,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        marginHorizontal: "auto",
                        fontSize: 16,
                        fontWeight: "700",
                        opacity: loading ? 0 : 1,
                    }, textStyle]}>
                        {child}
                    </Text>
                    <ActivityIndicator color={color}
                        // size={20}
                        style={[loadingStyle, {
                            position: 'absolute',
                            top: "50%",
                            left: "50%",
                            opacity: loading ? 1 : 0,
                            transform: [
                                { translateX: -10 },
                                { translateY: -10 }
                            ]
                        }]} {...loadingProps} />
                </>
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