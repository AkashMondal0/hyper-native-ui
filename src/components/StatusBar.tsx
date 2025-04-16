import React, { useMemo } from 'react';
import { StatusBar, View, type ViewProps, StatusBarProps, Appearance } from 'react-native';
import { themeColors } from '../constants/Colors';
import useTheme from '../hooks/useTheme';

type Props = StatusBarProps & {
    viewProps?: ViewProps
    topPadding?: number
    themeScheme?: "light" | "dark";
    translucent?: boolean
};

const Statusbar = ({
    viewProps,
    topPadding = 0,
    themeScheme,
    translucent = true,
    ...otherProps }: Props) => {
    const systemTheme = Appearance.getColorScheme() === "dark";
    const {
        currentTheme,
        themeScheme: defaultThemeScheme,
        statusBarColor: variant
    } = useTheme();

    const barStyle = useMemo(() => {
        if (themeScheme) {
            return themeScheme === "dark" ? "light-content" : "dark-content";
        }
        return defaultThemeScheme === "dark" ? "light-content" : "dark-content";
    }, [themeScheme, defaultThemeScheme]);

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.background,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.secondary,
            };
        }

        if (variant === 'danger') {
            return {
                backgroundColor: currentTheme.destructive,
            };
        }

        if (variant === 'warning') {
            return {
                backgroundColor: "hsl(47.9 95.8% 53.1%)",
            };
        }

        if (variant === 'success') {
            return {
                backgroundColor: "hsl(142.1 76.2% 36.3%)",
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.primary || currentTheme.primary,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);


    if (translucent) {
        return (<StatusBar translucent barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={"transparent"} />)
    };


    if (currentTheme?.background) {
        return (<>
            <View style={{ paddingTop: topPadding }} {...viewProps} />
            <StatusBar
                {...otherProps}
                barStyle={barStyle}
                backgroundColor={colorStyle.backgroundColor}
            />
        </>)
    }

    return (<>
        <View style={{ paddingTop: topPadding }} {...viewProps} />
        <StatusBar
            {...otherProps}
            barStyle={systemTheme ? "light-content" : "dark-content"}
            backgroundColor={systemTheme ? "#000" : "#fff"}
        />
    </>)
}

export default Statusbar;

export const StatusBarHeight = () => {
    const { currentTheme } = useTheme();

    return <View style={{
        height: StatusBar.currentHeight,
        backgroundColor: currentTheme.background,
    }} />;
};