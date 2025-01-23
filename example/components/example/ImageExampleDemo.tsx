
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Image, useTheme } from 'hyper-native-ui';

export default function ImageExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme } = useTheme();
  const [touchable, setTouchable] = useState(false)
  const url = 'https://4kwallpapers.com/images/walls/thumbs_3t/19763.jpg'

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <Button onPress={() => toggleTheme()} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
      </Button>
      <Button onPress={() => { setTouchable(!touchable) }} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        Touchable {`${touchable}`}
      </Button>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 24,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold',
          gap: 10
        }}>
          Image Example Demo
        </Text>
        <Image
          isTouchableOpacity={touchable}
          width={200}
          height={200}
          borderRadius={30}
          src={url} />
        <View style={{ height: 20 }} />
        <Image
          isTouchableOpacity={touchable}
          width={280}
          height={380}
          borderRadius={30}
          src={url} />
        <View style={{ height: 20 }} />
        <Image
          isTouchableOpacity={touchable}
          width={380}
          height={380}
          borderRadius={30}
          src={url} />
      </View>
    </ScrollView>
  );
}