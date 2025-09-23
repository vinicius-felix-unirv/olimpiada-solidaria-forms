import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { cn } from '../lib/utils';

interface InputProps extends TextInputProps {
  label: string;
  icon?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({ 
  label, 
  icon, 
  error, 
  containerClassName,
  className,
  ...props 
}: InputProps) {
  return (
    <View className={cn("w-full mb-4", containerClassName)}>
      {/* Label */}
      <Text className="text-black text-sm font-normal mb-1 ml-1">
        {label}
      </Text>
      
      {/* Input Container */}
      <View className="relative">
        <TextInput
          className={cn(
            "bg-gray-300 rounded-md h-12 px-12 text-sm text-black",
            "placeholder:text-gray-500",
            className
          )}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          {...props}
        />
        
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
      </View>
      
      {/* Error Message */}
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}
