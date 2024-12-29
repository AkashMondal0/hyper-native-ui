import React from 'react';
import { StatusBar, View, type ViewProps, StatusBarProps } from 'react-native';
import useTheme from '../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type Props = StatusBarProps & {
    view: ViewProps
};


const SkysoloStatusbar = ({ view, ...otherProps }: Props) => {
    const insets = useSafeAreaInsets();
    const { themeScheme, currentTheme } = useTheme();

    return (<>
        <View style={{ paddingTop: insets.top }} {...view} />
        <StatusBar barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={currentTheme.background} {...otherProps} />
    </>)
}

export default SkysoloStatusbar