import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import 'react-native-reanimated';
import { ThemeProvider, useTheme } from 'skysolo-x';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

const ThemedStatusBar = () => {
  const { themeScheme, currentTheme } = useTheme();
  const insets = useSafeAreaInsets();
  return (<>
    <View style={{ paddingTop: insets.top }} />
    <StatusBar barStyle={themeScheme === "dark" ? "light-content" : "dark-content"}
      backgroundColor={currentTheme.background} />
  </>)
}