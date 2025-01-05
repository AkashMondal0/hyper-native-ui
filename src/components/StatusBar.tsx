import React from 'react';
import { StatusBar, View, type ViewProps, StatusBarProps } from 'react-native';
import { componentVariant, themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = StatusBarProps & {
    viewProps?: ViewProps
    safeAreaTopPadding?: number
    variant?: componentVariant;
    themeScheme?: "light" | "dark";
};

const Statusbar = ({
    viewProps,
    variant = "default",
    safeAreaTopPadding = 0,
    themeScheme,
    ...otherProps }: Props) => {
    const insets = useSafeAreaInsets();
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorVariant = () => {
        switch (variant) {
            case "secondary":
                return {
                    backgroundColor: currentTheme.background
                }
            case "default":
                return {
                    backgroundColor: currentTheme.background
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        backgroundColor: theme.primary
                    }
                }
                return {
                    backgroundColor: currentTheme.background
                }
        }
    };

    const colors = { ...colorVariant() };

    return (<>
        <View style={{ paddingTop: insets.top }} {...viewProps} />
        <StatusBar barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={colors.backgroundColor} {...otherProps} />
    </>)
}

export default Statusbar