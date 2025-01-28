import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableWithoutFeedback, TextStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";
import { themeColors, ThemeName } from "../constants/Colors";
import useTheme from "../hooks/useTheme";

// Type definitions for props
interface Option {
    label: string;
    value: string | number;
    disabled?: boolean | undefined
}

interface RadioButtonProps {
    options: Option[];
    selectedValue: string | number;
    onSelect: (value: string | number) => void;
    size?: number;
    themeScheme?: "light" | "dark";
    variant?: "default" | "secondary" | ThemeName;
    animationDuration?: number;
    radioOptionTextStyle?: TextStyle;
}

interface RadioOptionProps {
    label: string;
    value: string | number;
    disabled?: boolean
    isSelected: boolean;
    onPress: (value: string | number) => void;
    size: number;
    color: string;
    textColor: string;
    animationDuration: number;
    radioOptionTextStyle: RadioButtonProps["radioOptionTextStyle"]
}

const RadioButton: React.FC<RadioButtonProps> = ({
    options = [],
    selectedValue,
    onSelect,
    size = 24,
    variant = "default",
    animationDuration = 300,
    themeScheme,
    radioOptionTextStyle
}) => {
    const [currentValue, setCurrentValue] = useState<string | number>(selectedValue);
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.primary,
                color: currentTheme.foreground,
                borderColor: currentTheme.border,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.secondary,
                color: currentTheme.foreground,
                borderColor: currentTheme.secondary,
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.primary || currentTheme.primary,
            color: theme?.foreground || currentTheme.foreground,
            borderColor: theme?.border || currentTheme.border,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    const handlePress = (value: string | number) => {
        setCurrentValue(value);
        onSelect(value);
    };

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
        }}>
            {options.map((option) => (
                <RadioOption
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    isSelected={currentValue === option.value}
                    onPress={handlePress}
                    size={size}
                    disabled={option.disabled}
                    textColor={colorStyle.color}
                    radioOptionTextStyle={radioOptionTextStyle}
                    color={colorStyle.backgroundColor}
                    animationDuration={animationDuration}
                />
            ))}
        </View>
    );
};

const RadioOption: React.FC<RadioOptionProps> = ({
    label,
    value,
    isSelected,
    onPress,
    size,
    color,
    textColor,
    disabled,
    radioOptionTextStyle,
    // animationDuration,
}) => {
    const scale = useSharedValue(isSelected ? 1 : 0);
    const borderWidth = useSharedValue(isSelected ? 2 : 1);

    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const animatedOuterStyle = useAnimatedStyle(() => {
        const borderWidthInterpolate = interpolate(
            scale.value,
            [0, 1],
            [1, 2],
            Extrapolate.CLAMP
        );
        borderWidth.value = borderWidthInterpolate;
        return {
            borderColor: color,
            borderWidth: borderWidth.value,
        };
    });

    const handlePress = () => {
        if (disabled) return
        // Spring animation to animate the circle size
        scale.value = withSpring(1, {
            damping: 10, // Adjust this value to control the spring bounce
            stiffness: 100, // Adjust this value for the stiffness of the spring
        });
        onPress(value);
    };

    useEffect(() => {
        // Spring animation for the selected state transition
        scale.value = withSpring(isSelected ? 1 : 0, {
            damping: 10,
            stiffness: 100,
        });
    }, [isSelected]);

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 8,
            }}>
                <Animated.View
                    style={[
                        {
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: color,
                            opacity: disabled ? 0.5 : 1
                        },
                        { width: size, height: size, borderRadius: size / 2 },
                        animatedOuterStyle,
                    ]}
                >
                    <Animated.View
                        style={[
                            {
                                width: size / 2,
                                height: size / 2,
                                borderRadius: size / 4,
                                backgroundColor: color,
                            },
                            animatedCircleStyle,
                        ]}
                    />
                </Animated.View>
                <Text style={[{
                    marginLeft: 12,
                    fontSize: 16,
                    color: textColor,
                    opacity: disabled ? 0.5 : 1
                }, radioOptionTextStyle]}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RadioButton;