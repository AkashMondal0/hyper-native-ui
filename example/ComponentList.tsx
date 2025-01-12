import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'hyper-native-ui';
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
    "StatusBarExample"
].sort()

export default function ComponentList() {
    const navigation = useNavigation();
    const { currentTheme } = useTheme();
    return (
        <ScrollView style={{
            padding: 20,
            backgroundColor: currentTheme.background
        }}>
            <Text variant="H4" center bold="bold">Component List</Text>
            {routes.map((route, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        activeOpacity={0.4}
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
        </ScrollView>
    );
}