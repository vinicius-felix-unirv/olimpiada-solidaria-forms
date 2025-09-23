import React from 'react';
import { View, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export function Header() {
  return (
    <View className="w-full">
      {/* Top Header - Logos */}
      <View className="bg-white h-16 flex-row items-center justify-between px-2">
        <Image
          source={require('../../public/assets/Logo UniRV_Prancheta 1 cópia 2 1.png')}
          className="w-16 h-8"
          resizeMode="contain"
        />
        
        <Image
          source={require('../../public/assets/logo Medicina-02 1.png')}
          className="w-12 h-6"
          resizeMode="contain"
        />
        
        <Image
          source={require('../../public/assets/Fasoft Aprovada-01 1.png')}
          className="w-12 h-5"
          resizeMode="contain"
        />
      </View>
      
      {/* Bottom Header - InfoMed */}
      <View className="bg-primary-500 h-24 flex-row items-center justify-center px-4">
        {/* Icon Circle */}
        <View className="w-12 h-10 bg-secondary-200/50 rounded-full items-center justify-center mr-4">
          <FontAwesome
            name="user-md"
            size={20}
            color="#FFFFFF"
          />
        </View>
        
        {/* Text Content */}
        <View className="flex-1">
          <Text className="text-white text-lg font-bold">
            InfoMed
          </Text>
          <Text className="text-white text-xs leading-tight">
            Sistema de coleta de dados de{'\n'}pacientes para profissionais da saúde
          </Text>
        </View>
      </View>
    </View>
  );
}
