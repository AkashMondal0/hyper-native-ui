import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'hyper-native-ui';
import ButtonExampleDemo from '@/components/ButtonExampleDemo';


export default function ButtonExample() {
  const { currentTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ButtonExampleDemo />
    </View>
  );
}