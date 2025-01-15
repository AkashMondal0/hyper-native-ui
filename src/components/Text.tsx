import {
    Text as RNText,
    TextStyle,
    type TextProps,
} from 'react-native';
import React, { memo, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { ThemeName, themeColors } from '../constants/Colors';

export type Props = TextProps & {
    themeScheme?: 'light' | 'dark';
    variantColor?: 'default' | 'primary' | 'secondary' | ThemeName;
    variant?:
    | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
    | 'subtitle1' | 'subtitle2'
    | 'body1' | 'body2'
    | 'button' | 'caption' | 'overline';
    bold?: TextStyle['fontWeight'];
    size?: TextStyle['fontSize'];
    center?: boolean;
    disable?: boolean;
};

const Text = memo(function Text({
    style,
    themeScheme,
    bold,
    size,
    center = false,
    disable = false,
    variantColor = 'default',
    variant = 'body1',
    ...otherProps
}: Props) {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

    const colorStyle = useMemo(() => {
        if (variantColor === 'default') {
            return { color: currentTheme.foreground };
        }

        if (variantColor === 'secondary') {
            return { color: currentTheme.muted_foreground };
        }

        if (variantColor === 'primary') {
            return { color: currentTheme.primary };
        }

        const theme = themeColors.find((t) => t.name === variantColor)?.[themeScheme ?? defaultThemeScheme];
        return { color: theme?.primary || currentTheme.primary_foreground };
    }, [currentTheme, themeScheme, defaultThemeScheme, variantColor]);

    const textVariantStyle = useMemo(() => {
        const variants: Record<NonNullable<Props["variant"]>, TextStyle> = {
            H1: { fontSize: 96, fontWeight: '100', letterSpacing: -1.5 },
            H2: { fontSize: 60, fontWeight: '100', letterSpacing: -0.5 },
            H3: { fontSize: 48, fontWeight: '400' },
            H4: { fontSize: 34, fontWeight: '400', letterSpacing: 0.25 },
            H5: { fontSize: 24, fontWeight: '400' },
            H6: { fontSize: 20, fontWeight: '500', letterSpacing: 0.15 },
            subtitle1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.15 },
            subtitle2: { fontSize: 14, fontWeight: '500', letterSpacing: 0.1 },
            body1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.5 },
            body2: { fontSize: 14, fontWeight: '400', letterSpacing: 0.25 },
            button: { fontSize: 14, fontWeight: '500', letterSpacing: 1.25 },
            caption: { fontSize: 12, fontWeight: '400', letterSpacing: 0.4 },
            overline: { fontSize: 10, fontWeight: '400', letterSpacing: 1.5 },
        };

        return variants[variant] || { fontSize: 16, fontWeight: '400' };
    }, [variant]);

    if (!currentTheme) return <></>;

    const combinedStyles = useMemo(() => {
        return [
            { textAlign: center ? 'center' as 'center' : 'auto' as 'auto', opacity: disable ? 0.5 : 1 },
            colorStyle,
            textVariantStyle,
            bold ? { fontWeight: bold } : {},
            size ? { fontSize: size } : {},
            style,
        ];
    }, [center, disable, colorStyle, textVariantStyle, bold, size, style]);

    return <RNText style={combinedStyles} {...otherProps} />;
});

export default Text;
