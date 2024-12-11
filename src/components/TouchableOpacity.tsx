import React from 'react';
import { useState } from 'react';
import { TouchableOpacity as RNTouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export type Props = TouchableOpacityProps & {
    variant?: any
    lightColor?: string;
    darkColor?: string;
};


const TouchableOpacity = ({ style, ...otherProps }: Props) => {
    const [isPress, setIsPress] = useState(false)
    const { currentTheme } = useTheme()

    return (
        <RNTouchableOpacity
            onPressIn={() => {
                setIsPress(true)
            }}
            onPressOut={() => {
                setIsPress(false)
            }}
            delayPressIn={110}
            activeOpacity={0.8}
            style={[{ backgroundColor: isPress ? currentTheme?.secondary : currentTheme.background, }, style]}
            {...otherProps}
        />
    )
}

export default TouchableOpacity