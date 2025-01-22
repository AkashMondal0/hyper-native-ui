import React from 'react';
import { ScrollView, View } from 'react-native';
import { createStaticNavigation, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, ThemeProvider, useTheme, Text, Button } from 'hyper-native-ui';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

// pages
import SwitchExampleDemo from './components/example/SwitchExample';
import InputExampleDemo from './components/example/InputExampleDemo';
import ButtonExampleDemo from './components/example/ButtonExampleDemo';
import CheckboxExampleDemo from './components/example/CheckboxExampleDemo';
import ImageExampleDemo from './components/example/ImageExampleDemo';
import AvatarExampleDemo from './components/example/AvatarExampleDemo';
import ThemesExampleDemo from './components/example/ThemesExampleDemo';
import ModalExampleDemo from './components/example/ModalExample';
import ComponentList from './ComponentList';
import StatusBarExampleDemo from './components/example/StatusBarExampleDemo';
import DropdownMenuComponent from './components/example/DropdownMenuExampleDemo';

const options = {
  contentStyle: {
    flex: 1
  },
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    header: ({ route: { name } }) => <AppHeader title={name} />,
  },
  screens: {
    Home: {
      screen: ComponentList,
      options: { headerShown: false, ...options }
    },
    DropdownMenuExample: {
      screen: DropdownMenuComponent,
      options
    },
    ThemesExample: {
      screen: ThemesExampleDemo,
      options
    },
    SwitchExample: {
      screen: SwitchExampleDemo,
      options
    },
    InputExample: {
      screen: InputExampleDemo,
      options
    },
    ModalExample: {
      screen: ModalExampleDemo,
      options
    },
    ButtonExample: {
      screen: ButtonExampleDemo,
      options
    },
    CheckboxExample: {
      screen: CheckboxExampleDemo,
      options
    },
    ImageExample: {
      screen: ImageExampleDemo,
      options
    },
    AvatarExample: {
      screen: AvatarExampleDemo,
      options
    },
    StatusBarExample: {
      screen: StatusBarExampleDemo,
      options
    },
  },
});
const Navigation = createStaticNavigation(RootStack);

const App = () => {
  const paddingTop = useSafeAreaInsets();

  return <>
    <StatusBar topPadding={paddingTop.top} />
    <Navigation />
  </>
};

export default function InitializedApp() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const AppHeader = ({ title }: { title: string }) => {
  const { currentTheme } = useTheme();
  const navigation = useNavigation();

  return (<ScrollView>
    <View style={[{
      width: '100%',
      height: 55,
      borderColor: currentTheme?.border,
      borderBottomWidth: 0.8,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: currentTheme.background
    }]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
      }}>
        <Button onPress={() => {
          navigation.goBack()
        }}>
          back
        </Button>
        <Text variant="H6" bold={"semibold"}>
          {title}
        </Text>
      </View>
    </View>
  </ScrollView>)
}