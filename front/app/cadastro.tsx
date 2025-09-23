import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
  validatePhone, 
  validateCrm, 
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  formatPhone 
} from '../src/utils/validators';
import { CadastroMedicoForm, ValidationErrors, FieldsTouched, LoadingStates } from '../src/types';
import { prepareApiData, mockApiCall, sanitizeForLog } from '../src/utils/apiHelpers';
import { MOCK_TEST_DATA } from '../src/constants/mockData';

export default function CadastroScreen() {
  const [formData, setFormData] = useState<CadastroMedicoForm>({
    nomeCompleto: '',
    crm: '',
    especialidade: '',
    instituicao: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Estados para validação
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [fieldsTouched, setFieldsTouched] = useState<FieldsTouched>({});
  
  // Estados de loading
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    isSubmitting: false,
    isValidating: false,
  });
  
  // Dev mode (ativado clicando 5x no logo Fasoft)
  const [devMode, setDevMode] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpa erro quando usuário começa a digitar
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInputBlur = (field: string) => {
    setFieldsTouched(prev => ({ ...prev, [field]: true }));
    
    // Valida campo quando perde o foco
    const value = formData[field as keyof CadastroMedicoForm];
    let error = '';

    switch (field) {
      case 'telefone':
        if (value) {
          const phoneValidation = validatePhone(value);
          if (!phoneValidation.ok) {
            error = phoneValidation.reason || 'Telefone inválido';
          }
        }
        break;
        
      case 'crm':
        if (value) {
          const crmValidation = validateCrm(value);
          if (!crmValidation.ok) {
            error = crmValidation.reason || 'CRM inválido';
          }
        }
        break;
        
      case 'email':
        if (value) {
          const emailValidation = validateEmail(value);
          if (!emailValidation.ok) {
            error = emailValidation.reason || 'Email inválido';
          }
        }
        break;
        
      case 'senha':
        if (value) {
          const passwordValidation = validatePassword(value);
          if (!passwordValidation.ok) {
            error = passwordValidation.reason || 'Senha inválida';
          }
        }
        break;
        
      case 'confirmarSenha':
        if (value) {
          const confirmValidation = validatePasswordConfirmation(formData.senha, value);
          if (!confirmValidation.ok) {
            error = confirmValidation.reason || 'Senhas não coincidem';
          }
        }
        break;
    }

    if (error) {
      setValidationErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Verifica se formulário é válido para habilitar botão
  const isFormValid = () => {
    const requiredFields: (keyof CadastroMedicoForm)[] = ['nomeCompleto', 'crm', 'instituicao', 'email', 'telefone', 'senha', 'confirmarSenha'];
    const hasAllFields = requiredFields.every(field => formData[field].trim() !== '');
    const hasNoErrors = Object.keys(validationErrors).length === 0;
    const passwordsMatch = formData.senha === formData.confirmarSenha;
    
    return hasAllFields && hasNoErrors && passwordsMatch && acceptedTerms && !loadingStates.isSubmitting;
  };

  // Função para ativar/desativar dev mode (clique secreto)
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (devMode && newCount === 3) {
      // Se já está no dev mode, 3 cliques desativa
      setDevMode(false);
      setLogoClickCount(0);
      console.log('❌ Dev Mode DESATIVADO! Interface normal restaurada.');
      Alert.alert(
        '❌ Dev Mode',
        'Modo desenvolvedor desativado!\n\nInterface normal restaurada.',
        [{ text: 'OK' }]
      );
    } else if (!devMode && newCount === 5) {
      // Se não está no dev mode, 5 cliques ativa
      setDevMode(true);
      console.log('🔧 Dev Mode ATIVADO! Funcionalidades de desenvolvimento liberadas.');
      Alert.alert(
        '🔧 Dev Mode',
        'Modo desenvolvedor ativado!\n\nFuncionalidades de teste liberadas.\n\n💡 Para desativar: clique 3x no logo Fasoft',
        [{ text: 'OK' }]
      );
    } else if (newCount < (devMode ? 3 : 5)) {
      const target = devMode ? 3 : 5;
      const action = devMode ? 'desativar' : 'ativar';
      console.log(`🤫 Clique secreto ${newCount}/${target} para ${action}`);
    }
    
    // Reset contador após 3 segundos se não completou a ação
    setTimeout(() => {
      const target = devMode ? 3 : 5;
      if (logoClickCount < target) {
        setLogoClickCount(0);
      }
    }, 3000);
  };

  // Função para preencher com dados de teste (apenas dev mode)
  const fillTestData = () => {
    if (!devMode) return;
    
    setFormData(MOCK_TEST_DATA);
    setAcceptedTerms(true);
    console.log('📝 Formulário preenchido com dados de teste');
  };

  // Função de submit do formulário
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setLoadingStates(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Prepara dados para API
      const apiData = prepareApiData(formData);
      
      // Log dos dados (sem senhas)
      console.log('📤 Dados preparados para envio:', sanitizeForLog(apiData));
      
      if (devMode) {
        console.log('🔧 [DEV] Dados originais do formulário:', sanitizeForLog(formData));
        console.log('🔧 [DEV] Dados após prepareApiData():', sanitizeForLog(apiData));
      }
      
      // Chama API (simulada)
      const response = await mockApiCall(apiData);
      
      if (response.success) {
        Alert.alert(
          'Sucesso! ✅',
          'Cadastro realizado com sucesso!\n\nOs dados foram enviados para análise.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                setFormData({
                  nomeCompleto: '',
                  crm: '',
                  especialidade: '',
                  instituicao: '',
                  email: '',
                  telefone: '',
                  senha: '',
                  confirmarSenha: '',
                });
                setAcceptedTerms(false);
                setValidationErrors({});
                setFieldsTouched({});
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Erro ❌',
          response.message || 'Erro ao realizar cadastro. Tente novamente.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert(
        'Erro ❌',
        'Erro inesperado. Verifique sua conexão e tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoadingStates(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header com logos */}
        <View className="bg-white h-18 flex-row items-center justify-between px-4">
          <Image
            source={require('../public/assets/Logo UniRV_Prancheta 1 cópia 2 1.png')}
            className="w-24 h-12"
            resizeMode="contain"
          />
          
          <Image
            source={require('../public/assets/logo Medicina-02 1.png')}
            className="w-18 h-9"
            resizeMode="contain"
          />
          
          <TouchableOpacity onPress={handleLogoClick}>
            <Image
              source={require('../public/assets/Fasoft Aprovada-01 1.png')}
              className="w-18 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        
        {/* Header InfoMed */}
        <View className="bg-primary-blue h-35 flex-row items-center justify-center px-8">
          {/* Icon Circle */}
          <View className="w-15 h-15 rounded-full items-center justify-center mr-5 bg-icon-circle-bg">
            <FontAwesome name="user-md" size={28} color="#FFFFFF" />
          </View>
          
          {/* Text Content */}
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-1">
              InfoMed
            </Text>
            <Text className="text-white text-base leading-5">
              Sistema de coleta de dados de{'\n'}pacientes para profissionais da saúde
            </Text>
          </View>
        </View>
        
        {/* Content */}
        <View className="px-8 py-6">
          {/* Title */}
          <View className="items-center mb-3">
            <Text className="text-3xl font-semibold text-black text-center">
              Cadastro Médico
            </Text>
            {devMode && (
              <View className="bg-yellow-100 border border-yellow-400 rounded-full px-3 py-1 mt-2">
                <Text className="text-yellow-800 text-xs font-bold">🔧 DEV MODE</Text>
              </View>
            )}
          </View>
          
          {/* Subtitle */}
          <Text className="text-base text-text-gray text-center mb-4 leading-6">
            Preencha os dados abaixo para criar sua conta
          </Text>
          
          {/* Botões de dev mode */}
          {devMode && (
            <View className="items-center mb-6 space-y-2">
              <TouchableOpacity 
                onPress={fillTestData}
                className="bg-yellow-200 rounded-lg py-2 px-4 border border-yellow-400"
              >
                <Text className="text-yellow-800 text-sm font-semibold">🔧 [DEV] Preencher com dados de teste</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => {
                  setDevMode(false);
                  setLogoClickCount(0);
                  console.log('❌ Dev Mode desativado pelo botão');
                }}
                className="bg-red-100 rounded-lg py-1 px-3 border border-red-300"
              >
                <Text className="text-red-700 text-xs">❌ Desativar Dev Mode</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Form */}
          <View className="space-y-5">
            {/* Nome Completo */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Nome Completo</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className="bg-input-bg rounded-xl h-14 text-base text-black"
                  style={styles.textInput}
                  placeholder="Nome Completo"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.nomeCompleto}
                  onChangeText={(value) => handleInputChange('nomeCompleto', value)}
                />
                <FontAwesome
                  name="user"
                  size={16}
                  color="rgba(0, 0, 0, 0.5)"
                  style={styles.inputIcon}
                />
              </View>
            </View>

            {/* CRM */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Registro Profissional (CRM)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className={`bg-input-bg rounded-xl h-14 text-base text-black ${
                    validationErrors.crm ? 'border border-red-500' : ''
                  }`}
                  style={styles.textInput}
                  placeholder={devMode ? "CRM/UF - 12345/SP ou 123/TE (teste)" : "CRM/UF - 12345/SP"}
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.crm}
                  onChangeText={(value) => handleInputChange('crm', value)}
                  onBlur={() => handleInputBlur('crm')}
                />
                <FontAwesome
                  name="id-card"
                  size={16}
                  color={validationErrors.crm ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
                  style={styles.inputIcon}
                />
              </View>
              {validationErrors.crm && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.crm}
                </Text>
              )}
            </View>

            {/* Especialidade */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Especialidade Médica</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className="bg-input-bg rounded-xl h-14 text-base text-black"
                  style={styles.textInput}
                  placeholder="Selecione"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.especialidade}
                  editable={false}
                />
                <FontAwesome
                  name="stethoscope"
                  size={16}
                  color="rgba(0, 0, 0, 0.5)"
                  style={styles.inputIcon}
                />
                <FontAwesome
                  name="chevron-down"
                  size={12}
                  color="#3576EF"
                  style={styles.dropdownIcon}
                />
              </View>
            </View>

            {/* Instituição */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Instituição de Saúde</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className="bg-input-bg rounded-xl h-14 text-base text-black"
                  style={styles.textInput}
                  placeholder="Hospital / Clínica"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.instituicao}
                  onChangeText={(value) => handleInputChange('instituicao', value)}
                />
                <FontAwesome
                  name="hospital-o"
                  size={16}
                  color="rgba(0, 0, 0, 0.5)"
                  style={styles.inputIcon}
                />
              </View>
            </View>

            {/* E-mail */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">E-mail</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className={`bg-input-bg rounded-xl h-14 text-base text-black ${
                    validationErrors.email ? 'border border-red-500' : ''
                  }`}
                  style={styles.textInput}
                  placeholder="seu.email@clinica.com.br"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  onBlur={() => handleInputBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <FontAwesome
                  name="envelope"
                  size={16}
                  color={validationErrors.email ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
                  style={styles.inputIcon}
                />
              </View>
              {validationErrors.email && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.email}
                </Text>
              )}
            </View>

            {/* Telefone */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Telefone</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className={`bg-input-bg rounded-xl h-14 text-base text-black ${
                    validationErrors.telefone ? 'border border-red-500' : ''
                  }`}
                  style={styles.textInput}
                  placeholder="(11) 91234-5678 ou (11) 1234-5678"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.telefone}
                  onChangeText={(value) => {
                    // Formata automaticamente enquanto digita
                    const formatted = formatPhone(value);
                    handleInputChange('telefone', formatted);
                  }}
                  onBlur={() => handleInputBlur('telefone')}
                  keyboardType="phone-pad"
                />
                <FontAwesome
                  name="phone"
                  size={16}
                  color={validationErrors.telefone ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
                  style={styles.inputIcon}
                />
              </View>
              {validationErrors.telefone && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.telefone}
                </Text>
              )}
            </View>

            {/* Senha */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Senha</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className={`bg-input-bg rounded-xl h-14 text-base text-black ${
                    validationErrors.senha ? 'border border-red-500' : ''
                  }`}
                  style={styles.textInput}
                  placeholder="Mínimo 6 caracteres (letra + número)"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.senha}
                  onChangeText={(value) => handleInputChange('senha', value)}
                  onBlur={() => handleInputBlur('senha')}
                  secureTextEntry
                />
                <FontAwesome
                  name="lock"
                  size={16}
                  color={validationErrors.senha ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
                  style={styles.inputIcon}
                />
              </View>
              {validationErrors.senha && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.senha}
                </Text>
              )}
            </View>

            {/* Confirmar Senha */}
            <View className="mb-5">
              <Text className="text-base font-medium text-black mb-2">Confirmar Senha</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  className={`bg-input-bg rounded-xl h-14 text-base text-black ${
                    validationErrors.confirmarSenha ? 'border border-red-500' : ''
                  }`}
                  style={styles.textInput}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor="rgba(0, 0, 0, 0.5)"
                  value={formData.confirmarSenha}
                  onChangeText={(value) => handleInputChange('confirmarSenha', value)}
                  onBlur={() => handleInputBlur('confirmarSenha')}
                  secureTextEntry
                />
                <FontAwesome
                  name="lock"
                  size={16}
                  color={validationErrors.confirmarSenha ? "#ef4444" : "rgba(0, 0, 0, 0.5)"}
                  style={styles.inputIcon}
                />
              </View>
              {validationErrors.confirmarSenha && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {validationErrors.confirmarSenha}
                </Text>
              )}
            </View>

            {/* Terms Checkbox */}
            <View className="bg-terms-bg rounded-xl p-5 mb-6">
              <TouchableOpacity 
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                className="flex-row items-start"
              >
                <View className={`w-5 h-5 border border-element-blue rounded items-center justify-center ${acceptedTerms ? 'bg-element-blue' : 'bg-white'}`}>
                  {acceptedTerms && (
                    <Text className="text-white text-xs">✓</Text>
                  )}
                </View>
                
                <Text className="text-sm leading-5 flex-1 ml-3">
                  <Text className="text-text-gray">Li e concordo com os </Text>
                  <Text className="text-button-blue font-medium">Termos de Uso</Text>
                  <Text className="text-text-gray"> e </Text>
                  <Text className="text-button-blue font-medium">Política de Privacidade</Text>
                  <Text className="text-text-gray">. Estou ciente de que meus dados serão utilizados conforme a legislação de proteção de dados médicos.</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              className={`h-14 rounded-xl items-center justify-center mb-5 flex-row ${
                isFormValid() 
                  ? 'bg-button-blue' 
                  : 'bg-gray-400'
              }`}
              disabled={!isFormValid()}
              onPress={handleSubmit}
            >
              {loadingStates.isSubmitting && (
                <Text className="text-white text-lg mr-2">⏳</Text>
              )}
              <Text className={`text-lg font-semibold ${
                isFormValid() ? 'text-white' : 'text-gray-600'
              }`}>
                {loadingStates.isSubmitting ? 'Enviando...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <Link href="/" asChild>
              <TouchableOpacity className="py-3">
                <Text className="text-base text-center">
                  <Text className="text-black">Já possui uma conta? </Text>
                  <Text className="text-button-blue font-medium">Faça login</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
      
      {/* Footer */}
      <View className="bg-medium-gray h-12.5 items-center justify-center px-4">
        <Text className="text-text-gray text-xs font-bold text-center mb-0.5">
          © 2025 InfoMed - Todos os direitos reservados
        </Text>
        <Text className="text-success-green text-xs font-bold text-center">
          Dados protegidos por criptografia de ponta a ponta
        </Text>
      </View>
    </View>
  );
}

// StyleSheet apenas para posicionamento absoluto complexo que NativeWind não consegue
const styles = StyleSheet.create({
  // Form - posicionamento absoluto de ícones
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    paddingLeft: 50,
    paddingRight: 16,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 20,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 16,
    top: 22,
  },
});