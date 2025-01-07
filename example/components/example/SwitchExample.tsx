import { Switch, Text, themeColors, Button, useTheme } from 'hyper-native-ui';
import React from 'react';
import { View } from 'react-native';

export default function SwitchExampleDemo() {
    const [value, setValue] = React.useState(false);
    const { currentTheme, toggleTheme, themeScheme } = useTheme();
    const [disabled, setDisabled] = React.useState(false);

    return (
        <View style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: currentTheme.background
        }}>
            <Button onPress={toggleTheme}>
                {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
            </Button>
            <Button onPress={() => setDisabled(!disabled)}>
                {disabled ? 'Enabled' : 'Disabled'}
            </Button>
            <Text variant="H4"
                style={{
                    marginVertical: 20
                }}>
                Example
            </Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 10
            }}>
                {themeColors.map((t, i) => {
                    return <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 30,
                        aspectRatio: 2 / 1,
                        justifyContent: 'center',
                        gap: 12,
                        width: 160,
                        borderColor: currentTheme.border,
                        borderWidth: 1,
                    }} key={i}>
                        <Text center>
                            {t.name}
                        </Text>
                        <Switch
                            disabled={disabled}
                            variant={t.name}
                            isChecked={value}
                            onValueChange={() => setValue(!value)} />
                    </View>
                })}
            </View>
        </View>
    );
}