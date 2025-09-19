// Arquivo: front/src/components/Input.tsx (Versão Corrigida)

import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { cn } from '../lib/utils';

interface InputProps extends TextInputProps {
  label: string;
  icon?: string;
  error?: string;
  containerClassName?: string;
  rightElement?: React.ReactNode; // Nova prop para o ícone da senha
}

export function Input({ 
  label, 
  icon, 
  error, 
  containerClassName,
  className,
  rightElement,
  ...props 
}: InputProps) {
  const hasError = !!error;

  return (
    <View className={cn("w-full", containerClassName)}>
      <Text className="text-black text-base font-medium mb-2">
        {label}
      </Text>
      
      <View className="relative justify-center">
        {/* Ícone da Esquerda */}
        {icon && (
          <FontAwesome
            name={icon}
            size={16}
            color={hasError ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
            style={styles.inputIcon}
          />
        )}

        <TextInput
          className={cn(
            "bg-input-bg rounded-xl h-14 text-base text-black pl-12 pr-12", // Ajustado padding
            hasError && "border border-red-500",
            className
          )}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          {...props}
        />
        
        {/* Elemento da Direita (para o ícone de olho) */}
        {rightElement && (
          <View style={styles.rightElementContainer}>
            {rightElement}
          </View>
        )}
      </View>
      
      {error && (
        <Text className="text-red-500 text-sm mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1, // Garante que o ícone fique sobre o input
  },
  rightElementContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});