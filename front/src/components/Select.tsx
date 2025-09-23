import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { cn } from '../lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  icon?: string;
  options: SelectOption[];
  value?: string;
  onSelect: (value: string) => void;
  error?: string;
  containerClassName?: string;
}

export function Select({ 
  label, 
  placeholder,
  icon, 
  options,
  value,
  onSelect,
  error, 
  containerClassName 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);

  return (
    <View className={cn("w-full mb-4", containerClassName)}>
      {/* Label */}
      <Text className="text-black text-sm font-normal mb-1 ml-1">
        {label}
      </Text>
      
      {/* Select Container */}
      <TouchableOpacity 
        onPress={() => setIsOpen(true)}
        className="relative"
      >
        <View className="bg-gray-300 rounded-md h-12 px-12 justify-center">
          <Text className={cn(
            "text-sm",
            selectedOption ? "text-black" : "text-gray-500"
          )}>
            {selectedOption?.label || placeholder}
          </Text>
        </View>
        
        {/* Icon */}
        {icon && (
          <FontAwesome
            name={icon}
            size={16}
            color="rgba(0, 0, 0, 0.5)"
            style={{
              position: 'absolute',
              left: 12,
              top: 14,
            }}
          />
        )}
        
        {/* Dropdown Arrow */}
        <FontAwesome
          name="chevron-down"
          size={12}
          color="#3576EF"
          style={{
            position: 'absolute',
            right: 12,
            top: 16,
          }}
        />
      </TouchableOpacity>
      
      {/* Error Message */}
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </Text>
      )}
      
      {/* Modal */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-white rounded-lg mx-8 max-h-80 w-80">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-200"
                  onPress={() => {
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text className="text-black text-sm">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
