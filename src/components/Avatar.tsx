import React, { useMemo } from 'react';
import { useState } from 'react';
import {
    Image as RNImage,
    ImageProps,
    Text,
    TouchableOpacity,
    View,
    TouchableOpacityProps,
    ActivityIndicator,
    ActivityIndicatorProps
} from 'react-native';
import { themeColors, ThemeName } from '../constants/Colors';
import useTheme from '../hooks/useTheme';

export type Props = ImageProps & {
    src: string | null | undefined;
    showImageError?: boolean;
    blurUrl?: string | null | undefined;
    source?: undefined;
    isTouchableOpacity?: boolean;
    touchableOpacityProps?: TouchableOpacityProps
    activityIndicatorProps?: ActivityIndicatorProps
    isActivityIndicator?: boolean;
    borderVariant?: "default" | "secondary" | ThemeName;
    borderWidth?: number;
    isBorder?: boolean;
    borderStyle?: TouchableOpacityProps["style"];
    onPress?: () => void;
    onLongPress?: () => void;
    size: number;
    themeScheme?: "light" | "dark";
};

const Avatar = ({
    style,
    src,
    themeScheme,
    isTouchableOpacity = false,
    touchableOpacityProps,
    activityIndicatorProps,
    isActivityIndicator = true,
    showImageError = false,
    blurUrl,
    borderWidth = 0,
    borderVariant = "default",
    onPress,
    onLongPress,
    size = 60,
    ...otherProps }: Props) => {
    const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();
    const [state, setState] = useState<"idle" | "pending" | "normal" | "error">("idle");
    borderWidth = borderWidth > 0 ? borderWidth : 0

    const colorStyle = useMemo(() => {
        if (borderVariant === 'default') {
            return {
                isFocused: currentTheme.primary
            };
        }

        if (borderVariant === 'secondary') {
            return {
                isFocused: currentTheme.secondary
            };
        }

        const theme = themeColors.find((t) => t.name === borderVariant)?.[themeScheme ?? defaultThemeScheme];
        return {
            isFocused: theme?.primary ?? currentTheme.primary
        };
    }, [currentTheme, themeScheme, defaultThemeScheme, borderVariant]);


    if (state === "error" && showImageError || !src) {
        return (
            <View
                style={{
                    width: otherProps.width ?? "100%",
                    height: otherProps.height ?? "auto",
                    borderRadius: 1000,
                    backgroundColor: currentTheme?.muted,
                    borderWidth: borderWidth > 0 ? borderWidth : 0,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <TouchableOpacity activeOpacity={0.6}
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {/* <RotateCcw color={currentTheme?.foreground} size={40} strokeWidth={0.8} /> */}
                    <Text style={{
                        color: currentTheme?.muted_foreground,
                        fontSize: 16,
                        textAlign: "center",
                    }}>
                        Failed to load image
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const ImageComponent = () => {
        return (<RNImage
            source={{ uri: src }}
            fadeDuration={150}
            borderRadius={1000}
            width={size}
            height={size}
            resizeMode="cover"
            onError={() => {
                if (state === "error") return;
                setState("error")
            }}
            onLoadEnd={() => {
                if (state === "normal") return;
                setState("normal")
            }}
            {...otherProps} />)
    }

    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: borderWidth,
                    borderColor: colorStyle.isFocused,
                    borderRadius: 1000,
                    padding: 2,
                    aspectRatio: 1 / 1,
                    width: size + 10
                }}
                activeOpacity={isTouchableOpacity ? touchableOpacityProps?.activeOpacity ?? 0.5 : 1}
                {...touchableOpacityProps}>
                <View style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    display: isActivityIndicator ? state === "normal" ? "none" : "flex" : "none",
                }}>
                    <ActivityIndicator color={currentTheme.primary} size={40} {...activityIndicatorProps} />
                </View>
                <ImageComponent />
            </TouchableOpacity>
        </>
    )
}

export default Avatar