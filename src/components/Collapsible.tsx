import React, { useState, useCallback, ReactNode, useMemo } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { themeColors, ThemeName } from "../constants/Colors";
import useTheme from "../hooks/useTheme";

const Collapsible = ({
    title,
    titleStyle,
    triggerComponent,
    children,
    containerStyle,
    animationType = "spring",
    variant = "default",
    themeScheme,
    touchableOpacityStyle,
    style,
    defaultValue = false,
    width
}: {
    title?: string;
    titleStyle?: TextStyle;
    defaultValue?: boolean
    triggerComponent?: ReactNode;
    children: ReactNode;
    containerStyle?: ViewStyle;
    touchableOpacityStyle?: TouchableOpacityProps["style"]
    backgroundColor?: string;
    animationType?: "spring" | "normal";
    themeScheme?: "light" | "dark";
    variant?: "default" | "secondary" | ThemeName;
    width?: ViewStyle["width"]
    style?: {
        backgroundColor?: string,
        color?: string,
        borderColor?: string,
        isFocused?: string,
    }
}) => {
    const [open, setOpen] = useState(defaultValue);
    const height = useSharedValue(0);
    const measuredHeight = useSharedValue(0);
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorStyle = useMemo(() => {
        if (style) {
            return {
                backgroundColor: style.backgroundColor ?? currentTheme.muted,
                color: style.backgroundColor ?? currentTheme.foreground,
                borderColor: style.backgroundColor ?? currentTheme.border,
                isFocused: style.backgroundColor ?? currentTheme.primary,
            }
        }
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.card,
                color: currentTheme.foreground,
                borderColor: currentTheme.input,
                isFocused: currentTheme.primary,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.secondary,
                color: currentTheme.secondary_foreground,
                borderColor: currentTheme.foreground,
                isFocused: currentTheme.primary,
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.card ?? currentTheme.input,
            color: theme?.foreground ?? currentTheme.foreground,
            borderColor: theme?.primary ?? currentTheme.border,
            isFocused: theme?.primary ?? currentTheme.primary,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);


    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
        if (animationType === "spring") {
            height.value = open ? withTiming(0) : withSpring(measuredHeight.value);
        } else {
            height.value = open ? withTiming(0) : withTiming(measuredHeight.value);
        }
    }, [open]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: measuredHeight.value === 0 ? undefined : height.value,
        overflow: "hidden",
    }));

    return (
        <View style={[{
            borderWidth: 1,
            borderColor: colorStyle.borderColor,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: colorStyle.backgroundColor,
        }, {
            width: width ?? containerStyle?.width
        }]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={toggle} style={[{
                    justifyContent: "center",
                    alignItems: "center",
                }, touchableOpacityStyle]}>
                {triggerComponent ? triggerComponent : <Text style={[{
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: 10,
                    color: colorStyle.color
                }, titleStyle]}>
                    {title}
                </Text>}
            </TouchableOpacity>
            <View style={{
                backgroundColor: colorStyle.borderColor,
                height: open ? 1 : 0,
                marginHorizontal: "10%"
            }} />
            <Animated.View
                onLayout={useCallback((e: any) => {
                    if (measuredHeight.value === 0) {
                        const layoutHeight = e.nativeEvent.layout.height;
                        measuredHeight.value = layoutHeight;
                    }
                }, [])}
                style={[
                    {
                        backgroundColor: colorStyle.backgroundColor,
                        width
                    },
                    containerStyle,
                    animatedStyle]}>
                <Component color={colorStyle.color}>
                    {children}
                </Component>
            </Animated.View>
        </View>
    );
};

export default Collapsible;

const Component = ({
    children,
    color
}: {
    children: string | React.ReactNode,
    color: string,
}) => {

    const renderText = (text: string, key?: number) => (
        <Text
            key={key}
            style={[{
                color: color,
                padding: 16,
                fontSize: 16,
            }]}>
            {text}
        </Text>
    );

    if (typeof children === "string") {
        return (
            <>
                {renderText(children as string)}
            </>
        );
    }

    if (Array.isArray(children)) {
        return (
            <>
                {children.map((child, index) => (
                    typeof child === "string" ? renderText(child, index) : child
                ))}
            </>
        );
    }

    return <>{children}</>;
};