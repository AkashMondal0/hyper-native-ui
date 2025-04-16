# React Native Components Library
<p align="center">
     <img src="https://raw.githubusercontent.com/AkashMondal0/hyper-native-ui/refs/heads/main/public/icon.png" height="250px" style="display:block"/>
</p>
<p align="center">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.</p>

### Installation
```sh
npm install hyper-native-ui
```

## Provider
```js
// app.tsx
import React from 'react';
import { View } from 'react-native';
import { useTheme, Button, ThemeProvider } from 'hyper-native-ui';

export default function App() {
  return (
  <ThemeProvider>
    <ButtonExample/>
  </ThemeProvider>
  );
}

// Usage - Button example
function ButtonExample() {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <View style={{
      flex: 1,
      backgroundColor: currentTheme.background,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Button onPress={()=>toggleTheme()}>
        This is a Button
      </Button>
    </View>
  );
}
```
## Features
- Support `React Navigation` Integration, [read more]().
- Compatible with `Expo`.
- Accessibility support.
- Written in `TypeScript`.
- [Read more](https://hyper-native-ui.vercel.app).

## Getting Started

Check out [the documentation website](https://hyper-native-ui.vercel.app).

## Examples
<p align="center">
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e1.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e2.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e3.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e4.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e5.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e6.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e7.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e8.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e9.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e10.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e11.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e13.gif?raw=true" height="500px" />
    <img src="https://github.com/AkashMondal0/hyper-native-ui/blob/main/public/e12.jpg?raw=true" height="500px" />
</p>

## Author

- [Akash Mondal](https://akashmondal0.vercel.app)

## Support

if you are looking for a private support or help in customizing the experience, then reach out to me on Twitter [@akashmondal](https://x.com/akashmondal_1).

## License

[MIT](./LICENSE)