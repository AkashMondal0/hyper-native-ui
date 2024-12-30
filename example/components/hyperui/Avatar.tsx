import React from 'react';
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
import { useTheme } from 'hyper-native-ui';
import { themeColors } from 'hyper-native-ui/src/constants/Colors';

export type Props = ImageProps & {
    src: string | null | undefined;
    showImageError?: boolean;
    blurUrl?: string | null | undefined;
    source?: undefined;
    isTouchableOpacity?: boolean;
    touchableOpacityProps?: TouchableOpacityProps
    activityIndicatorProps?: ActivityIndicatorProps
    isActivityIndicator?: boolean;
    borderVariant?: any;
    borderWidth?: number;
    borderStyle?: TouchableOpacityProps["style"];
    onPress?: () => void;
    onLongPress?: () => void;
    size: number
};

const Avatar = ({
    style,
    src,
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
    const { currentTheme } = useTheme();
    const [state, setState] = useState<"idle" | "pending" | "normal" | "error">("idle");
    borderWidth = borderWidth > 0 ? borderWidth : 0

    const colorVariant = () => {
        switch (borderVariant) {
            case "secondary":
                return {
                    isFocused: currentTheme.primary
                }
            case "default":
                return {
                    isFocused: currentTheme.primary
                }
            default:
                const theme = themeColors.find((theme) => theme.name === variant)![themeScheme ?? defaultThemeScheme]
                if (theme) {
                    return {
                        isFocused: theme.primary
                    }
                }
                return {
                    isFocused: currentTheme.primary
                }

        }
    }

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
                // {...touchableOpacityProps}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: borderWidth,
                    borderColor: colorVariant().isFocused,
                    borderRadius: 1000,
                    padding: 2,
                    aspectRatio: 1 / 1,
                    width: size + 10
                }}
                activeOpacity={isTouchableOpacity ? touchableOpacityProps?.activeOpacity ?? 0.5 : 1}>
                <View style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    display: isActivityIndicator ? state === "normal" ? "none" : "flex" : "none",
                }}>
                    <ActivityIndicator
                        color={currentTheme.primary} size={40}
                        {...activityIndicatorProps} />
                </View>
                <ImageComponent />
            </TouchableOpacity>
        </>
    )
}

export default Avatar