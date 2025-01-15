import React from 'react';
import useTheme from '../hooks/useTheme';
import { type ViewProps, Animated } from 'react-native';

export type Props = ViewProps & {
    variant?: any
    lightColor?: string;
    darkColor?: string;
};

const AnimatedViewComponent = ({ style, ...otherProps }: Props) => {
    const { currentTheme } = useTheme();
    if (!currentTheme) return <></>
    return (
        <Animated.View style={[{
            backgroundColor: currentTheme.background,
        }, style]}{...otherProps} />
    )
}

export default AnimatedViewComponent;