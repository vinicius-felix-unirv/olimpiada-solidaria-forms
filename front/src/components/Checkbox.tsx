// Arquivo: front/src/components/Checkbox.tsx (Versão Corrigida)

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
      className={cn("flex-row items-center", className)} // Removido items-start e mb-4 para mais flexibilidade
    >
      {/* Caixa do Checkbox */}
      <View 
        className={cn(
          "w-5 h-5 border rounded items-center justify-center mr-2",
          // CORREÇÃO: Usando a cor 'element-blue' definida no tailwind.config.js
          checked ? "bg-element-blue border-element-blue" : "bg-white border-text-gray"
        )}
      >
        {checked && (
          <Text className="text-white text-xs font-bold">✓</Text>
        )}
      </View>
      
      {/* Label (Texto) */}
      <View className="flex-1">
        {children}
      </View>
    </TouchableOpacity>
  );
}