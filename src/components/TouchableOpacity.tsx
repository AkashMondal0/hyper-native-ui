
import React, { useState } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import useTheme from '../hooks/useTheme';

export type Props = TouchableOpacityProps & {
    variant?: any
    lightColor?: string;
    darkColor?: string;
};


const TouchableOpacityComponent = ({ style, ...otherProps }: Props) => {
    const [isPress, setIsPress] = useState(false);
    const { currentTheme } = useTheme();

    if (!currentTheme) return <></>;

    return (
        <TouchableOpacity
            onPressIn={() => {
                setIsPress(true)
            }}
            onPressOut={() => {
                setIsPress(false)
            }}
            delayPressIn={110}
            activeOpacity={0.8}
            style={[{
                backgroundColor: isPress ? currentTheme.muted : currentTheme.background,
            }, style]}
            {...otherProps}
        />
    )
}

export default TouchableOpacityComponent;