import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity as RNTouchableOpacity,
    ViewStyle,
    TextStyle,
    ScrollView,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import useTheme from '../hooks/useTheme';
import TouchableOpacity from './TouchableOpacity';

interface DropdownItem {
    label: string;
    value: string | number;
}

interface AnimatedDropdownProps {
    data: DropdownItem[];
    placeholder?: string;
    onSelect?: (item: DropdownItem) => void;
    dropdownStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    itemTextStyle?: TextStyle;
    dropdownAnimationDuration?: number,
}

const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
    data = [],
    placeholder = 'Select an option',
    onSelect,
    dropdownStyle = {},
    itemStyle = {},
    itemTextStyle,
    dropdownAnimationDuration = 300
}) => {
    const [selectedValue, setSelectedValue] = useState<DropdownItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { currentTheme } = useTheme();

    const dropdownHeight = useSharedValue(0);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
        dropdownHeight.value = isVisible
            ? withTiming(0, { duration: dropdownAnimationDuration })
            : withTiming(200, { duration: dropdownAnimationDuration }); // Adjust the target height as needed
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
        <View style={{
            width: '100%',
            alignItems: 'center',
        }}>
            {/* Dropdown trigger button */}
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
                        borderBottomColor: currentTheme.popover,
                        color: currentTheme.accent_foreground,
                    }}>
                    {selectedValue ? selectedValue.label : placeholder}
                </Text>
            </RNTouchableOpacity>

            {/* Animated dropdown list */}
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
            }, animatedStyle,
                dropdownStyle]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[{
                                padding: 12,
                                borderBottomWidth: 0.5,
                                borderBottomColor: currentTheme.muted_foreground,
                                backgroundColor: currentTheme.muted,
                            }, itemStyle]}
                            onPress={() => handleSelect(item)}>
                            <Text
                                numberOfLines={1}
                                style={[{
                                    fontSize: 16,
                                    color: currentTheme.accent_foreground,
                                    fontWeight: "500",
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