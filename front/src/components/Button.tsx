import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { cn } from '../lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "h-12 rounded-md items-center justify-center",
        variant === 'primary' && "bg-button-blue",
        variant === 'secondary' && "bg-light-gray",
        className
      )}
      {...props}
    >
      <Text className={cn(
        "text-sm font-semibold",
        variant === 'primary' && "text-white",
        variant === 'secondary' && "text-black"
      )}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

