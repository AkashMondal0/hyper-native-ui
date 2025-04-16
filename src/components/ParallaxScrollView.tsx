import type { PropsWithChildren, ReactNode } from 'react';
import React from 'react';
import { ImageProps, ImageStyle, ViewStyle } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import ThemedView from './View';
import useTheme from '../hooks/useTheme';

type Props = PropsWithChildren<{
	imageUrl: string;
	imageHeight?: number;
	headerComponent?: ReactNode;
	imageStyle?: ImageStyle;
	imageProps?: ImageProps;
	childrenStyle?: ViewStyle;
}>;

export default function ParallaxScrollView({
	children,
	imageUrl,
	imageHeight = 500,
	headerComponent,
	imageStyle,
	imageProps,
	childrenStyle,
}: Props) {
	const HEADER_HEIGHT = imageHeight;
	const { currentTheme } = useTheme();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useSharedValue(0);

	// Smoothly track scroll offset using event handler
	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollOffset.value = event.contentOffset.y;
		},
	});

	const headerAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					scrollOffset.value,
					[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
					[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.5]
				),
			},
			{
				scale: interpolate(
					scrollOffset.value,
					[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
					[1.8, 1, 1]
				),
			},
		],
	}));

	const HeaderComponent = () => {
		if (headerComponent) return <>{headerComponent}</>;
		return (
			<Animated.Image
				source={{ uri: imageUrl }}
				style={[
					{
						height: HEADER_HEIGHT,
						width: '100%',
						position: 'absolute',
						bottom: 0,
						left: 0,
					},
					imageStyle,
				]}
				{...imageProps}
			/>
		);
	};

	return (
		<ThemedView style={{ flex: 1 }}>
			<Animated.ScrollView
				ref={scrollRef}
				onScroll={onScroll}
				scrollEventThrottle={16}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 32 }}
				overScrollMode="never">
				{/* Header Section */}
				<Animated.View
					style={[
						{
							backgroundColor: currentTheme.background,
							height: HEADER_HEIGHT,
							overflow: 'hidden',
						},
						headerAnimatedStyle,
					]}>
					<HeaderComponent />
				</Animated.View>

				{/* Content Section */}
				<ThemedView
					style={[
						{
							flex: 1,
							padding: 32,
							gap: 16,
							overflow: 'hidden',
							borderRadius: 30,
						},
						childrenStyle,
					]}>
					{children}
				</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
}
