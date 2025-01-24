import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Text, useTheme } from 'hyper-native-ui';
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
                    <TouchableOpacity
                        key={i}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate(route)}
                        style={{
                            height: 60,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: currentTheme.border,
                            borderRadius: 18,
                            marginVertical: 10,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text variant="H6" bold={"semibold"}>{route.replace("Example", "")}</Text>
                    </TouchableOpacity>)
            })}
            <View style={{ height: 50 }} />
        </ScrollView>
    );
}