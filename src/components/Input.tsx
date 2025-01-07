import React, { useMemo } from 'react';
import { type TextInputProps, type ViewProps, TextInput, View } from 'react-native';
import { themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';
export type ThemeName = "Zinc" | "State" | "Stone" | "Grey" | "Neutral" | "Red" | "Rose" | "Orange" | "Yellow" | "Green";
export type Props = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    disabled?: boolean;
    themeScheme?: "light" | "dark";
    rightSideComponent?: React.ReactNode;
    leftSideComponent?: React.ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
    isErrorBorder?: boolean | unknown
    placeholder?: string
    containerStyle?: ViewProps["style"]
    variant?: "default" | "secondary" | ThemeName
    size?: "small" | "medium" | "large" | "extraLarge";
};

const Input = ({ disabled,
    onBlur,
    onFocus,
    isErrorBorder,
    themeScheme,
    size = "medium",
    placeholder = 'Enter text here',
    style,
    variant = "default",
    containerStyle,
    ...props }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    const [isFocused, setIsFocused] = React.useState(false)

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.input,
                color: currentTheme.foreground,
                borderColor: currentTheme.border,
                isFocused: currentTheme.primary
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.background,
                color: currentTheme.foreground,
                borderColor: currentTheme.border,
                isFocused: currentTheme.primary
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.input ?? currentTheme.input,
            color: theme?.foreground ?? currentTheme.foreground,
            borderColor: theme?.border ?? currentTheme.border,
            isFocused: theme?.primary ?? currentTheme.primary
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    const sizeVariant = useMemo(() => {
        switch (size) {
            case "small":
                return {
                    fontSize: 12,
                }
            case "large":
                return {
                    fontSize: 22
                }
            case "extraLarge":
                return {
                    fontSize: 28
                }
            default:
                return {
                    fontSize: 16
                }
        }
    }, [size])

    if (!currentTheme) return <></>

    return (
        <View
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 14,
                borderWidth: 1,
                padding: 4,
                opacity: disabled ? 0.5 : 1,
                borderColor: isErrorBorder ? currentTheme?.destructive : disabled || !isFocused ? colorStyle?.borderColor : colorStyle?.isFocused,
                backgroundColor: colorStyle.backgroundColor,
            }, containerStyle]}>
            {props.leftSideComponent}
            <TextInput
                style={[{
                    color: colorStyle.color,
                    height: "auto",
                    width: '100%',
                    padding: 6,
                    fontSize: sizeVariant.fontSize
                }, style]}
                selectionHandleColor={currentTheme?.primary}
                placeholderTextColor={currentTheme?.muted_foreground}
                onFocus={() => {
                    onFocus && onFocus()
                    setIsFocused(true)
                }}
                onBlur={() => {
                    onBlur && onBlur()
                    setIsFocused(false)
                }}
                placeholder={placeholder}
                editable={!disabled}
                {...props} />
            {props.rightSideComponent}
        </View>
    )
}

export default Input