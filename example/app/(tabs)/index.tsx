import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'hyper-native-ui';
import CheckboxExampleDemo from '@/components/example/CheckboxExampleDemo';

export default function ImageExample() {
  const { currentTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <CheckboxExampleDemo />
      {/* <ImageExampleDemo /> */}
    </View>
  );
}