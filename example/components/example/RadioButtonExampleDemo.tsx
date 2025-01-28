import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useTheme, Button } from 'hyper-native-ui';
import RadioButton from '../dev/RadioButton';
import BouncyCheckbox from '../dev/Checkbox';

export default function RadioButtonExampleDemo() {
  const { currentTheme, toggleTheme, themeScheme, themeName } = useTheme();
  const [disabled, setDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>("option2");

  // Handle the selection change
  const handleSelect = (value: string | number) => {
    setSelectedOption(value);
    console.log("Selected option:", value);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = (newSelection: boolean) => {
    setIsChecked(newSelection);
    console.log("Checkbox is now", newSelection ? "checked" : "unchecked");
  }

  // Define the options
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4", disabled: true },
    { label: "Option 5", value: "option5" },
  ];
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: currentTheme.background
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 24,
          marginBottom: 10,
          textAlign: 'center',
          padding: 20,
          fontWeight: 'bold',
        }}>
          RadioButton Example
        </Text>
        <Text style={{
          color: currentTheme.foreground,
          fontSize: 20,
          marginVertical: 10,
          textAlign: 'center',
        }}>
          Current theme: {themeName}
        </Text>
        <Button onPress={() => toggleTheme()}>
          {`Switch to ${themeScheme === 'light' ? 'Dark' : 'Light'} mode`}
        </Button>
        <Button onPress={() => setDisabled(!disabled)}>
          {disabled ? 'Enabled' : 'Disabled'}
        </Button>
        {/*  */}
        <RadioButton
          options={options}
          selectedValue={selectedOption}
          onSelect={handleSelect}
          size={26}
          variant="default"
          animationDuration={400}
        />
        <BouncyCheckbox
          label="Agree to Terms"
          isSelected={isChecked}
          onToggle={handleCheckboxToggle}
          size={30}
          // radius={20}
          disabled={disabled}
          variant="default"
        />
      </View>
    </ScrollView>
  );
}