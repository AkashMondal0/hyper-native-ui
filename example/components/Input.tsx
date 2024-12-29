import React from 'react';
import { type TextInputProps, type ViewProps, TextInput, View } from 'react-native';
import { useTheme, themeColors } from 'hyper-native-ui';
import { ThemeName } from 'hyper-native-ui/lib/typescript/constants/Colors';

export type Props = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    disabled?: boolean;
    rightSideComponent?: React.ReactNode;
    leftSideComponent?: React.ReactNode;
    onFocus?: () => void;
    onBlur?: () => void;
    isErrorBorder?: boolean | unknown
    placeholder?: string
    containerStyle?: ViewProps["style"]
    variant?: "default" | "secondary" | ThemeName
};

const Input = ({ disabled,
    onBlur,
    onFocus,
    isErrorBorder,
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
                const theme = themeColors.find((theme) => theme.name === variant)!["dark"] // <--- CHANGE
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

    const inputStyle = {
        ...colorVariant(),
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