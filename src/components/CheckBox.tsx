import React, { useMemo } from 'react'
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import { themeColors, ThemeName } from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import { View } from 'react-native';


export type Props = BouncyCheckboxProps & {
    themeScheme?: "light" | "dark";
    variant?: "default" | "secondary" | "danger" | "warning" | "success" | "outline" | ThemeName;
    size?: number
};

const CheckBox = ({ size = 25, variant = "default", themeScheme, ...props }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

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

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.primary || currentTheme.primary,
            color: theme?.primary_foreground || currentTheme.primary_foreground,
            borderColor: theme?.border || currentTheme.border,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    return (
        <View style={{
            width: size,
            height: size,
        }}>
            <BouncyCheckbox
                {...props}
                size={size}
                style={{ opacity: props?.disabled ? 0.3 : 1 }}
                fillColor={colorStyle.backgroundColor}
                iconStyle={{ borderColor: colorStyle?.backgroundColor }}
                innerIconStyle={{ borderWidth: 2, borderColor: colorStyle?.backgroundColor }}
                iconImageStyle={{
                    tintColor: colorStyle?.color,
                    width: size - size / 2,
                    height: size - size / 2,
                }}
            // textStyle={{ fontFamily: "JosefinSans-Regular" }}
            // onPress={(isChecked: boolean) => { console.log(isChecked) }}
            />
        </View>
    )
};
export default CheckBox