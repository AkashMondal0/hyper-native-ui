import { useTheme, ThemeNameType, themeColors } from "hyper-native-ui";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { TextProps, Text, TextStyle, View, ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from "react-native-reanimated";

type Props = TextProps & {
  text?: string;
  speed?: number;
  onComplete?: () => void;

  themeScheme?: 'light' | 'dark';
  variantColor?: 'default' | 'primary' | 'secondary' | ThemeNameType;
  variant?:
  | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'button' | 'caption' | 'overline';
  bold?: TextStyle['fontWeight'];
  size?: TextStyle['fontSize'];
  center?: boolean;

  containerStyle?: ViewProps
};

const TextLoader = ({
  text = "Generating response...",
  speed = 30,
  onComplete,
  containerStyle,
  variantColor = "default",
  variant = "body1",
  center,
  themeScheme,
  bold,
  size,
  style,
  ...otherProps
}: Props) => {
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef("");
  const dotOpacity = useSharedValue(0);

  const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

  const colorStyle = useMemo(() => {
    if (variantColor === 'default') {
      return { color: currentTheme.foreground };
    }

    if (variantColor === 'secondary') {
      return { color: currentTheme.muted_foreground };
    }

    if (variantColor === 'primary') {
      return { color: currentTheme.primary };
    }

    const theme = themeColors.find((t) => t.name === variantColor)?.[themeScheme ?? defaultThemeScheme];
    return { color: theme?.primary || currentTheme.foreground };
  }, [currentTheme, themeScheme, defaultThemeScheme, variantColor]);

  const textVariantStyle = useMemo(() => {
    const variants: Record<NonNullable<Props["variant"]>, TextStyle> = {
      H1: { fontSize: 96, fontWeight: '100', letterSpacing: -1.5 },
      H2: { fontSize: 60, fontWeight: '100', letterSpacing: -0.5 },
      H3: { fontSize: 48, fontWeight: '400' },
      H4: { fontSize: 34, fontWeight: '400', letterSpacing: 0.25 },
      H5: { fontSize: 24, fontWeight: '400' },
      H6: { fontSize: 20, fontWeight: '500', letterSpacing: 0.15 },
      subtitle1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.15 },
      subtitle2: { fontSize: 14, fontWeight: '500', letterSpacing: 0.1 },
      body1: { fontSize: 16, fontWeight: '400', letterSpacing: 0.5 },
      body2: { fontSize: 14, fontWeight: '400', letterSpacing: 0.25 },
      button: { fontSize: 14, fontWeight: '500', letterSpacing: 1.25 },
      caption: { fontSize: 12, fontWeight: '400', letterSpacing: 0.4 },
      overline: { fontSize: 10, fontWeight: '400', letterSpacing: 1.5 },
    };

    return variants[variant ?? 'body1'] || { fontSize: 16, fontWeight: '400' };
  }, [variant]);

  const combinedStyles = useMemo(() => {
    return [
      { textAlign: center ? 'center' as 'center' : 'auto' as 'auto', opacity: otherProps?.disabled ? 0.5 : 1 },
      colorStyle,
      textVariantStyle,
      bold ? { fontWeight: bold } : {},
      size ? { fontSize: size } : {},
      style,
    ];
  }, [center, otherProps?.disabled, colorStyle, textVariantStyle, bold, size, style]);

  useEffect(() => {
    setDisplayedText(""); // Reset text
    textRef.current = ""; // Reset reference

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        textRef.current += text[index]; // Update ref first
        setDisplayedText(textRef.current); // Use ref for accurate updates
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  useEffect(() => {
    dotOpacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      withTiming(0.3, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      withDelay(500, withTiming(0, { duration: 200 }))
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
  }));

  return (
    <View
      style={[{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }, containerStyle]}
    >
      <Text style={combinedStyles} {...otherProps}>
        {displayedText}
      </Text>
      <Animated.Text
        style={[
          {
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 4,
          },
          dotStyle,
        ]}
      >
        {"..."}
      </Animated.Text>
    </View>
  );
};

export default TextLoader;