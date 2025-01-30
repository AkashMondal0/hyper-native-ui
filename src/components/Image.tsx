import React from 'react';
import { useState } from 'react';
import {
    Image as RNImage,
    ImageProps,
    Text,
    TouchableOpacity,
    View,
    TouchableOpacityProps,
    ActivityIndicatorProps
} from 'react-native';
import useTheme from '../hooks/useTheme';
import Skeleton from './Skeleton'

export type Props = ImageProps & {
    src: string | null | undefined;
    isBorder?: boolean;
    showImageError?: boolean;
    blurUrl?: string | null | undefined;
    source?: undefined;
    isTouchableOpacity?: boolean;
    touchableOpacityProps?: TouchableOpacityProps
    activityIndicatorProps?: ActivityIndicatorProps
    isActivityIndicator?: boolean;
    onPress?: () => void
    onLongPress?: () => void
};

const Image = ({
    style,
    src,
    isTouchableOpacity = false,
    touchableOpacityProps,
    activityIndicatorProps,
    isActivityIndicator = true,
    isBorder = true,
    showImageError = false,
    onPress,
    onLongPress,
    blurUrl, ...otherProps }: Props) => {
    const { currentTheme } = useTheme();
    const [state, setState] = useState<"idle" | "pending" | "normal" | "error">("idle");

    if (state === "error" && showImageError || !src) {
        return (
            <View
                style={{
                    width: otherProps.width ?? "100%",
                    height: otherProps.height ?? "auto",
                    borderRadius: otherProps.borderRadius ?? 5,
                    backgroundColor: currentTheme?.muted,
                    borderWidth: isBorder ? 1 : 0,
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
        <TouchableOpacity {...touchableOpacityProps}
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: otherProps.width ?? "100%",
                height: otherProps.height ?? "auto",
            }}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={isTouchableOpacity ? touchableOpacityProps?.activeOpacity ?? 0.5 : 1}>
            <View style={[{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                width: "100%",
                height: "100%",
                display: isActivityIndicator ? state === "normal" ? "none" : "flex" : "none",
            }]}>
                <Skeleton  {...otherProps} />
            </View>
            <ImageComponent />
        </TouchableOpacity>
    )
}

export default Image;