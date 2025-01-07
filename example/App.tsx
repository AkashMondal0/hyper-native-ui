import React from 'react';
import { ScrollView } from 'react-native';
import { StatusBar, ThemeProvider, useTheme } from 'hyper-native-ui';
import SwitchExampleDemo from './components/example/SwitchExample';
import InputExampleDemo from './components/example/InputExampleDemo';
import ButtonExampleDemo from './components/example/ButtonExampleDemo';
import CheckboxExampleDemo from './components/example/CheckboxExampleDemo';
import ImageExampleDemo from './components/example/ImageExampleDemo';
import AvatarExampleDemo from './components/example/AvatarExampleDemo';
import ThemesExampleDemo from './components/example/ThemesExampleDemo';
import ModalExampleDemo from './components/example/ModalExample';

const App = () => {
  const { currentTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <ThemesExampleDemo />
      <SwitchExampleDemo />
      <ModalExampleDemo />
      <InputExampleDemo />
      <ButtonExampleDemo />
      <CheckboxExampleDemo />
      <ImageExampleDemo />
      <AvatarExampleDemo />
    </ScrollView>
  );
}
export default function InitializedApp() {
  return (
    <ThemeProvider>
      <StatusBar />
      <App />
    </ThemeProvider>
  );
}