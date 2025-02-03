import { useTheme } from "hyper-native-ui";
import React, { useState, useCallback, ReactNode, useRef } from "react";
import { View, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

const Collapsible = ({
    title,
    titleStyle,
    triggerComponent,
    children,
    containerStyle,
    backgroundColor = undefined,
    animationType = "spring"
}: {
    title?: string;
    titleStyle?: TextStyle;
    triggerComponent?: ReactNode;
    children: ReactNode;
    containerStyle?: ViewStyle;
    backgroundColor?: string;
    animationType?: "spring" | "normal"
}) => {
    const [open, setOpen] = useState(false);
    const height = useSharedValue(0);
    const measuredHeight = useSharedValue(0);
    const { currentTheme } = useTheme();

    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
        if (animationType === "spring") {
            height.value = open ? withTiming(0) : withSpring(measuredHeight.value);
        } else {
            height.value = open ? withTiming(0) : withTiming(measuredHeight.value);
        }
    }, [open]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: measuredHeight.value === 0 ? undefined : height.value,
        overflow: "hidden",
    }));

    return (
        <View style={{
            borderWidth: 1,
            borderColor: currentTheme.border,
            borderRadius: 16,
            overflow: "hidden",
        }}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={toggle} style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: backgroundColor ?? currentTheme.accent
                }}>
                {triggerComponent ? triggerComponent : <Text style={[{
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: 10,
                    color: open ? currentTheme.foreground : currentTheme.accent_foreground
                }, titleStyle]}>{title}</Text>}
            </TouchableOpacity>
            <Animated.View
                onLayout={useCallback((e: any) => {
                    if (measuredHeight.value === 0) {
                        const layoutHeight = e.nativeEvent.layout.height;
                        measuredHeight.value = layoutHeight;
                    }
                }, [])}
                style={[
                    {
                        backgroundColor: backgroundColor ?? currentTheme.accent,
                    },
                    containerStyle,
                    animatedStyle]}>
                {children}
            </Animated.View>
        </View>
    );
};

export default Collapsible;
