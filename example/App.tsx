// import React from 'react';
// import { ScrollView } from 'react-native';
// import { StatusBar, ThemeProvider, useTheme } from 'hyper-native-ui';
// import SwitchExampleDemo from './components/example/SwitchExample';
// import InputExampleDemo from './components/example/InputExampleDemo';
// import ButtonExampleDemo from './components/example/ButtonExampleDemo';
// import CheckboxExampleDemo from './components/example/CheckboxExampleDemo';
// import ImageExampleDemo from './components/example/ImageExampleDemo';
// import AvatarExampleDemo from './components/example/AvatarExampleDemo';
// import ThemesExampleDemo from './components/example/ThemesExampleDemo';
// import ModalExampleDemo from './components/example/ModalExample';

// const App = () => {
//   const { currentTheme } = useTheme();

//   return (
//     <ScrollView style={{
//       flex: 1,
//       backgroundColor: currentTheme.background,
//     }}>
//       <ThemesExampleDemo />
//       <SwitchExampleDemo />
//       <ModalExampleDemo />
//       <InputExampleDemo />
//       <ButtonExampleDemo />
//       <CheckboxExampleDemo />
//       <ImageExampleDemo />
//       <AvatarExampleDemo />
//     </ScrollView>
//   );
// }
// export default function InitializedApp() {
//   return (
//     <ThemeProvider>
//       <StatusBar />
//       <App />
//     </ThemeProvider>
//   );
// }

import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, ThemeProvider } from 'hyper-native-ui';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function Details() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}
function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: Details,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TopBar />
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const TopBar = () => {
  const insets = useSafeAreaInsets();
  return <StatusBar safeAreaTopPadding={insets.top} />
}