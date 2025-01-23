import React from 'react';
import Carousel from '../dev/Carousel';
import { ThemedView, Text } from 'hyper-native-ui';
import { ScrollView, View } from 'react-native';

const DATA = [
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19102.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/5120.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/6156.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/17992.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/12848.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/7063.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/3794.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/4577.jpg' },
    { image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19763.jpg' },
];

const visibleItemIndex = (index: number) => {
    // console.log(index);
}

const CarouselExample = () => {

    return (
        <ThemedView style={{
            flex: 1,
            width: '100%',
            height: '100%',
        }}>
            <ScrollView style={{
                flex: 1,
                width: '100%',
            }}>
                <Text variant="H5" bold={"500"} center>
                    Carousel Example (Horizontal)
                </Text>
                <Carousel
                    data={DATA}
                    height={250}
                    visibleItemIndex={visibleItemIndex}
                />
                <View style={{ height: 20 }} />
                <Text variant="H5" bold={"500"} center>
                    Carousel Example (Vertical)
                </Text>
                <Carousel
                    data={DATA}
                    isVertical
                    height={400}
                    visibleItemIndex={visibleItemIndex}
                />
            </ScrollView>
        </ThemedView>
    );
};
export default CarouselExample;