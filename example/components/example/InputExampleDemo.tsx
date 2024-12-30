import { View, Text } from 'react-native';
import React from 'react';
import { useTheme, Button, themeColors, Input } from 'hyper-native-ui';

export default function InputExampleDemo() {
    const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
    const [disabled, setDisabled] = React.useState(false);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: currentTheme.background,
        }}>
            <Text style={{
                color: currentTheme.foreground,
                fontSize: 24,
                marginBottom: 10,
                textAlign: 'center',
                padding: 20,
                fontWeight: 'bold',
            }}>
                Input Example Demo
            </Text>
            <Text style={{
                color: currentTheme.foreground,
                fontSize: 20,
                marginVertical: 10,
            }}>
                Current theme: {themeName}
            </Text>
            <Button onPress={toggleTheme}>
                {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
            </Button>
            <Button onPress={() => setDisabled(!disabled)}>
                {disabled ? 'Enabled' : 'Disabled'}
            </Button>
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
                        <Text style={{
                            color: currentTheme.foreground,
                            padding: 4
                        }}>
                            {color.name}
                        </Text>
                        <Input variant={color.name as any} disabled={disabled} />
                    </View>
                ))}
            </View>
        </View>
    );
}