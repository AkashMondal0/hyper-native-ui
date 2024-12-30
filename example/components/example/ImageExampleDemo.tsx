
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Image, useTheme } from 'hyper-native-ui';

export default function ImageExampleDemo() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
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
        }}>
          Image Example Demo
        </Text>
        <Image
          width={280}
          height={280}
          borderRadius={20}
          src='https://nypost.com/wp-content/uploads/sites/2/2021/02/gina-carano-03.jpg' />
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 24,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold',
        }}>
          Avatar Example Demo
        </Text>
        <Avatar
          size={180}
          src='https://nypost.com/wp-content/uploads/sites/2/2021/02/gina-carano-03.jpg' />
      </View>
    </ScrollView>
  );
}