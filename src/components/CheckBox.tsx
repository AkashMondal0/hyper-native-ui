import React, { ReactNode, useMemo, useState } from "react";
import { Text, TextStyle, TouchableOpacity } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { themeColors, ThemeName } from "../constants/Colors";
import useTheme from "../hooks/useTheme";

interface CheckboxProps {
    label?: string;
    isSelected?: boolean;
    onToggle?: (isSelected: boolean) => void;
    size?: number;
    bounceIntensity?: number;
    themeScheme?: "light" | "dark";
    variant?: "default" | "secondary" | ThemeName;
    innerComponent?: ReactNode
    disabled?: boolean
    radius?: number
    labelTextStyle?: TextStyle
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    isSelected = false,
    onToggle,
    size = 24,
    variant = "default",
    bounceIntensity = 8,
    themeScheme,
    innerComponent,
    disabled,
    radius,
    labelTextStyle
}) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    // Shared values for animated styles
    const scale = useSharedValue(isSelected ? 1 : 0.9);
    const borderWidth = useSharedValue(isSelected ? 2 : 1.6);
    const [isChecked, setIsChecked] = useState(isSelected);

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

    // Animated styles for checkbox animation
    const animatedCheckboxStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            borderWidth: borderWidth.value,
            borderColor: colorStyle.backgroundColor,
        };
    });

    const handlePress = () => {
        if (disabled) return;

        const newSelection = !isChecked;

        // Apply the bouncy spring animation for scale and border width
        const springConfig = {
            damping: bounceIntensity,
            stiffness: 150,
            overshootClamping: true,
        };

        scale.value = withSpring(newSelection ? 1 : 0.9, springConfig);
        borderWidth.value = withSpring(newSelection ? 2 : 1.6, { ...springConfig, stiffness: 100 });

        setIsChecked(newSelection);
        onToggle?.(newSelection);
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress}
                activeOpacity={0.8}
                disabled={disabled}
                style={[{
                    width: label ? "auto" : size,
                    height: label ? "auto" : size,
                    borderRadius: radius ?? size / 4,
                    flexDirection: "row",
                    alignItems: "center",
                }]}>
                <Animated.View
                    style={[
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: colorStyle.borderColor,
                            backgroundColor: "transparent",
                        },
                        { width: size, height: size, borderRadius: radius ?? size / 4 },
                        animatedCheckboxStyle,
                    ]}
                >
                    {isChecked && (
                        <Animated.View
                            style={[
                                { backgroundColor: colorStyle.backgroundColor },
                                {
                                    width: size,
                                    height: size,
                                    borderRadius: radius ?? size / 4,
                                    backgroundColor: colorStyle.backgroundColor,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: disabled ? 0.5 : 1
                                },
                            ]}>
                            {innerComponent ? innerComponent : <Text style={{
                                fontWeight: "700",
                                fontSize: size ? size / 2 : 20,
                                color: colorStyle.color
                            }}>✓</Text>}
                        </Animated.View>
                    )}
                </Animated.View>
                {label ? <Text style={[{
                    marginLeft: 12,
                    fontSize: 16,
                    color: currentTheme.foreground,
                    opacity: disabled ? 0.5 : 1
                }, labelTextStyle]}>{label}</Text> : <></>}
            </TouchableOpacity>
        </>
    );
};

export default Checkbox;