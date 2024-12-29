import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, Button, themeColors, CheckBox } from 'hyper-native-ui';

export default function CheckboxExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
  const [disabled, setDisabled] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState({
    check: false,
    name: "NID"
  });

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background,
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 24,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold',
        }}>
          Checkbox Example Demo
        </Text>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 16,
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
          padding: 5,
          gap: 5
        }}>
          {themeColors.map((color, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setIsChecked({
                  name: color.name,
                  check: !isChecked.check
                })
              }}
              activeOpacity={0.8}
              style={{
                width: "48%",
                padding: 10,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: isChecked.name === color.name ? currentTheme.primary : currentTheme.border,
              }}>
              <Text style={{
                color: currentTheme.foreground,
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center"
              }}>
                {color.name}
              </Text>
              <View style={{
              }}>
                <Text style={{
                  color: currentTheme.foreground,
                  fontSize: 16,
                  marginVertical: 4,
                }}>
                  small
                </Text>
                <CheckBox variant={color.name}
                  isChecked={isChecked.name === color.name ? true : false}
                  size={25}
                  disabled={disabled} />
                <Text style={{
                  color: currentTheme.foreground,
                  fontSize: 16,
                  marginVertical: 4
                }}>
                  medium
                </Text>
                <CheckBox variant={color.name}
                  size={40}
                  isChecked={isChecked.name === color.name ? true : false}
                  disabled={disabled} />
                <Text style={{
                  color: currentTheme.foreground,
                  fontSize: 16,
                  marginVertical: 4,
                }}>
                  large
                </Text>
                <CheckBox variant={color.name}
                  isChecked={isChecked.name === color.name ? true : false}
                  size={60}
                  disabled={disabled} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}