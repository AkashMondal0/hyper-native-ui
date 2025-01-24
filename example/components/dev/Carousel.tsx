import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, Dimensions, Image, ViewStyle, ImageProps, Text, Button } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TriggerComponent from './TriggerComponent';

const {
    width: FULL_ITEM_WIDTH,
    height: FULL_ITEM_HEIGHT,
} = Dimensions.get('window');

interface CarouselProps {
    data: { image: string, component?: ReactNode }[];
    containerStyle?: ViewStyle;
    itemStyle?: ViewStyle;
    imageProps?: ImageProps;
    nextPreviousContainerStyle?: ViewStyle;
    showNextPrevious?: boolean;
    nextButton?: ReactNode;
    previousButton?: ReactNode;
    width?: ViewStyle['width'];
    height?: ViewStyle['height'];
    spacing?: number;
    direction?: 'horizontal' | 'vertical';
    animationType?: 'scale' | 'opacity' | 'none';
    decelerationRate?: 'fast' | 'normal';
    isVertical?: boolean;
    visibleItemIndex?: (index: number) => void;
    visibleIndex?: number;
    borderRadius?: number;
    nestedScrollEnabled?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    autoPlayCounter?: number | 'infinite';
}

const Carousel: React.FC<CarouselProps> = ({
    data,
    containerStyle,
    itemStyle,
    imageProps,
    width = '100%',
    height = 600,
    spacing = 10,
    animationType = "scale",
    decelerationRate = 'normal',
    isVertical = false,
    showNextPrevious = true,
    visibleItemIndex,
    visibleIndex = 0,
    nextPreviousContainerStyle,
    nextButton,
    previousButton,
    borderRadius = 20,
    nestedScrollEnabled = true,
    autoPlay = false,
    autoPlayInterval = 5000,
    autoPlayCounter = 2,
}) => {
    const [currentIndex, setCurrentIndex] = useState(visibleIndex);
    const scrollViewRef = useRef<Animated.ScrollView>(null);
    const counterRef = useRef(0);

    const ptpWidth = (typeof width === 'string' && width.includes('%'))
        ? (parseFloat(width) / 100) * FULL_ITEM_WIDTH
        : (typeof width === 'number' ? width : FULL_ITEM_WIDTH);
    const ptpHeight = (typeof height === 'string' && height.includes('%'))
        ? (parseFloat(height) / 100) * FULL_ITEM_HEIGHT
        : (typeof height === 'number' ? height : FULL_ITEM_HEIGHT);

    const directionWH = isVertical ? ptpHeight : ptpWidth;

    const scroll = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (isVertical) {
                scroll.value = event.contentOffset.y;
            } else {
                scroll.value = event.contentOffset.x;
            }
        },
    });

    // detect visible index
    const onMomentumScrollEnd = (event: any) => {
        const offset = isVertical ? event.nativeEvent.contentOffset.y : event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / directionWH);
        setCurrentIndex(index);
        visibleItemIndex && visibleItemIndex(index);
    };
    // scroll to index
    const scrollToIndex = (index: number) => {
        if (scrollViewRef.current) {
            const offset = index * directionWH;
            if (isVertical) {
                scrollViewRef.current.scrollTo({ y: offset, animated: true });
            } else {
                scrollViewRef.current.scrollTo({ x: offset, animated: true });
            }
        }
    };

    const previous = () => scrollToIndex(Math.max(currentIndex - 1, 0));
    const next = () => scrollToIndex(Math.min(currentIndex + 1, data.length - 1));

    // auto play
    useEffect(() => {
        let interval: any;
        if (autoPlay) {
            interval = setInterval(() => {
                if (currentIndex < data.length - 1) {
                    next();
                } else {
                    clearInterval(interval);
                }
                counterRef.current++;
            }, autoPlayInterval);

            if (autoPlayCounter !== "infinite" && counterRef.current === autoPlayCounter) {
                clearInterval(interval);
            }
        }
        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = (item: { image: string }, index: number) => {
        return (
            <View key={index.toString()} style={{ width: "100%" }}>
                <Animated.View
                    style={[{
                        width: "100%",
                        marginHorizontal: "auto",
                        borderRadius,
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
                            borderRadius,
                        }}
                        {...imageProps}
                    />
                </Animated.View>
            </View>
        );
    };

    return (
        <>
            <View style={[{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "transparent",
                borderRadius,
                width,
                height,
            }, containerStyle]}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    nestedScrollEnabled={nestedScrollEnabled}
                    horizontal={!isVertical}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={directionWH}
                    decelerationRate={decelerationRate}
                    bounces={false}
                    onScroll={scrollHandler}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    scrollEventThrottle={6}
                >
                    {data.map((item, index) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            const inputRange = [
                                (index - 1) * directionWH,
                                index * directionWH,
                                (index + 1) * directionWH,
                            ];

                            const scale = interpolate(
                                scroll.value,
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
                                        width: ptpWidth,
                                        height: ptpHeight,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    animationType === "scale" && animatedStyle,
                                ]}
                            >
                                {renderItem(item, index)}
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>
                {/* NextPreviousContainer */}
                {showNextPrevious && !isVertical ? <View style={[{
                    flexDirection: 'row',
                    marginTop: 10,
                    position: "absolute",
                    width: "85%",
                    justifyContent: 'space-between',
                }, nextPreviousContainerStyle]}>
                    <TriggerComponent next={previous}>
                        {nextButton ? nextButton : <View>
                            <Button title="<" color={"black"} />
                        </View>}
                    </TriggerComponent>
                    <TriggerComponent next={next}>
                        {previousButton ? previousButton : <View>
                            <Button title=">" color={"black"} />
                        </View>}
                    </TriggerComponent>
                </View> : <></>}
                {showNextPrevious && isVertical ? <View style={[{
                    flexDirection: "column",
                    marginTop: 10,
                    position: "absolute",
                    height: "85%",
                    justifyContent: 'space-between',
                }, nextPreviousContainerStyle]}>
                    <TriggerComponent next={previous}>
                        {nextButton ? nextButton : <View style={{
                            transform: [{ rotate: "90deg" }]
                        }}>
                            <Button title="<" color={"black"} />
                        </View>}
                    </TriggerComponent>
                    <TriggerComponent next={next}>
                        {previousButton ? previousButton : <View style={{
                            transform: [{ rotate: "90deg" }]
                        }}>
                            <Button title=">" color={"black"} />
                        </View>}
                    </TriggerComponent>
                </View> : <></>}
            </View>
        </>
    );
};

export default Carousel;