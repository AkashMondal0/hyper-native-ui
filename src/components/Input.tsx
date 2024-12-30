import React from 'react';
import { type TextInputProps, type ViewProps, TextInput, View } from 'react-native';
import { ThemeName, themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';

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

    const colorVariant = () => {
        switch (variant) {
            case "secondary":
                return {
                    backgroundColor: currentTheme.background,
                    color: currentTheme.foreground,
                    borderColor: currentTheme.border,
                    isFocused: currentTheme.primary
                }
            case "default":
                return {
                    backgroundColor: currentTheme.input,
                    color: currentTheme.foreground,
                    borderColor: currentTheme.border,
                    isFocused: currentTheme.primary
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        backgroundColor: theme.input,
                        color: theme.foreground,
                        borderColor: theme.border,
                        isFocused: theme.primary
                    }
                }
                return {
                    backgroundColor: currentTheme.input,
                    color: currentTheme.foreground,
                    borderColor: currentTheme.border,
                    isFocused: currentTheme.primary
                }

        }
    }

    const sizeVariant = () => {
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
    }
    const inputStyle = {
        ...colorVariant(),
        ...sizeVariant()
    };

    if (!currentTheme) return <></>

    return (
        <View
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 14,
                borderWidth: 1,
                paddingHorizontal: 4,
                opacity: disabled ? 0.5 : 1,
                borderColor: isErrorBorder ? currentTheme?.destructive : disabled || !isFocused ? inputStyle?.borderColor : inputStyle?.isFocused,
                backgroundColor: inputStyle.backgroundColor,
            }, containerStyle]}>
            {props.leftSideComponent}
            <TextInput
                style={[{
                    color: inputStyle.color,
                    height: "auto",
                    width: '100%',
                    fontSize: inputStyle.fontSize
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