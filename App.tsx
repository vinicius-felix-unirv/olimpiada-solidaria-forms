import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

// Importando os componentes de pergunta
import TextQuestion from './components/TextQuestion';
import RadioQuestion from './components/RadioQuestion';
import CheckboxQuestion from './components/CheckboxQuestion';
import SelectQuestion from './components/SelectQuestion';

// Importando os tipos
import { FormConfig, FormData, Question } from './types/QuestionTypes';

export default function MedicalForm() {
  // Estado para configuração do formulário (será recebida do backend)
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: 'Carregando...',
    questions: []
  });

  // Estado do formulário dinâmico
  const [formData, setFormData] = useState<FormData>({});

  // Estado de carregamento
  const [isLoading, setIsLoading] = useState(true);

  // Simulação de dados que virão do backend
  // Esta função será substituída pela chamada real ao backend
  const loadFormConfiguration = async () => {
    try {
      setIsLoading(true);
      
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados de exemplo que virão do backend
      const mockFormConfig: FormConfig = {
        title: 'Título do Formulário',
        questions: [
          {
            id: 'question1',
            type: 'text',
            label: 'Título da Pergunta',
            placeholder: 'Digite sua resposta aqui',
            required: true
          },
          {
            id: 'question2',
            type: 'radio',
            label: 'Título da Pergunta',
            required: true,
            options: [
              { value: 'opcao1', label: 'Opção 1' },
              { value: 'opcao2', label: 'Opção 2' },
              { value: 'opcao3', label: 'Opção 3' },
              { value: 'opcao4', label: 'Opção 4' }
            ]
          },
          {
            id: 'question3',
            type: 'checkbox',
            label: 'Título da Pergunta',
            options: [
              { value: 'opcao1', label: 'Opção 1' },
              { value: 'opcao2', label: 'Opção 2' },
              { value: 'opcao3', label: 'Opção 3' },
              { value: 'opcao4', label: 'Opção 4' },
              { value: 'opcao5', label: 'Opção 5' }
            ]
          },
          {
            id: 'question4',
            type: 'select',
            label: 'Título da Pergunta',
            placeholder: 'Selecione uma opção',
            required: true,
            options: [
              { value: 'opcao1', label: 'Opção 1' },
              { value: 'opcao2', label: 'Opção 2' },
              { value: 'opcao3', label: 'Opção 3' },
              { value: 'opcao4', label: 'Opção 4' }
            ]
          },
          {
            id: 'question5',
            type: 'textarea',
            label: 'Título da Pergunta',
            placeholder: 'Digite sua resposta detalhada aqui...',
            numberOfLines: 4,
            required: true
          },
          {
            id: 'question6',
            type: 'text',
            label: 'Título da Pergunta',
            placeholder: 'Digite sua resposta aqui'
          },
          {
            id: 'question7',
            type: 'checkbox',
            label: 'Título da Pergunta',
            options: [
              { value: 'opcao1', label: 'Opção 1' },
              { value: 'opcao2', label: 'Opção 2' },
              { value: 'opcao3', label: 'Opção 3' }
            ]
          },
          {
            id: 'question8',
            type: 'textarea',
            label: 'Título da Pergunta',
            placeholder: 'Digite observações adicionais...',
            numberOfLines: 3
          }
        ]
      };

      setFormConfig(mockFormConfig);
      
      // Inicializar formData com valores vazios baseados nas perguntas
      const initialFormData: FormData = {};
      mockFormConfig.questions.forEach(question => {
        if (question.type === 'checkbox') {
          initialFormData[question.id] = [];
        } else {
          initialFormData[question.id] = '';
        }
      });
      setFormData(initialFormData);
      
    } catch (error) {
      console.error('Erro ao carregar configuração do formulário:', error);
      Alert.alert('Erro', 'Não foi possível carregar o formulário. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar configuração do formulário ao montar o componente
  useEffect(() => {
    loadFormConfiguration();
  }, []);

  // Função para atualizar dados do formulário
  const updateFormData = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Função específica para renderizar perguntas de texto
  const renderTextQuestion = (question: Question) => {
    if (question.type !== 'text') return null;
    
    return (
      <TextQuestion
        key={question.id}
        label={question.label}
        value={formData[question.id] as string || ''}
        onChangeText={(text) => updateFormData(question.id, text)}
        placeholder={question.placeholder}
      />
    );
  };

  // Função específica para renderizar perguntas de área de texto
  const renderTextAreaQuestion = (question: Question) => {
    if (question.type !== 'textarea') return null;
    
    return (
      <TextQuestion
        key={question.id}
        label={question.label}
        value={formData[question.id] as string || ''}
        onChangeText={(text) => updateFormData(question.id, text)}
        placeholder={question.placeholder}
        multiline={true}
        numberOfLines={question.numberOfLines}
      />
    );
  };

  // Função específica para renderizar perguntas de seleção única (radio)
  const renderRadioQuestion = (question: Question) => {
    if (question.type !== 'radio') return null;
    
    return (
      <RadioQuestion
        key={question.id}
        label={question.label}
        options={question.options}
        selectedValue={formData[question.id] as string || ''}
        onSelectionChange={(value) => updateFormData(question.id, value)}
      />
    );
  };

  // Função específica para renderizar perguntas de múltiplas escolhas (checkbox)
  const renderCheckboxQuestion = (question: Question) => {
    if (question.type !== 'checkbox') return null;
    
    return (
      <CheckboxQuestion
        key={question.id}
        label={question.label}
        options={question.options}
        selectedValues={formData[question.id] as string[] || []}
        onSelectionChange={(values) => updateFormData(question.id, values)}
      />
    );
  };

  // Função específica para renderizar perguntas de lista de opções (select)
  const renderSelectQuestion = (question: Question) => {
    if (question.type !== 'select') return null;
    
    return (
      <SelectQuestion
        key={question.id}
        label={question.label}
        options={question.options}
        selectedValue={formData[question.id] as string || ''}
        onSelectionChange={(value) => updateFormData(question.id, value)}
        placeholder={question.placeholder}
      />
    );
  };

  // Função principal para renderizar cada pergunta baseada no tipo
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return renderTextQuestion(question);
      case 'textarea':
        return renderTextAreaQuestion(question);
      case 'radio':
        return renderRadioQuestion(question);
      case 'checkbox':
        return renderCheckboxQuestion(question);
      case 'select':
        return renderSelectQuestion(question);
      default:
        console.warn(`Tipo de pergunta não suportado: ${question.type}`);
        return null;
    }
  };

  // Função para validar campos obrigatórios
  const validateRequiredFields = (): boolean => {
    const requiredQuestions = formConfig.questions.filter(q => q.required);
    
    for (const question of requiredQuestions) {
      const value = formData[question.id];
      
      if (question.type === 'checkbox') {
        if (!Array.isArray(value) || value.length === 0) {
          Alert.alert('Campo obrigatório', `Por favor, selecione pelo menos uma opção para: ${question.label}`);
          return false;
        }
      } else {
        if (!value || (typeof value === 'string' && !value.trim())) {
          Alert.alert('Campo obrigatório', `Por favor, preencha o campo: ${question.label}`);
          return false;
        }
      }
    }
    
    return true;
  };

  // Função para salvar o formulário
  const handleSave = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    try {
      // Aqui será feita a chamada para o backend para salvar os dados
      console.log('Dados do formulário a serem salvos:', formData);
      
      // Simulando salvamento no backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Sucesso',
        'Formulário salvo com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Resetar formulário após salvar
              const resetFormData: FormData = {};
              formConfig.questions.forEach(question => {
                if (question.type === 'checkbox') {
                  resetFormData[question.id] = [];
                } else {
                  resetFormData[question.id] = '';
                }
              });
              setFormData(resetFormData);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o formulário. Tente novamente.');
    }
  };

  const handleBack = () => {
    Alert.alert(
      'Voltar',
      'Deseja realmente voltar? Os dados não salvos serão perdidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Voltar', onPress: () => console.log('Navegação para tela anterior') }
      ]
    );
  };

  const handleFooterNavigation = (action: string) => {
    console.log(`Navegação para: ${action}`);
    // Aqui será implementada a navegação real entre telas
  };

  // Renderização de loading
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <MaterialIcons name="person" size={32} color="#ffffff" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Bem-vindo</Text>
            <Text style={styles.roleText}>Nome do Usuário</Text>
            </View>
          </View>
        </View>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>Carregando formulário...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={32} color="#ffffff" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.welcomeText}>Bem-vindo</Text>
            <Text style={styles.roleText}>Nome do Usuário</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{formConfig.title}</Text>
          
          {/* Renderizar perguntas dinamicamente */}
          {formConfig.questions.map(renderQuestion)}

          {/* Buttons */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Formulário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => handleFooterNavigation('home')}
        >
          <MaterialIcons name="home" size={24} color="#6b7280" />
          <Text style={styles.footerButtonText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => handleFooterNavigation('forms')}
        >
          <MaterialIcons name="assignment" size={24} color="#6b7280" />
          <Text style={styles.footerButtonText}>Formulários</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => handleFooterNavigation('profile')}
        >
          <MaterialIcons name="person" size={24} color="#6b7280" />
          <Text style={styles.footerButtonText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.footerButton}
          onPress={() => handleFooterNavigation('settings')}
        >
          <MaterialIcons name="settings" size={24} color="#6b7280" />
          <Text style={styles.footerButtonText}>Config</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  roleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 100,
  },
  title: {
    color: '#1d4ed8',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '400',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
