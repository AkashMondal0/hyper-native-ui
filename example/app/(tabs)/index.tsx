import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'hyper-native-ui';
// import CheckboxExampleDemo from '@/components/example/CheckboxExampleDemo';
import InputExampleDemo from '@/components/example/InputExampleDemo';

export default function ImageExample() {
  const { currentTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <InputExampleDemo />
      {/* <CheckboxExampleDemo /> */}
      {/* <ImageExampleDemo /> */}
    </View>
  );
}