// Arquivo: front/src/components/Button.tsx (Versão Corrigida)

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { cn } from '../lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean; // Adicionado para estados de carregamento
}

export function Button({ 
  children, 
  className,
  disabled,
  isLoading,
  ...props 
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "h-14 rounded-xl items-center justify-center flex-row",
        // Usa a cor correta 'bg-button-blue' do tailwind.config.js
        disabled ? "bg-gray-400" : "bg-button-blue",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <ActivityIndicator size="small" color="#ffffff" className="mr-2" />
      )}
      <Text className={cn(
        "text-lg font-semibold",
        disabled ? 'text-gray-600' : 'text-white'
      )}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}