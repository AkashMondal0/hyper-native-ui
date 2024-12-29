
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'hyper-native-ui';
import ButtonExampleDemo from '@/components/ButtonExampleDemo';
import InputExampleDemo from '@/components/InputExampleDemo';
import Image from '@/components/hyperui/Image'
import SkySoloCheckBox from '@/components/hyperui/CheckBox';
import Avatar from '@/components/hyperui/Avatar';

export default function ButtonExample() {
  const { currentTheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <Avatar
        size={180}
        src='https://nypost.com/wp-content/uploads/sites/2/2021/02/gina-carano-03.jpg' />
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      }}>
        {/* <SkySoloCheckBox variant={"Rose"} /> */}

        {/* <ButtonExampleDemo /> */}
        {/* <InputExampleDemo /> */}
      </View>
    </ScrollView>
  );
}