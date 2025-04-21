import React from 'react';
import { View, Text } from 'react-native';
import { useTheme, PressableButton, PressableView } from 'hyper-native-ui';

export default function PressableButtonExample() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PressableButton
        variant="default"
        // loading={true}
        onPress={() => toggleTheme()}
        style={{ borderRadius: 16, paddingHorizontal: 30 }}>
        click me
      </PressableButton>
      <View style={{ height: 20 }} />
      <PressableView
        radius={20}
        style={{
          borderWidth: 1,
          width: 200,
          height: 200,
        }}>
        Akash
      </PressableView>
    </View>
  );
}