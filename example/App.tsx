import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation, DefaultTheme, useNavigation } from "@react-navigation/native";
import { StatusBar, ThemeProvider, useTheme, StatusBarHeight, Text, Button } from 'hyper-native-ui';

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
import CarouselExample from './components/example/CarouselExample';
import SkeletonExample from './components/example/SkeletonExample';
import RadioButtonExampleDemo from './components/example/RadioButtonExampleDemo';
import CollapsibleExample from './components/example/CollapsibleExample';
import ParallaxScrollViewExample from './components/example/ParallaxImageScrollExample';
import TextLoaderExample from './components/example/TextLoaderExample';
import DraggableViewExample from './components/example/DraggableViewExample';
import PressableButtonExample from './components/example/PressableButtonExample';

const options = {
  contentStyle: {
    flex: 1
  },
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    header: ({ route: { name } }) => <AppHeader title={name} />,
    // headerShown: false
  },
  screens: {
    Home: {
      screen: ComponentList,
      options: { headerShown: false, ...options }
    },
    DraggableViewExample: {
      screen: DraggableViewExample,
      options: { headerShown: false, ...options }
    },
    PressableButtonExample: {
      screen: PressableButtonExample,
      options: { headerShown: false, ...options }
    },
    RadioButtonExample: {
      screen: RadioButtonExampleDemo,
      options
    },
    TextLoaderExample: {
      screen: TextLoaderExample,
      options
    },
    CollapsibleExample: {
      screen: CollapsibleExample,
      options
    },
    ParallaxScrollViewExample: {
      screen: ParallaxScrollViewExample,
      options
    },
    SkeletonExample: {
      screen: SkeletonExample,
      options
    },
    CarouselExample: {
      screen: CarouselExample,
      options
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
  const { currentTheme } = useTheme();

  const background = currentTheme.background;
  const theme: any = {
    ...DefaultTheme,
    colors: {
      background: background,
      border: currentTheme.border,
      card: currentTheme.card,
      notification: currentTheme.destructive,
      primary: currentTheme.primary,
      text: currentTheme.foreground
    }
  };

  return <>
    <StatusBar translucent />
    <StatusBarHeight />
    <Navigation theme={theme} />
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
      top: 0,
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