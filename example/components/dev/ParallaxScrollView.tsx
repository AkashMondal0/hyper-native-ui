import { ThemedView, useTheme } from 'hyper-native-ui';
import type { PropsWithChildren, ReactNode } from 'react';
import { Image, ImageProps, ImageStyle, ViewStyle } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
	imageUrl: string
	imageHeight?: number
	headerComponent?: ReactNode
	imageStyle?: ImageStyle
	imageProps?: ImageProps
	childrenStyle?: ViewStyle
}>;

export default function ParallaxScrollView({
	children,
	imageUrl,
	imageHeight = 500,
	headerComponent,
	imageStyle,
	imageProps,
	childrenStyle
}: Props) {
	const HEADER_HEIGHT = imageHeight;
	const { currentTheme } = useTheme();
	const scrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollOffset = useScrollViewOffset(scrollRef);
	const headerAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						scrollOffset.value,
						[-HEADER_HEIGHT, 0, HEADER_HEIGHT],
						[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
					),
				},
				{
					scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
				},
			],
		};
	});

	const HeaderComponent = () => {
		if (headerComponent) return headerComponent
		return <Image
			source={{ uri: imageUrl }}
			style={[{
				height: 500,
				width: '100%',
				bottom: 0,
				left: 0,
				position: 'absolute',
			}, imageStyle]} {...imageProps} />
	}

	return (
		<ThemedView style={{
			flex: 1,
		}}>
			<Animated.ScrollView
				ref={scrollRef}
				scrollEventThrottle={16}
				scrollIndicatorInsets={{ bottom: 0 }}
				contentContainerStyle={{ paddingBottom: 0 }}>
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
				<ThemedView style={[{
					flex: 1,
					padding: 32,
					gap: 16,
					overflow: 'hidden',
					borderRadius: 30
				}, childrenStyle]}>
					{children}
				</ThemedView>
			</Animated.ScrollView>
		</ThemedView>
	);
}
