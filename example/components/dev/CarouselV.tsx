import React, { ReactNode } from 'react';
import { View, Dimensions, Image, ViewStyle, ImageProps } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const {
    width: FULL_ITEM_WIDTH,
    height: FULL_ITEM_HEIGHT,
} = Dimensions.get('window');

interface CarouselProps {
    data: { image: string, component?: ReactNode }[];
    containerStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    imageProps?: ImageProps;
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    borderRadius?: number;
    spacing?: number;
    direction?: 'horizontal' | 'vertical';
    animationType?: 'scale' | 'opacity' | 'none';
    decelerationRate?: 'fast' | 'normal';
}

const CarouselVertical: React.FC<CarouselProps> = ({ data,
    containerStyle,
    itemStyle,
    imageProps,
    width = '100%',
    height = '40%',
    spacing = 10,
    animationType = 'none',
    decelerationRate = 'normal',
}) => {
    const percentageToPixelWidth = (typeof width === 'string' && width.includes('%'))
        ? (parseFloat(width) / 100) * FULL_ITEM_WIDTH
        : (100 / 100) * FULL_ITEM_WIDTH;
    const percentageToPixelHeight = (typeof height === 'string' && height.includes('%'))
        ? (parseFloat(height) / 100) * FULL_ITEM_HEIGHT
        : (30 / 100) * FULL_ITEM_HEIGHT;

    const scrollX = useSharedValue(0);
    const scrollY = useSharedValue(0);


    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const renderItem = (item: { image: string }, index: number) => {
        return (
            <View key={index.toString()} style={{ width: "100%" }}>
                <Animated.View
                    style={[{
                        width: "100%",
                        marginHorizontal: "auto",
                        borderRadius: 20,
                        padding: spacing,
                        overflow: 'hidden',
                    }, itemStyle]}
                >
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                            borderRadius: 20
                        }}
                        {...imageProps}
                    />
                </Animated.View>
            </View>
        );
    };

    return (
        <>
            <GestureHandlerRootView style={[{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "transparent",
                width: '100%',
                height: '40%',
            }, containerStyle]}>
                <Animated.ScrollView
                    snapToInterval={percentageToPixelHeight}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={decelerationRate}
                    bounces={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                >
                    {data.map((item, index) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            const inputRange = [
                                (index - 1) * percentageToPixelHeight,
                                index * percentageToPixelHeight,
                                (index + 1) * percentageToPixelHeight,
                            ];

                            const scale = interpolate(
                                scrollY.value,
                                inputRange,
                                [0.8, 1, 0.8],
                                Extrapolate.CLAMP
                            );

                            return {
                                transform: [{ scale }],
                            };
                        });

                        return (
                            <Animated.View
                                key={index.toString()}
                                style={[
                                    {
                                        width: percentageToPixelWidth,
                                        height: percentageToPixelHeight,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    animatedStyle,
                                ]}
                            >
                                {renderItem(item, index)}
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>
            </GestureHandlerRootView>
        </>
    );
};

export default CarouselVertical;