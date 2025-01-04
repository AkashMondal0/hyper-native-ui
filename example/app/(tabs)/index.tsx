import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'hyper-native-ui';

export default function ImageExample() {
  const { currentTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      {/* <InputExampleDemo /> */}
      {/* <CheckboxExampleDemo /> */}
      {/* <ImageExampleDemo /> */}
      {/* <AvatarExampleDemo /> */}
    </View>
  );
}