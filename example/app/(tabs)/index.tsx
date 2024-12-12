import { View, Button, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { useTheme, themeColors } from 'skysolo-x';

export default function HomeScreen() {
  const { currentTheme, changeTheme, toggleTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: 24,
          margin: 10,
          marginVertical: 20,
        }}>
          Theme Example
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
    </ScrollView>
  );
}