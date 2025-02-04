import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ThemedView, Image, useTheme, Button, Collapsible } from "hyper-native-ui";

const CollapsibleExample = () => {
    const url = 'https://4kwallpapers.com/images/walls/thumbs_3t/19763.jpg'
    const { toggleTheme, themeScheme, currentTheme } = useTheme();

    return (
        <ThemedView style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                <Text style={{
                    color: currentTheme.foreground,
                    fontSize: 24,
                    marginBottom: 10,
                    textAlign: 'center',
                    padding: 20,
                    fontWeight: 'bold',
                }}>
                    Collapsible Example
                </Text>
                <View style={{ height: 20 }} />
                <Button onPress={() => toggleTheme()}>
                    {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
                </Button>
                <View style={{ height: 20 }} />
                <Collapsible
                    containerStyle={{
                        width: "60%"
                    }}
                    title={"Collapsible width 60%"} animationType="spring" variant="secondary">
                    Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur tium saepe pariatur.
                </Collapsible>
                <View style={{ height: 10 }} />
                <Collapsible title={"Collapsible Animation Normal"} variant="Rose" animationType="normal">
                    Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique possimus consectetur eligendi nulla illum praesentium saepe pariatur.
                </Collapsible>
                <View style={{ height: 10 }} />
                <Collapsible title={"Collapsible Image"}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Image
                            width={300}
                            height={300}
                            borderRadius={30}
                            src={url} />
                    </View>
                </Collapsible>
                <View style={{ height: 10 }} />
                <Collapsible title={"Collapsible"} animationType="spring">
                    Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique  ipsum dolor,
                    sit amet consectetur adipisicing elit. Reprehenderit,
                    magnam quis. Similique possimus consectetur eligendi nulla illum praesentium saepe pariatur.
                </Collapsible>
            </ScrollView>
        </ThemedView>
    );
};

export default CollapsibleExample;