import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    useTheme,
    themeColors,
    Text,
    Button,
    StatusBar,
} from 'hyper-native-ui';

export default function StatusBarExampleDemo() {
    const { currentTheme, toggleTheme, changeStatusBarColor } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: currentTheme.background,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {/* <StatusBar variant={color} themeScheme={themeScheme} /> */}
            <Text
                style={{
                    fontSize: 24,
                    marginBottom: 10,
                    textAlign: 'center',
                    padding: 20,
                    fontWeight: 'bold',
                }}>
                Themes Example Demo
            </Text>
            <StatusBar />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 10,
                }}>
                {themeColors?.map((color, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => {
                                changeStatusBarColor(color.name);
                            }}>
                            <View
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderColor: '#fff',
                                    borderWidth: 0.6,
                                    backgroundColor: color.light.primary,
                                    borderRadius: 16,
                                }}
                            />
                            <Text
                                style={{
                                    color: currentTheme.foreground,
                                    textAlign: 'center',
                                    padding: 10,
                                    fontFamily: 'SpaceMono',
                                    fontWeight: 'semibold',
                                    fontSize: 16,
                                }}>
                                {color.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Button
                onPress={() => {
                    toggleTheme();
                }}>
                Toggle Mode
            </Button>
            <Button
                onPress={() => {
                    changeStatusBarColor("default");
                }}>
                Default
            </Button>
        </View>
    );
}
