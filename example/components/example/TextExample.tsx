import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme, Button, themeColors, Text } from 'hyper-native-ui';
const _variant = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];

export default function TextExampleDemo() {
    const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
    const [disabled, setDisabled] = React.useState(false);

    return (
        <ScrollView style={{
            flex: 1,
            padding: 10
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: currentTheme.background,
            }}>
                <Text variant="H5">
                    Text Example Demo
                </Text>
                <Text variant="H6">
                    Current theme: {themeName}
                </Text>
                <View style={{
                    height: 30
                }} />
                <Button onPress={toggleTheme}>
                    {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
                </Button>
                <Button onPress={() => setDisabled(!disabled)}>
                    {disabled ? 'Enabled' : 'Disabled'}
                </Button>
                <View style={{
                    height: 30
                }} />
                <Text variant="H4"
                    disable={disabled}
                    style={{
                        marginVertical: 20
                    }}>
                    Example
                </Text>
                {_variant.map((name, i) => {
                    return <Text variant={name} key={i} disable={disabled}>
                        {name}
                    </Text>
                })}

                <Text variant="H4" disable={disabled} style={{
                    marginVertical: 20
                }}>
                    Colors Example
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    {themeColors.map((color, i) => (
                        <View key={i} style={{
                            width: "50%",
                            padding: 10,
                        }}>
                            <Text center
                                disable={disabled}
                                variant="H6"
                                variantColor={color.name}>
                                {color.name}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>

    );
}