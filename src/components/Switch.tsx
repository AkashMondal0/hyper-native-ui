import React, { useMemo } from 'react';
import { View, Switch as RNSwitch, SwitchProps, ViewStyle } from 'react-native';
import useTheme from '../hooks/useTheme';
import { themeColors, ThemeName } from '../constants/Colors';

export type Props = SwitchProps & {
    themeScheme?: "light" | "dark";
    variant?: "default" | ThemeName;
    size?: "small" | "medium" | "large";

    isChecked: boolean;
    onValueChange: (value: boolean) => void

    viewStyle?: ViewStyle;
    switchStyle?: {
        isChecked: string,
        unChecked: string,
        thumbColor: string,
        borderColor: string
    } | undefined
};

const Switch = ({ isChecked,
    variant = 'default',
    viewStyle,
    size = "medium",
    switchStyle,
    onValueChange, themeScheme, style, ...props }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme()

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                isChecked: currentTheme.primary,
                unChecked: currentTheme.muted,
                thumbColor: currentTheme.background,
                borderColor: currentTheme.border
            };
        }
        if (switchStyle) return switchStyle;

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            isChecked: theme?.primary ?? currentTheme.primary,
            unChecked: theme?.muted ?? currentTheme.muted,
            thumbColor: theme?.background ?? currentTheme.background,
            borderColor: theme?.border ?? currentTheme.border
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);


    const sizeVariant = useMemo(() => {
        if (size === "large") {
            return {
                width: 50,
                height: 30,
                bw: 0.6
            };
        };
        if (size === "small") {
            return {
                width: 50,
                height: 30,
                bw: 0.6
            };
        };
        return {
            width: 50,
            height: 30,
            bw: 0.6
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);


    return (
        <View
            style={[{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                backgroundColor: isChecked ? colorStyle.isChecked : colorStyle.unChecked,
                borderWidth: 0.6,
                borderColor: colorStyle?.borderColor,
                opacity: props.disabled ? 0.5 : 1,
                width: sizeVariant.width,
                height: sizeVariant.height
            }, viewStyle]}>
            <RNSwitch
                value={isChecked}
                onValueChange={onValueChange}
                ios_backgroundColor={isChecked ? colorStyle.isChecked : colorStyle.unChecked}
                thumbColor={colorStyle.thumbColor}
                trackColor={{ false: "transparent", true: "transparent" }}
                style={[{
                    transform: [{ scaleX: 1 }, { scaleY: 1 }],
                    elevation: 5,
                    opacity: props.disabled ? 0.5 : 1,
                }, style]}  {...props} />
        </View>
    )
}
export default Switch