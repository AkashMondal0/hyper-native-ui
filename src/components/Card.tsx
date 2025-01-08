import React, { memo } from 'react';
import useTheme from '../hooks/useTheme';
import { ThemeName } from '../constants/Colors';

export type Props = {
    themeScheme?: "light" | "dark";
    variantColor?: "default" | ThemeName;
    variant?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "button" | "caption" | "overline";
};

const Component = memo(function Component() {
    const { currentTheme } = useTheme();

    if (!currentTheme) return <></>;

    return (
        <></>
    )
})

export default Component;