import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme, Button, Dropdown } from 'hyper-native-ui';

export default function DropdownMenuExampleDemo() {
    const { toggleTheme, themeScheme, currentTheme } = useTheme();

    const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
        { label: 'Option 5', value: '5' },

    ];

    const handleSelect = (item: any) => {
        console.log('Selected:', item);
    };
    return (
        <ScrollView style={{
            padding: 10,
            backgroundColor: currentTheme.background
        }}>
            <Button onPress={() => toggleTheme()} width={"80%"} center>
                {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
            </Button>
            <View style={{ height: 20 }} />
            <Dropdown
                data={options}
                onSelect={handleSelect}
            />
        </ScrollView>
    );
}