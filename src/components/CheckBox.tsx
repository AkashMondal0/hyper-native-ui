import React from 'react'
import BouncyCheckbox, { BouncyCheckboxProps } from "react-native-bouncy-checkbox";
import { componentVariant, themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import { View } from 'react-native';


export type Props = BouncyCheckboxProps & {
    themeScheme?: "light" | "dark";
    variant?: componentVariant;
    size?: number
};

const CheckBox = ({ size = 25, variant = "default", themeScheme, ...props }: Props) => {
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
        <View style={{
            width: size,
            height: size,
        }}>
            <BouncyCheckbox
                {...props}
                size={size}
                style={{ opacity: props?.disabled ? 0.3 : 1 }}
                fillColor={colors.backgroundColor}
                iconStyle={{ borderColor: colors?.backgroundColor }}
                innerIconStyle={{ borderWidth: 2, borderColor: colors?.backgroundColor }}
                iconImageStyle={{
                    tintColor: colors?.color,
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