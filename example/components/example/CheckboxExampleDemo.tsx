import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme, Button, themeColors, CheckBox } from 'hyper-native-ui';

export default function CheckboxExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
  const [disabled, setDisabled] = React.useState(false);

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
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
        <Button onPress={() => toggleTheme()}>
          {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
        </Button>
        <Button onPress={() => setDisabled(!disabled)}>
          {disabled ? 'Enabled' : 'Disabled'}
        </Button>
        <CheckboxExample2 />
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
              activeOpacity={0.8}
              style={{
                width: "48%",
                padding: 10,
                borderWidth: 1,
                borderRadius: 20,
                // borderColor: isChecked.name === color.name ? currentTheme.primary : currentTheme.border,
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
                <CheckboxExample disabled={disabled} name={color.name} size={30} />

                <Text style={{
                  color: currentTheme.foreground,
                  fontSize: 16,
                  marginVertical: 4
                }}>
                  medium
                </Text>
                <CheckboxExample disabled={disabled} name={color.name} size={40} />

                <Text style={{
                  color: currentTheme.foreground,
                  fontSize: 16,
                  marginVertical: 4,
                }}>
                  large
                </Text>
                <CheckboxExample disabled={disabled} name={color.name} size={60} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}


const CheckboxExample = (
  { name, size, disabled }: { name: string, size: number, disabled: boolean }
) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = (newSelection: boolean) => {
    setIsChecked(newSelection);
    console.log("Checkbox is now", newSelection ? "checked" : "unchecked");
  };

  return (
    <CheckBox
      // label="Agree to Terms"
      disabled={disabled}
      isSelected={isChecked}
      onToggle={handleCheckboxToggle}
      size={size}
      radius={50}
      variant={name as any}
    />
  )
}

const CheckboxExample2 = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = (newSelection: boolean) => {
    setIsChecked(newSelection);
    console.log("Checkbox is now", newSelection ? "checked" : "unchecked");
  };

  return (
    <CheckBox
      label="Agree to Terms"
      isSelected={isChecked}
      onToggle={handleCheckboxToggle}
      size={30}
      variant={"default"}
    />
  )
}