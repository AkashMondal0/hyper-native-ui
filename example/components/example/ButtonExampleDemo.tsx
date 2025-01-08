import { View, Text } from 'react-native';
import React from 'react';
import { useTheme, Button, themeColors } from 'hyper-native-ui';

export default function ButtonExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
  const [loading, setLoading] = React.useState(false);
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
        Button Example Demo
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
      <Button onPress={() => setLoading(!loading)}>
        {loading ? 'Stop Loading' : 'Start Loading'}
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
            {/* @ts-ignore */}
            <Button variant={color.name} loading={loading} disabled={disabled}>
              {color.name}
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
}