# Shadrn Ui - React Native Ui Library

Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.

## Installation
```sh
npm install shadrn-ui
```

## Provider
```js
import { ThemeProvider } from 'shadrn-ui';
import HomeScreen from '@app/HomeScreen';

export default function App() {
  return (
  <ThemeProvider>
    <HomeScreen/>
  <ThemeProvider>
  );
}
```
## Usage
```js
import { View, Text, Button } from 'react-native';
import React from 'react';
import { useTheme } from 'shadrn-ui';

export default function HomeScreen() {
  const { currentTheme, toggleTheme, themeScheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.background,
    }}>
      <Button onPress={toggleTheme}>
        {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
      </Button>
    </View>
  );
}
```

---

## Features
- Support `React Navigation` Integration, [read more]().
- Compatible with `Expo`.
- Accessibility support.
- Written in `TypeScript`.
- [Read more](https://shadrn-ui.vercel.app/feature).

## Getting Started

Check out [the documentation website](https://shadrn-ui.vercel.app).

## Author

- [Akash Mondal](https://akashmondal0.vercel.app)

## Support

if you are looking for a private support or help in customizing the experience, then reach out to me on Twitter [@akashmondal](https://x.com/akashmondal_1).

## License

[MIT](./LICENSE)