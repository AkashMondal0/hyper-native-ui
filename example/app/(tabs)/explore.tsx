import { ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from 'skysolo-ui';
import ButtonExampleDemo from '@/components/ButtonExampleDemo';

export default function ThemesExplore() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <ButtonExampleDemo/>
    </ScrollView>
  );
}