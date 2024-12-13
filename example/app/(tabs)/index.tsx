import { ScrollView } from 'react-native';
import React from 'react';
import { useTheme } from 'skysolo-ui';
import ThemesExampleDemo from '@/components/ThemesExampleDemo';

export default function HomeScreen() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <ThemesExampleDemo />
    </ScrollView>
  );
}