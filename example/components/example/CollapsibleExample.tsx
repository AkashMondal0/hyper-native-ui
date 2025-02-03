import React from "react";
import { ScrollView, Text, View } from "react-native";
import Collapsible from "../dev/Collapsible";
import { ThemedView, Image } from "hyper-native-ui";

const App = () => {
    const url = 'https://4kwallpapers.com/images/walls/thumbs_3t/19763.jpg'

    return (
        <ThemedView style={{ flex: 1, padding: 10 }}>
            <ScrollView>
                <Collapsible title={"Collapsible Animation Spring"} animationType="spring">
                    <Text style={{ padding: 16 }}>
                        Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique possimus consectetur eligendi nulla illum praesentium saepe pariatur.
                    </Text>
                </Collapsible>
                <View style={{ height: 10 }} />
                <Collapsible title={"Collapsible Animation Normal"} animationType="normal">
                    <Text style={{ padding: 16 }}>
                        Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique possimus consectetur eligendi nulla illum praesentium saepe pariatur.
                    </Text>
                </Collapsible>
                <View style={{ height: 10 }} />
                <Collapsible title={"Open Collapsible Image"}>
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
                    <Text style={{ padding: 16 }}>
                        Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique  ipsum dolor,
                        sit amet consectetur adipisicing elit. Reprehenderit,
                        magnam quis. Similique possimus consectetur eligendi nulla illum praesentium saepe pariatur.
                    </Text>
                </Collapsible>
            </ScrollView>
        </ThemedView>
    );
};

export default App;