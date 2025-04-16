# React Native Components Library
<p align="center">
     <img src="https://raw.githubusercontent.com/AkashMondal0/hyper-native-ui/refs/heads/main/icon.png" height="250px" style="display:block"/>
</p>
<p align="center">Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable.</p>
<p align="center">
     <img src="https://raw.githubusercontent.com/AkashMondal0/hyper-native-ui/refs/heads/main/img.jpg"/>
     <img src="https://raw.githubusercontent.com/AkashMondal0/Snaapio/refs/heads/main/public/3.jpg"/>
     <img src="https://raw.githubusercontent.com/AkashMondal0/Snaapio/refs/heads/main/public/2.jpg"/>
     <img src="https://raw.githubusercontent.com/AkashMondal0/Snaapio/refs/heads/main/public/4.jpg"/>
</p>

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

## Author

- [Akash Mondal](https://akashmondal0.vercel.app)

## Support

if you are looking for a private support or help in customizing the experience, then reach out to me on Twitter [@akashmondal](https://x.com/akashmondal_1).

## License

[MIT](./LICENSE)