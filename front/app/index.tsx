import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Checkbox } from '../src/components';
import { validateEmail, validateLoginPassword } from '../src/utils/validators';
import { LoginForm, ValidationErrors } from '../src/types';
import { mockApiCall, sanitizeForLog } from '../src/utils/apiHelpers';

const MOCK_LOGIN_DATA: LoginForm = {
  email: 'teste@email.com',
  senha: 'teste123',
};
const REMEMBERED_EMAIL_KEY = 'remembered-email';

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginForm>({ email: '', senha: '' });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem(REMEMBERED_EMAIL_KEY);
        if (savedEmail !== null) {
          setFormData(prev => ({ ...prev, email: savedEmail }));
          setRememberMe(true);
        }
      } catch (e) {
        console.error('Falha ao carregar o e-mail salvo.', e);
      }
    };
    loadRememberedEmail();
  }, []);

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field];
      setValidationErrors(newErrors);
    }
  };

  const handleInputBlur = (field: keyof LoginForm) => {
    const value = formData[field];
    let result: { ok: boolean; reason?: string } = { ok: true };

    if (field === 'email') result = validateEmail(value);
    if (field === 'senha') result = validateLoginPassword(value);

    if (!result.ok) {
      setValidationErrors(prev => ({ ...prev, [field]: result.reason || 'Campo inválido' }));
    }
  };
  
  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    try {
      const response = await mockApiCall(formData);
      if (response.success) {
        if (rememberMe) {
          await AsyncStorage.setItem(REMEMBERED_EMAIL_KEY, formData.email);
        } else {
          await AsyncStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
        Alert.alert('Login bem-sucedido!', 'Você será redirecionado para a tela principal.');
      } else {
        Alert.alert('Falha no login', response.message || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (!devMode && newCount === 5) {
      setDevMode(true);
      Alert.alert('🔧 Dev Mode Ativado', 'Funcionalidades de teste liberadas.');
    }
    setTimeout(() => setLogoClickCount(0), 2000);
  };

  const fillWithTestData = () => {
    if (!devMode) return;
    setFormData(MOCK_LOGIN_DATA);
    setValidationErrors({});
  };
  
  const isFormValid = formData.email.trim() !== '' && formData.senha.trim() !== '' && Object.keys(validationErrors).length === 0;

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between">
          <View>
            <View className="bg-white h-18 flex-row items-center justify-between px-4 pt-4">
              <Image source={require('../public/assets/Logo UniRV_Prancheta 1 cópia 2 1.png')} className="w-24 h-12" resizeMode="contain" />
              <Image source={require('../public/assets/logo Medicina-02 1.png')} className="w-18 h-9" resizeMode="contain" />
              <TouchableOpacity onPress={handleLogoClick}>
                <Image source={require('../public/assets/Fasoft Aprovada-01 1.png')} className="w-18 h-8" resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <View className="bg-primary-blue h-35 flex-row items-center justify-center px-8">
              <View className="w-15 h-15 rounded-full items-center justify-center mr-5 bg-icon-circle-bg">
                <FontAwesome name="user-md" size={28} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-1">InfoMed</Text>
                <Text className="text-white text-base leading-5">
                  Sistema de coleta de dados de{'\n'}pacientes para profissionais da saúde
                </Text>
              </View>
            </View>

            {devMode && (
              <TouchableOpacity onPress={fillWithTestData} className="bg-yellow-200 p-2 items-center">
                <Text className="font-bold text-yellow-800">🔧 [DEV] Preencher com dados de teste</Text>
              </TouchableOpacity>
            )}
            
            <View className="px-8 py-10">
              <Input
                label="E-mail"
                icon="user"
                placeholder="seu.email@clinica.com.br"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                onBlur={() => handleInputBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                error={validationErrors.email}
                containerClassName='mb-5'
              />

              <Input
                label="Senha"
                icon="lock"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChangeText={(value) => handleInputChange('senha', value)}
                onBlur={() => handleInputBlur('senha')}
                secureTextEntry={!showPassword}
                error={validationErrors.senha}
                containerClassName='mb-5'
                rightElement={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={16} color="rgba(0, 0, 0, 0.5)" />
                  </TouchableOpacity>
                }
              />

              <View className="flex-row justify-between items-center mb-6">
                <Checkbox checked={rememberMe} onPress={() => setRememberMe(!rememberMe)}>
                  <Text className="text-text-gray">Lembrar-me</Text>
                </Checkbox>
                <Link href="/recuperar-senha" asChild>
                  <TouchableOpacity>
                    <Text className="text-button-blue font-medium">Esqueceu a senha?</Text>
                  </TouchableOpacity>
                </Link>
              </View>

              <Button
                onPress={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Acessando...' : 'Acessar Sistema'}
              </Button>

              <Link href="/cadastro" asChild>
                <TouchableOpacity className="py-4 items-center">
                  <Text className="text-base">
                    <Text className="text-black">Não possui cadastro? </Text>
                    <Text className="text-button-blue font-medium">Crie sua conta</Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
          
          <View className="bg-medium-gray h-12.5 items-center justify-center px-4 mt-auto">
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