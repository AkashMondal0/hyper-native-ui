import React, { memo, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { ThemeName, themeColors } from '../constants/Colors';
import {
	Pressable,
	Text,
	View,
	ViewStyle,
	PressableProps,
	TextProps, ActivityIndicatorProps,
	ActivityIndicator
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

export type Props = PressableProps & {
	themeScheme?: "light" | "dark";
	children?: string | React.ReactNode;
	textStyle?: TextProps["style"];
	textTextProps?: TextProps;
	loadingStyle?: ActivityIndicatorProps["style"];
	loadingProps?: ActivityIndicatorProps;
	size?: "small" | "medium" | "large" | "extraLarge";
	icon?: React.ReactNode;
	loading?: boolean;
	disableMemo?: boolean;
	variant?: "default" | "secondary" | "danger" | "warning" | "success" | "outline" | ThemeName;
	width?: ViewStyle["width"];
	center?: boolean;
	style?: PressableProps["style"]
	radius?: number;
	rippleRadius?: number;
	disabled?: boolean;
};

export const PressableButton = memo(function Button({
	children = "Button",
	style,
	themeScheme,
	textStyle,
	loadingStyle,
	loadingProps,
	textTextProps,
	width,
	center = false,
	variant = "default",
	size = "medium",
	icon = undefined,
	loading = false,
	disabled = false,
	radius = 16,
	rippleRadius = 1000,
	disableMemo = false,
	...otherProps
}: Props) {
	const { currentTheme, themeScheme: defaultThemeScheme } = useTheme();

	const scale = useSharedValue(1);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: withTiming(scale.value, { duration: 120 }) }],
	}));

	const computedWidth =
		typeof width === "number" || /^[0-9]+$/.test(width as string)
			? Number(width)
			: width;

	const colorStyle = useMemo(() => {
		// all your variant logic
		if (variant === 'default') {
			return {
				backgroundColor: currentTheme.card,
				color: currentTheme.foreground,
				borderColor: currentTheme.border,
				rippleColor: currentTheme.accent,
			};
		}
		if (variant === 'secondary') {
			return {
				backgroundColor: currentTheme.secondary,
				color: currentTheme.secondary_foreground,
				borderColor: currentTheme.secondary,
				rippleColor: currentTheme.secondary,
			};
		}
		if (variant === 'danger') {
			return {
				backgroundColor: currentTheme.destructive,
				color: currentTheme.destructive_foreground,
				borderColor: currentTheme.destructive,
				rippleColor: currentTheme.destructive,
			};
		}
		if (variant === 'warning') {
			return {
				backgroundColor: "hsl(47.9 95.8% 53.1%)",
				color: "hsl(26 83.3% 14.1%)",
				borderColor: "hsl(47.9 95.8% 53.1%)",
				rippleColor: "hsl(47.9 95.8% 53.1%)",
			};
		}
		if (variant === 'success') {
			return {
				backgroundColor: "hsl(142.1 76.2% 36.3%)",
				color: "hsl(355.7 100% 97.3%)",
				borderColor: "hsl(142.1 76.2% 36.3%)",
				rippleColor: "hsl(142.1 76.2% 36.3%)",
			};
		}
		if (variant === 'outline') {
			return {
				backgroundColor: currentTheme.card,
				color: currentTheme.foreground,
				borderColor: currentTheme.border,
				rippleColor: currentTheme.accent,
			};
		}

		const theme = themeColors.find((t) => t.name === variant)?.[
			(themeScheme ?? defaultThemeScheme) as "light" | "dark"
		];
		return {
			backgroundColor: theme?.primary || currentTheme.primary,
			color: theme?.primary_foreground || currentTheme.primary_foreground,
			borderColor: theme?.border || currentTheme.border,
			rippleColor: theme?.muted || currentTheme.muted,
		};
	}, [currentTheme, themeScheme, defaultThemeScheme, variant]);

	const sizeVariant = useMemo(() => {
		switch (size) {
			case "small":
				return {
					paddingVertical: 5,
					paddingHorizontal: 10,
					borderRadius: 5,
					fontSize: 12,
				};
			case "large":
				return {
					paddingVertical: 15,
					paddingHorizontal: 20,
					borderRadius: 15,
					fontSize: 16,
				};
			case "extraLarge":
				return {
					paddingVertical: 20,
					paddingHorizontal: 25,
					borderRadius: 20,
					fontSize: 18,
				};
			default:
				return {
					paddingVertical: 10,
					paddingHorizontal: 15,
					borderRadius: 10,
					fontSize: 14,
				};
		}
	}, [size]);

	if (!currentTheme) return <></>;

	return (
		<Animated.View style={[{ overflow: "hidden", borderRadius: radius }, animatedStyle]}>
			<Pressable
				onPressIn={() => {
					if (!disabled) scale.value = 0.96;
				}}
				onPressOut={() => {
					if (!disabled) scale.value = 1;
				}}
				android_ripple={{
					color: colorStyle.rippleColor,
					radius: rippleRadius,
					borderless: true,
				}}
				disabled={disabled}
				style={({ pressed }) => [
					{
						borderRadius: radius,
						borderWidth: 0.6,
						borderColor: colorStyle.borderColor,
						backgroundColor: colorStyle.backgroundColor,
						alignItems: "center",
						justifyContent: "center",
					},
					computedWidth,
					style as any,
					pressed ? { opacity: 0.85 } : undefined,
					disabled ? { opacity: 0.5 } : undefined,
				]}
				{...otherProps}
			>
				<ButtonContent
					children={children}
					textStyle={[textStyle, sizeVariant]}
					icon={icon}
					textProps={textTextProps}
					loadingStyle={loadingStyle}
					loadingProps={loadingProps}
					loading={loading}
					color={colorStyle.color}
				/>
			</Pressable>
		</Animated.View>
	);
});

