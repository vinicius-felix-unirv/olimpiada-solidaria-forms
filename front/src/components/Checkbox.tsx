import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cn } from '../lib/utils';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Checkbox({ checked, onPress, children, className }: CheckboxProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={cn("flex-row items-start mb-4", className)}
    >
      {/* Checkbox */}
      <View className={cn(
        "w-4 h-4 border border-primary-300 bg-white rounded-sm mr-3 mt-0.5",
        "items-center justify-center",
        checked && "bg-primary-300"
      )}>
        {checked && (
          <Text className="text-white text-xs">✓</Text>
        )}
      </View>
      
      {/* Label */}
      <View className="flex-1">
        {children}
      </View>
    </TouchableOpacity>
  );
}

