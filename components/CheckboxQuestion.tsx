import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxQuestionProps {
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

export default function CheckboxQuestion({
  label,
  options,
  selectedValues,
  onSelectionChange
}: CheckboxQuestionProps) {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter(item => item !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.checkboxOption}
          onPress={() => handleCheckboxChange(option.value)}
        >
          <View style={styles.checkbox}>
            {selectedValues.includes(option.value) && (
              <MaterialIcons name="check" size={16} color="#2563eb" />
            )}
          </View>
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 8,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
});