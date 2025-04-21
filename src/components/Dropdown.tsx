import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity as RNTouchableOpacity,
    ViewStyle,
    TextStyle,
    ScrollView,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring
} from 'react-native-reanimated';
import useTheme from '../hooks/useTheme';
import TouchableOpacity from './TouchableOpacity';

interface DropdownItem {
    label: string;
    value: string | number;
    onPres?: () => void
}

interface AnimatedDropdownProps {
    data: DropdownItem[];
    placeholder?: string;
    onSelect?: (item: DropdownItem) => void;
    dropdownStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    itemTextStyle?: TextStyle;
    itemHeight?: number;
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
    data = [],
    placeholder = 'Select an option',
    onSelect,
    dropdownStyle = {},
    itemStyle = {},
    itemTextStyle,
    itemHeight = 51,
}) => {
    const [selectedValue, setSelectedValue] = useState<DropdownItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { currentTheme } = useTheme();

    const dropdownHeight = useSharedValue(0);

    const toggleDropdown = () => {
        const targetHeight = isVisible ? 0 : Math.min(data.length * itemHeight, 200);
        dropdownHeight.value = withSpring(targetHeight, {
            damping: 15,
            stiffness: 150,
            mass: 0.8,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        });
        setIsVisible(!isVisible);
    };

    const handleSelect = (item: DropdownItem) => {
        setSelectedValue(item);
        toggleDropdown();
        if (onSelect) onSelect(item);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: dropdownHeight.value,
        opacity: dropdownHeight.value > 0 ? 1 : 0,
    }));

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            {/* Dropdown Trigger */}
            <RNTouchableOpacity
                activeOpacity={0.8}
                style={[{
                    padding: 12,
                    borderWidth: 0.5,
                    borderColor: isVisible ? currentTheme.ring : currentTheme.border,
                    borderRadius: 18,
                    backgroundColor: currentTheme.muted,
                    width: "auto"
                }, dropdownStyle]}
                onPress={toggleDropdown}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 16,
                        color: currentTheme.accent_foreground,
                    }}>
                    {selectedValue ? selectedValue.label : placeholder}
                </Text>
            </RNTouchableOpacity>

            {/* Animated Dropdown */}
            <Animated.View style={[{
                width: "auto",
                minWidth: "40%",
                maxWidth: "90%",
                position: 'absolute',
                top: 60,
                backgroundColor: currentTheme.muted,
                borderRadius: 18,
                overflow: 'hidden',
                zIndex: 1000,
            }, animatedStyle, dropdownStyle]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.4}
                            key={index}
                            style={[{
                                padding: 12,
                                borderBottomWidth: index + 1 === data.length ? 0 : 0.6,
                                borderBottomColor: currentTheme.muted_foreground,
                                backgroundColor: currentTheme.muted,
                                height: itemHeight,
                            }, itemStyle]}
                            onPress={() => handleSelect(item)}>
                            <Text
                                numberOfLines={1}
                                style={[{
                                    fontSize: 14,
                                    color: currentTheme.accent_foreground,
                                    fontWeight: "500",
                                    textAlign: "center"
                                }, itemTextStyle]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

export default AnimatedDropdown;