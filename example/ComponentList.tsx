import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, PressableButton, Text, useTheme } from 'hyper-native-ui';
import { useNavigation } from '@react-navigation/native';

const routes = [
    "AvatarExample",
    "ThemesExample",
    "ButtonExample",
    "SwitchExample",
    "InputExample",
    "CheckboxExample",
    "ImageExample",
    "ModalExample",
    "StatusBarExample",
    "DropdownMenuExample",
    "CarouselExample",
    "SkeletonExample",
    "RadioButtonExample",
    "CollapsibleExample",
    "TextLoaderExample",
    "ParallaxScrollViewExample",
    "DraggableViewExample",
    'PressableButtonExample'
].sort()
export default function ComponentList() {
    const navigation = useNavigation();
    const { currentTheme, toggleTheme } = useTheme();
    return (
        <ScrollView style={{
            padding: 30,
            backgroundColor: currentTheme.background
        }}>
            <Text variant="H4" center bold="bold">Component List</Text>
            <View style={{ height: 20 }} />
            <Button onPress={() => { toggleTheme() }}>
                toggle
            </Button>
            <View style={{ height: 20 }} />
            {routes.map((route, i) => {
                return (
                    <View key={i}>
                        <PressableButton
                            variant="outline"
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(route)}
                            style={{
                                height: 50,
                                borderWidth: 1,
                                borderRadius: 18,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            {route.replace("Example", "")}
                        </PressableButton>
                        <View style={{ height: 16 }} />
                    </View>)
            })}
            <View style={{ height: 50 }} />
        </ScrollView>
    );
}