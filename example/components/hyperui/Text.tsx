import React from "react"
import { Text, type TextProps } from 'react-native';
import useTheme from '../hooks/useTheme';
import { componentVariant, themeColors, } from '../constants/Colors';


export type Props = TextProps & {
    variant?: "heading1" | "heading2" | "heading3" | "heading4";
    lightColor?: string;
    darkColor?: string;
    colorVariant?: "default" | "danger" | "success" | "warning" | "info" | "primary" | "secondary";
    fontFamily?: "Satisfy" | "Lato" | "Montserrat" | "Nunito" | "Open Sans" | "Playpen Sans" | "Poppins" | "Roboto";
};


const SkysoloText = ({ style, variant,
    colorVariant = "default",
    fontFamily = "Roboto", ...otherProps }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();


    const color = () => {
        if (colorVariant === "default") {
            return currentTheme?.foreground
        } else if (colorVariant === "danger") {
            return currentTheme?.destructive
        } else if (colorVariant === "success") {
            return themeColors?.find((color) => color.name === "Green")?.light.primary
        } else if (colorVariant === "warning") {
            return themeColors?.find((color) => color.name === "Yellow")?.light.primary
        } else if (colorVariant === "secondary") {
            return currentTheme?.muted_foreground
        }
    }

    const fontSize = () => {
        if (variant === "heading1") {
            return 32
        } else if (variant === "heading2") {
            return 24
        } else if (variant === "heading3") {
            return 18
        } else if (variant === "heading4") {
            return 16
        } else {
            return 14
        }
    }

    const fontWeight = () => {
        if (variant === "heading1") {
            return "700"
        } else if (variant === "heading2") {
            return "600"
        } else if (variant === "heading3") {
            return "500"
        } else if (variant === "heading4") {
            return "400"
        } else {
            return "400"
        }
    }

    if (!currentTheme) {
        return <></>
    }

    return (
        <Text
            style={[{
                color: color(),
                fontSize: fontSize(),
                fontWeight: fontWeight(),
            }, style]}
            {...otherProps} />
    )
}

export default SkysoloText