// Arquivo: app/recuperar-senha.tsx (Com o header de logos adicionado)

import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Input, Button } from '../src/components';
import { validateEmail } from '../src/utils/validators';

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBlur = () => {
    if (email.trim() === '') {
        setError('Email é obrigatório');
        return;
    }
    const { ok, reason } = validateEmail(email);
    setError(ok ? '' : reason || 'Email inválido');
  };
  
  const handleSubmit = () => {
    if (error || email.trim() === '') {
      handleBlur();
      return;
    }
    setIsSubmitting(true);
    console.log(`Solicitando recuperação para o e-mail: ${email}`);
    setTimeout(() => {
      Alert.alert('Verifique seu E-mail', 'Se o endereço estiver cadastrado em nossa base, você receberá um link para redefinir sua senha.');
      setIsSubmitting(false);
      router.back();
    }, 2000);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          <View>
            {/* INÍCIO DO HEADER COM LOGOS ADICIONADO */}
            <View className="bg-white h-18 flex-row items-center justify-between px-4 pt-4">
              <Image source={require('../public/assets/Logo UniRV_Prancheta 1 cópia 2 1.png')} className="w-24 h-12" resizeMode="contain" />
              <Image source={require('../public/assets/logo Medicina-02 1.png')} className="w-18 h-9" resizeMode="contain" />
              <Image source={require('../public/assets/Fasoft Aprovada-01 1.png')} className="w-18 h-8" resizeMode="contain" />
            </View>
            {/* FIM DO HEADER COM LOGOS */}

            <View className="bg-primary-blue h-35 flex-row items-center justify-center px-8">
              <View className="w-15 h-15 rounded-full items-center justify-center mr-5 bg-icon-circle-bg">
                <FontAwesome name="lock" size={28} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-1">Recuperar Senha</Text>
                <Text className="text-white text-base leading-5">
                  Não se preocupe, vamos te ajudar a recuperar seu acesso.
                </Text>
              </View>
            </View>

            <View className="px-8 py-10">
              <View className="bg-very-light-blue p-4 rounded-lg flex-row items-center mb-8 border border-element-blue/50">
                  <FontAwesome name="info-circle" size={24} color="#0254EB" className="mr-4" />
                  <Text className="text-primary-blue flex-1 text-base">
                      Digite o e-mail associado à sua conta. Será enviado um link para alteração de senha.
                  </Text>
              </View>

              <Input
                label="E-mail"
                icon="user"
                placeholder="seu.email@clinica.com.br"
                value={email}
                onChangeText={setEmail}
                onBlur={handleBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
                containerClassName='mb-8'
              />
              
              <Button
                onPress={handleSubmit}
                disabled={isSubmitting || !!error || email.trim() === ''}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar código'}
              </Button>

              <Link href="/" asChild>
                  <TouchableOpacity className="py-4 items-center">
                      <Text className="text-button-blue font-medium text-base">Voltar para login</Text>
                  </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="bg-medium-gray h-12.5 items-center justify-center px-4">
            <Text className="text-text-gray text-xs font-bold text-center mb-0.5">
              © 2025 InfoMed - Todos os direitos reservados
            </Text>
            <Text className="text-success-green text-xs font-bold text-center">
              Dados protegidos por criptografia de ponta a ponta
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}