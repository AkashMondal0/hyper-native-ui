import useTheme from "../hooks/useTheme";
import { themeColors, ThemeName } from "../constants/Colors";
import React, { useEffect, useMemo } from "react";
import { View, ViewProps, ViewStyle, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    interpolate,
    cancelAnimation,
    Extrapolate,
    Easing,
} from "react-native-reanimated";

const {
    width: FULL_ITEM_WIDTH,
    // height: FULL_ITEM_HEIGHT,
} = Dimensions.get('window');

export type Props = ViewProps & {
    themeScheme?: "light" | "dark";
    children?: string | React.ReactNode;
    variant?: "default" | "secondary" | ThemeName;
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    borderRadius?: ViewStyle["borderRadius"]
    animationDirection?: "leftToRight" | "rightToLeft" | "topToBottom" | "bottomToTop";
    animationType?: "shiver" | "pulse",
    center?: boolean;
    backgroundColor?: ViewStyle["backgroundColor"],
    highlightColor?: ViewStyle["backgroundColor"],
    square?: boolean
};
const Skeleton = ({
    width = 100,
    height = 100,
    borderRadius = 8,
    themeScheme,
    animationType = "pulse",
    animationDirection = "leftToRight",
    variant = "default",
    square
}: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    const ptpWidth = (typeof width === 'string' && width.includes('%'))
        ? (parseFloat(width) / 100) * FULL_ITEM_WIDTH
        : (typeof width === 'number' ? width : FULL_ITEM_WIDTH);
    // const ptpHeight = (typeof height === 'string' && height.includes('%'))
    //     ? (parseFloat(height) / 100) * FULL_ITEM_HEIGHT
    //     : (typeof height === 'number' ? height : FULL_ITEM_HEIGHT);

    const progress = useSharedValue(0);
    const opacity = useSharedValue(1);

    const colorStyle = useMemo(() => {
        if (variant === 'default') {
            return {
                backgroundColor: currentTheme.muted_foreground,
                highlightColor: currentTheme.border,
            };
        }

        if (variant === 'secondary') {
            return {
                backgroundColor: currentTheme.border,
                highlightColor: currentTheme.muted_foreground,
            };
        }

        const theme = themeColors.find((t) => t.name === variant)?.[themeScheme ?? defaultThemeScheme];
        return {
            backgroundColor: theme?.muted_foreground || currentTheme.muted_foreground,
            highlightColor: theme?.border || currentTheme.border,
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, variant]);

    useEffect(() => {
        if (animationType === "pulse") {
            opacity.value = withRepeat(
                withTiming(0.5, { duration: 800, easing: Easing.inOut(Easing.ease) }),
                -1,
                true
            );
        } else {
            progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
        }

        return () => {
            cancelAnimation(progress);
            cancelAnimation(opacity);
        };
    }, [animationType, progress, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        if (animationType === "pulse") {
            return {
                opacity: opacity.value,
            };
        }

        let translateX = 0;
        let translateY = 0;
        let scale = 1;

        if (animationType === "shiver") {
            const offset = interpolate(
                progress.value,
                [0, 1],
                [-ptpWidth, ptpWidth],
                Extrapolate.CLAMP
            );

            if (animationDirection === "leftToRight") {
                translateX = offset;
            } else if (animationDirection === "rightToLeft") {
                translateX = -offset;
            } else if (animationDirection === "topToBottom") {
                translateY = offset;
            } else if (animationDirection === "bottomToTop") {
                translateY = -offset;
            }
        }

        return {
            transform: [{ translateX }, { translateY }, { scale }],
        };
    });

    return (
        <View style={[{
            overflow: "hidden",
            position: "relative",
            aspectRatio: square ? 1 / 1 : undefined,
        }, { width, height, borderRadius, backgroundColor: colorStyle.backgroundColor }]}>
            <Animated.View
                style={[
                    animatedStyle,
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                    },
                    {
                        width: "100%",
                        height: "100%",
                        backgroundColor: colorStyle.highlightColor,
                    },
                ]}
            />
        </View>
    );
};
export default Skeleton;