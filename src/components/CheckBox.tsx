import React, { ReactNode, useMemo } from "react";
import { View, Text, TouchableWithoutFeedback, TextStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { themeColors, ThemeName } from "../constants/Colors";
import useTheme from "../hooks/useTheme";

interface CheckboxProps {
    label?: string;
    isSelected: boolean;
    onToggle: (isSelected: boolean) => void;
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
    isSelected,
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
        // Toggle selection and animate checkbox with bouncy effect
        const newSelection = !isSelected;

        // Apply the bouncy spring animation for scale
        scale.value = withSpring(newSelection ? 1 : 0.9, {
            damping: bounceIntensity, // Control bounce intensity
            stiffness: 150, // Stiffness for bounce
            overshootClamping: true, // Prevent overshoot after bounce
        });

        // Apply spring animation for border width for smooth transition
        borderWidth.value = withSpring(newSelection ? 2 : 1.6, {
            damping: bounceIntensity, // Control bounce intensity
            stiffness: 100, // Adjust stiffness of the border width animation
            overshootClamping: true, // Prevent overshoot of border width
        });

        // Pass the new selection back to the parent
        onToggle(newSelection);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress} disabled={disabled}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 8,
                opacity: disabled ? 0.5 : 1
            }}>
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
                    {isSelected && (
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
                <Text style={[{
                    marginLeft: 12,
                    fontSize: 16,
                    color: currentTheme.foreground,
                    opacity: disabled ? 0.5 : 1
                }, labelTextStyle]}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Checkbox;