import { View, Text, Button } from 'react-native';
import React from 'react';
import { useTheme } from 'skysolo-x';

export default function HomeScreen() {
  const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.background,
    }}>
      <Text style={{ 
        color: currentTheme.foreground,
        fontSize: 20,
        marginVertical: 10,
        }}>
        Current theme: {themeName}
      </Text>
      <Button title={`switch to ${themeScheme === 'light' ? 'dark' : 'light'} mode`}
        onPress={toggleTheme} />
    </View>
  );
}