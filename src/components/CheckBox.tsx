import React from 'react'
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import { componentVariant, themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';


export type Props = BouncyCheckboxProps & {
    themeScheme?: "light" | "dark";
    variant?: componentVariant;
};

const CheckBox = ({ variant = "default", themeScheme, ...props }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorVariant = () => {
        switch (variant) {
            case "secondary":
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }
            case "default":
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        color: theme.primary_foreground,
                        borderColor: theme.border,
                        backgroundColor: theme.primary
                    }
                }
                return {
                    color: currentTheme.primary_foreground,
                    borderColor: currentTheme.border,
                    backgroundColor: currentTheme.primary
                }

        }
    };

    const colors = { ...colorVariant() };

    return (
        <BouncyCheckbox
            {...props}
            size={25}
            style={{ opacity: props?.disabled ? 0.3 : 1 }}
            fillColor={colors.backgroundColor}
            iconStyle={{ borderColor: colors?.backgroundColor }}
            innerIconStyle={{ borderWidth: 2, borderColor: colors?.backgroundColor }}
            iconImageStyle={{ tintColor: colors?.color }}
        // textStyle={{ fontFamily: "JosefinSans-Regular" }}
        // onPress={(isChecked: boolean) => { console.log(isChecked) }}
        />
    )
};
export default CheckBox