import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme, themeColors, Button } from 'hyper-native-ui';

export default function ThemesExampleDemo() {
  const { currentTheme, changeTheme, toggleTheme, currentColorScheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <Text style={{
        color: currentTheme.foreground,
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
      }}>
        Themes Example Demo
      </Text>
      <Text style={{
        color: currentTheme.foreground,
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
      }}>
        {currentColorScheme}
      </Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
      }}>
        {themeColors?.map((color, index) => {
          return <TouchableOpacity key={index}
            activeOpacity={0.8}
            onPress={() => changeTheme(color.name as any)}>
            <View style={{
              width: 100,
              height: 100,
              borderColor: "#fff",
              borderWidth: 0.6,
              backgroundColor: color.light.primary,
              borderRadius: 16,
            }} />
            <Text style={{
              color: currentTheme.foreground,
              textAlign: 'center',
              padding: 10,
              fontFamily: "SpaceMono",
              fontWeight: "semibold",
              fontSize: 16,
            }}>{color.name}</Text>
          </TouchableOpacity>
        })}
      </View>
      <Button onPress={() => toggleTheme()} width={"80%"} center>
        Toggle Mode
      </Button>
      <View style={{ height: 10 }} />
      <Button onPress={() => {
        toggleTheme("system")
      }} width={"80%"} center>
        System
      </Button>
    </ScrollView>
  );
}