export default PressableButton;

const ButtonContent = ({
	children,
	textStyle,
	icon,
	loading,
	loadingStyle,
	loadingProps,
	textProps,
	color
}: {
	children: string | React.ReactNode,
	icon: React.ReactNode,
	loading: boolean,
	textProps?: TextProps,
	textStyle: TextProps["style"],
	loadingProps?: ActivityIndicatorProps,
	loadingStyle: ActivityIndicatorProps["style"],
	color: string,
}) => {

	if (typeof children === "string") {
		return <>
			{icon ? icon : <></>}
			<View>
				<Text
					{...textProps}
					numberOfLines={1}
					style={[{
						color: color,
						textAlign: 'center',
						textAlignVertical: 'center',
						fontSize: 16,
						fontWeight: "700",
						opacity: loading ? 0 : 1,
					}, textStyle]}>
					{children}
				</Text>
				<ActivityIndicator color={color}
					// size={20}
					style={[loadingStyle, {
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						justifyContent: 'center',
						alignItems: 'center',
						opacity: loading ? 1 : 0,
					}]} {...loadingProps} />
			</View>
		</>
	}

	else if (typeof children === "object") {
		return React.Children.map(children, (child, index) => {
			if (typeof child === "string") {
				return (
					<View key={index}>
						<Text
							style={[{
								color,
								textAlign: 'center',
								textAlignVertical: 'center',
								fontSize: 16,
								fontWeight: "700",
								opacity: loading ? 0 : 1,
							}, textStyle]}
						>
							{child}
						</Text>
						<ActivityIndicator
							color={color}
							style={[loadingStyle, {
								position: 'absolute',
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								justifyContent: 'center',
								alignItems: 'center',
								opacity: loading ? 1 : 0,
							}]}
							{...loadingProps}
						/>
					</View>
				);
			} else {
				return child;
			}
		});
	};
	return (
		<>
			{children}
		</>
	)
};

export const PressableView = memo(function Button({
	children = "Button",
	style,
	themeScheme,
	textStyle,
	loadingStyle,
	loadingProps,
	textTextProps,
	width,
	center = false,
	variant = "default",
	size = "medium",
	icon = undefined,
	loading = false,
	disabled = false,
	disableMemo = false,
	radius = 16,
	rippleRadius = 1000,
	...otherProps
}: Props) {
	const { currentTheme } = useTheme();

	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withTiming(scale.value, { duration: 120 }) }],
		};
	});

	const computedWidth =
		typeof width === "number" || /^[0-9]+$/.test(width as string)
			? Number(width)
			: width;

	if (!currentTheme) return <></>;

	return (
		<Animated.View
			style={[
				{ overflow: "hidden", borderRadius: radius },
				animatedStyle,
			]}
		>
			<Pressable
				onPressIn={() => {
					if (!disabled) scale.value = 0.96;
				}}
				onPressOut={() => {
					if (!disabled) scale.value = 1;
				}}
				android_ripple={{
					color: currentTheme.muted,
					radius: rippleRadius,
					borderless: true,
				}}
				disabled={disabled}
				style={({ }) => [
					{
						borderRadius: radius,
						borderWidth: 0.6,
						borderColor: currentTheme.border,
						backgroundColor: currentTheme.card,
						alignItems: "center",
						justifyContent: "center",
					},
					computedWidth,
					style as any,
					disabled ? { opacity: 0.5 } : undefined,
				]}
				{...otherProps}
			>
				{children}
			</Pressable>
		</Animated.View>
	);
});
