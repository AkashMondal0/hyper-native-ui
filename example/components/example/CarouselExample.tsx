import React, { useState } from 'react';
import { ThemedView, Text, Carousel, Button } from 'hyper-native-ui';
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


const CarouselExample = () => {
    const [showNextPrevious, setShowNextPrevious] = useState(false)
    const [showIndexIndicator, setShowIndexIndicator] = useState(false)
    const [showIndexCounter, setShowIndexCounter] = useState(false)

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
                <View style={{ height: 10 }} />
                <Button onPress={() => setShowNextPrevious(!showNextPrevious)} width={"80%"} center>
                    ShowNextPrevious
                </Button>
                <View style={{ height: 10 }} />
                <Button onPress={() => setShowIndexIndicator(!showIndexIndicator)} width={"80%"} center>
                    showIndexIndicator
                </Button>
                <View style={{ height: 10 }} />
                <Button onPress={() => setShowIndexCounter(!showIndexCounter)} width={"80%"} center>
                    showIndexCounter
                </Button>
                <View style={{ height: 10 }} />
                <Text variant="H5" bold={"500"} center>
                    Carousel Example (Vertical)
                </Text>
                <Carousel
                    data={DATA}
                    isVertical
                    height={400}
                    showNextPrevious={showNextPrevious}
                    showIndexIndicator={showIndexIndicator}
                    showIndexCounter={showIndexCounter}
                />
                <View style={{ height: 20 }} />
                <Text variant="H5" bold={"500"} center>
                    Carousel Example (Horizontal)
                </Text>
                <Carousel
                    data={DATA}
                    height={250}
                    showNextPrevious={showNextPrevious}
                    showIndexIndicator={showIndexIndicator}
                    showIndexCounter={showIndexCounter}
                />
                <View style={{ height: 20 }} />
                <Text variant="H5" bold={"500"} center>
                    Carousel Example AutoPlay
                </Text>
                <Carousel
                    data={DATA}
                    height={250}
                    autoPlay={true}
                    showNextPrevious={showNextPrevious}
                    showIndexIndicator={showIndexIndicator}
                    showIndexCounter={showIndexCounter}
                />
            </ScrollView>
        </ThemedView>
    );
};
export default CarouselExample;