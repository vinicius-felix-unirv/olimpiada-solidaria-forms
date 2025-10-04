import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioQuestionProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
}

export default function RadioQuestion({
  label,
  options,
  selectedValue,
  onSelectionChange
}: RadioQuestionProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioOption}
          onPress={() => onSelectionChange(option.value)}
        >
          <View style={styles.radioButton}>
            {selectedValue === option.value && (
              <View style={styles.radioButtonSelected} />
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
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
});