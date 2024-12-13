import { View, Button, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme, themeColors } from 'skysolo-ui';

export default function ThemesExampleDemo() {
  const { currentTheme, changeTheme, toggleTheme } = useTheme();

  return (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 24,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold',
        }}>
          Themes Example Demo
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
        <Button title="Change Theme" onPress={toggleTheme} />
      </View>
  );
}