
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, useTheme, Text, TextLoader } from 'hyper-native-ui';

export default function TextLoaderExample() {
  const { currentTheme, toggleTheme, themeScheme } = useTheme();

  return (
    <ScrollView style={{
      flex: 1,
      padding: 5,
      backgroundColor: currentTheme.background
    }}>
      <Button onPress={() => toggleTheme()} style={{ width: "80%", marginHorizontal: "auto", marginVertical: 10 }}>
        {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
      </Button>
      <Text variant="H5" center style={{ marginVertical: 20 }} bold={"600"}>
        Variant Rose, Speed 30, H6
      </Text>
      <View style={{
        borderColor: currentTheme.input,
        borderBottomWidth: 1,
        width: "80%",
        margin: "auto"
      }} />
      <TextLoader text={tx} speed={30} variant="H6" variantColor="Rose" />
      <Text variant="H5" center style={{ marginVertical: 20 }} bold={"600"}>
        Variant Stone, Speed 60, H5
      </Text>
      <View style={{
        borderColor: currentTheme.input,
        borderBottomWidth: 1,
        width: "80%",
        margin: "auto"
      }} />
      <TextLoader text={tx} speed={60} variant="H5" variantColor="Stone" />
      <Text variant="H5" center style={{ marginVertical: 20 }} bold={"600"}>
        Variant Stone, Speed 100, body1
      </Text>
      <View style={{
        borderColor: currentTheme.input,
        borderBottomWidth: 1,
        width: "80%",
        margin: "auto"
      }} />
      <TextLoader text={tx} speed={100} variant="body1" variantColor="Stone" />
    </ScrollView >
  );
}


const tx = `Waaqif toh huye tere dil ki baat se
Chhupaya jise tune qaaynaat se
Waaqif toh huye tere us khayal se
Chhupaya jise tune apne aap se
Kahin na kahin teri aankhein
Teri baatein padh rahe hai hum
Kahin na kahin tere dil mein
Dhadkanon mein dhal rahe hain hum

Tu har lamha tha mujhse juda
Chaahe door tha main ya pas raha

Uss din tu haan udaas rahe
Tujhe jis din hum na dikhe na mile
Us din tu chup-chap rahe
Tujhe jis din kuch na kahe na sune

Main hu ban chuka jeene ki ik wajah
Iss baat ko khud se tu na chhupa
Tu har lamha tha mujhse judaa
Chaahe door tha main ya pas raha

Lab se bhale tu kuch na kahe
Tere dil mein humi toh base ya rahe
Saansein teri ikraar kare
Tera haath agar chhu le pakde
Teri khwahisyein kar bhi de tu bayaan
Yahi waqt hai inke izhaar ka

Tu har lamha tha mujhse juda
Chahe door tha main ya paas raha`;