import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'hyper-native-ui';
import ButtonExampleDemo from '@/components/ButtonExampleDemo';
import InputExampleDemo from '@/components/InputExampleDemo';


export default function ButtonExample() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        backgroundColor: currentTheme.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      }}>
        <ButtonExampleDemo />
        <InputExampleDemo />
      </View>
    </ScrollView>
  );
}