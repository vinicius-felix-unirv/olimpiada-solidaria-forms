import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectQuestionProps {
  label: string;
  options: SelectOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectQuestion({
  label,
  options,
  selectedValue,
  onSelectionChange,
  placeholder = 'Selecione uma opção'
}: SelectQuestionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleOptionSelect = (value: string) => {
    onSelectionChange(value);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[
          styles.selectText,
          !selectedOption && styles.placeholderText
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#6b7280" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedValue === item.value && styles.selectedOption
                  ]}
                  onPress={() => handleOptionSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedValue === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedValue === item.value && (
                    <MaterialIcons name="check" size={20} color="#2563eb" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  selectButton: {
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  placeholderText: {
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    maxHeight: 300,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  selectedOptionText: {
    color: '#2563eb',
    fontWeight: '500',
  },
});