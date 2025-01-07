import { StatusBar, ThemeProvider, useTheme } from 'hyper-native-ui';
import React from 'react';
import { View } from 'react-native';
import TextExampleDemo from './components/example/TextExample';

const App = () => {
  const { currentTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <TextExampleDemo />
      {/* <ModalExampleDemo /> */}
      {/* <InputExampleDemo /> */}
      {/* <CheckboxExampleDemo /> */}
      {/* <ImageExampleDemo /> */}
      {/* <AvatarExampleDemo /> */}
    </View>
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