import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme, Button, Text, Modal } from 'hyper-native-ui';

export default function ModalExampleDemo() {
    const { toggleTheme, themeScheme, themeName,currentTheme } = useTheme();
    const [visible, setVisible] = React.useState(false);

    return (
        <ScrollView style={{
            padding: 10,
            backgroundColor:currentTheme.background
        }}>
            <Button onPress={() => setVisible(true)} center>
                Show Modal
            </Button>
            <Modal
                modalVisible={visible}
                setModalVisible={setVisible}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Text variant="H5">
                        Modal Example Demo
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
                    <Button onPress={() => setVisible(false)}>
                        Close Modal
                    </Button>
                </View>
            </Modal>
        </ScrollView>
    );
}