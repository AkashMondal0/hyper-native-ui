import { View, Text, Button } from 'react-native';
import React from 'react';
import { useTheme } from 'skysolo-x';

export default function HomeScreen() {
  const { currentTheme, toggleTheme } = useTheme();
  const changeTheme = () => {
    toggleTheme()
  }
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.background,
    }}>
      <Button title="Change Theme" onPress={changeTheme} />
    </View>
  );
}