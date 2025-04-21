
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar, Button, themeColors, useTheme } from 'hyper-native-ui';

export default function AvatarExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme } = useTheme();
  const [touchable, setTouchable] = useState(false);
  const [url, setUrl] = useState("");

  const changeUrl = () => {
    setUrl(`https://picsum.photos/300/300?random=${Date.now()}`);
  };

  useEffect(() => {
    changeUrl();
  }, []);

  return (
    <ScrollView style={{
      flex: 1,
      padding: 5,
      backgroundColor: currentTheme.background
    }}>
      <Button onPress={() => toggleTheme()} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
      </Button>
      <Button onPress={() => { setTouchable(!touchable) }} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        Touchable {`${touchable}`}
      </Button>
      <Button onPress={() => changeUrl()} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        Change Avatar
      </Button>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 20,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: "500",
        }}>
          Avatar Size Example
        </Text>
        <View style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Avatar
            isTouchableOpacity={touchable}
            size={40}
            src={url} />
          <Avatar
            isTouchableOpacity={touchable}
            size={80}
            src={url} />
          <Avatar
            isTouchableOpacity={touchable}
            size={120}
            src={url} />
          <Avatar
            isTouchableOpacity={touchable}
            size={160}
            src={url} />
        </View>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 20,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: "500",
        }}>
          Avatar Border Variant Example
        </Text>
        <View style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}>
          {themeColors.map((color, i) => (
            <View key={i} style={{
              width: "50%",
              padding: 10,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Avatar
                // @ts-ignore
                borderVariant={color.name}
                borderWidth={2}
                isTouchableOpacity={touchable}
                size={100}
                src={url} />
              <Text style={{
                color: currentTheme.foreground,
                textAlign: "center",
                padding: 6,
                fontSize: 18,
                fontWeight: "500"
              }}>
                {color.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}