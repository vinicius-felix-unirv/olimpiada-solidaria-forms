import React, { useState } from 'react';
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
import { FormConfig, FormData } from './types/QuestionTypes';

export default function MedicalForm() {
  // Configuração do formulário
  const formConfig: FormConfig = {
    title: 'Formulário Médico',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: 'Nome completo',
        placeholder: 'Digite seu nome completo',
        required: true
      },
      {
        id: 'bloodType',
        type: 'radio',
        label: 'Tipo sanguíneo',
        required: true,
        options: [
          { value: 'A+', label: 'A+' },
          { value: 'A-', label: 'A-' },
          { value: 'B+', label: 'B+' },
          { value: 'B-', label: 'B-' },
          { value: 'AB+', label: 'AB+' },
          { value: 'AB-', label: 'AB-' },
          { value: 'O+', label: 'O+' },
          { value: 'O-', label: 'O-' }
        ]
      },
      {
        id: 'medications',
        type: 'checkbox',
        label: 'Medicamentos em uso',
        options: [
          { value: 'aspirina', label: 'Aspirina' },
          { value: 'paracetamol', label: 'Paracetamol' },
          { value: 'ibuprofeno', label: 'Ibuprofeno' },
          { value: 'dipirona', label: 'Dipirona' },
          { value: 'omeprazol', label: 'Omeprazol' },
          { value: 'losartana', label: 'Losartana' }
        ]
      },
      {
        id: 'symptoms1',
        type: 'textarea',
        label: 'Sintomas principais',
        placeholder: 'Descreva os sintomas principais...',
        numberOfLines: 4
      },
      {
        id: 'symptoms2',
        type: 'textarea',
        label: 'Sintomas secundários',
        placeholder: 'Descreva outros sintomas...',
        numberOfLines: 4
      },
      {
        id: 'additionalInfo',
        type: 'textarea',
        label: 'Informações adicionais',
        placeholder: 'Outras informações relevantes...',
        numberOfLines: 4
      }
    ]
  };

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bloodType: '',
    medications: [],
    symptoms1: '',
    symptoms2: '',
    additionalInfo: ''
  });

  // Função para atualizar dados do formulário
  const updateFormData = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Função para renderizar cada pergunta
  const renderQuestion = (question: any) => {
    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            key={question.id}
            label={question.label}
            value={formData[question.id] as string || ''}
            onChangeText={(text) => updateFormData(question.id, text)}
            placeholder={question.placeholder}
          />
        );
      
      case 'textarea':
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
      
      case 'radio':
        return (
          <RadioQuestion
            key={question.id}
            label={question.label}
            options={question.options}
            selectedValue={formData[question.id] as string || ''}
            onSelectionChange={(value) => updateFormData(question.id, value)}
          />
        );
      
      case 'checkbox':
        return (
          <CheckboxQuestion
            key={question.id}
            label={question.label}
            options={question.options}
            selectedValues={formData[question.id] as string[] || []}
            onSelectionChange={(values) => updateFormData(question.id, values)}
          />
        );
      
      case 'select':
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
      
      default:
        return null;
    }
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.name || typeof formData.name !== 'string' || !formData.name.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome.');
      return;
    }
    
    if (!formData.bloodType) {
      Alert.alert('Erro', 'Por favor, selecione o tipo sanguíneo.');
      return;
    }

    Alert.alert(
      'Sucesso',
      'Formulário salvo com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Limpar formulário
            setFormData({
              name: '',
              bloodType: '',
              medications: [],
              symptoms1: '',
              symptoms2: '',
              additionalInfo: ''
            });
          }
        }
      ]
    );
  };

  const handleBack = () => {
    Alert.alert('Voltar', 'Funcionalidade de voltar implementada');
  };

  const handleFooterNavigation = (action: string) => {
    Alert.alert('Navegação', `Ação: ${action}`);
  };

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
            <Text style={styles.roleText}>Paciente</Text>
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
            <Text style={styles.saveButtonText}>Salvar</Text>
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
