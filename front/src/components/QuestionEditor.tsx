import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Question, QuestionType, QuestionOption } from '../types';
import { Button, Select } from './';

interface QuestionEditorProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Question>>({
    id: question?.id || '',
    type: question?.type || 'text',
    title: question?.title || '',
    placeholder: question?.placeholder || '',
    required: question?.required || false,
    options: question?.options || [],
  });

  const questionTypes: { label: string; value: QuestionType }[] = [
    { label: 'Texto', value: 'text' },
    { label: 'Seleção', value: 'select' },
    { label: 'Múltipla escolha', value: 'checkbox' },
    { label: 'Escolha única', value: 'radio' },
  ];

  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: Date.now().toString(),
      label: '',
      value: '',
    };
    setFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), newOption],
    }));
  };

  const handleUpdateOption = (optionId: string, field: keyof QuestionOption, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.map(option =>
        option.id === optionId ? { ...option, [field]: value } : option
      ),
    }));
  };

  const handleRemoveOption = (optionId: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter(option => option.id !== optionId),
    }));
  };

  const handleSave = () => {
    if (!formData.title?.trim()) {
      Alert.alert('Erro', 'O título da questão é obrigatório.');
      return;
    }

    if ((formData.type === 'select' || formData.type === 'checkbox' || formData.type === 'radio') && 
        (!formData.options || formData.options.length === 0)) {
      Alert.alert('Erro', 'Este tipo de questão precisa ter pelo menos uma opção.');
      return;
    }

    // Validar opções
    if (formData.options) {
      for (const option of formData.options) {
        if (!option.label.trim() || !option.value.trim()) {
          Alert.alert('Erro', 'Todas as opções devem ter rótulo e valor preenchidos.');
          return;
        }
      }
    }

    const questionToSave: Question = {
      id: formData.id || Date.now().toString(),
      type: formData.type!,
      title: formData.title!,
      placeholder: formData.placeholder,
      required: formData.required!,
      options: formData.options,
    };

    onSave(questionToSave);
  };

  const needsOptions = formData.type === 'select' || formData.type === 'checkbox' || formData.type === 'radio';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {question ? 'Editar Questão' : 'Nova Questão'}
        </Text>
      </View>

      <View style={styles.form}>
        {/* Tipo da Questão */}
        <View style={styles.field}>
          <Text style={styles.label}>Tipo da Questão</Text>
          <Select
            label=""
            value={formData.type}
            onSelect={(value) => setFormData(prev => ({ ...prev, type: value as QuestionType }))}
            options={questionTypes}
            placeholder="Selecione o tipo"
          />
        </View>

        {/* Título */}
        <View style={styles.field}>
          <Text style={styles.label}>Título da Questão *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            placeholder="Digite o título da questão"
            multiline
          />
        </View>

        {/* Placeholder (apenas para texto) */}
        {formData.type === 'text' && (
          <View style={styles.field}>
            <Text style={styles.label}>Placeholder</Text>
            <TextInput
              style={styles.input}
              value={formData.placeholder}
              onChangeText={(text) => setFormData(prev => ({ ...prev, placeholder: text }))}
              placeholder="Texto de exemplo para o usuário"
            />
          </View>
        )}

        {/* Campo Obrigatório */}
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setFormData(prev => ({ ...prev, required: !prev.required }))}
        >
          <Ionicons 
            name={formData.required ? 'checkbox' : 'checkbox-outline'} 
            size={24} 
            color={formData.required ? '#007AFF' : '#999'} 
          />
          <Text style={styles.checkboxLabel}>Campo obrigatório</Text>
        </TouchableOpacity>

        {/* Opções (para select, checkbox, radio) */}
        {needsOptions && (
          <View style={styles.field}>
            <View style={styles.optionsHeader}>
              <Text style={styles.label}>Opções</Text>
              <TouchableOpacity style={styles.addOptionButton} onPress={handleAddOption}>
                <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                <Text style={styles.addOptionText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            
            {formData.options?.map((option, index) => (
              <View key={option.id} style={styles.optionContainer}>
                <View style={styles.optionInputs}>
                  <TextInput
                    style={[styles.input, styles.optionInput]}
                    value={option.label}
                    onChangeText={(text) => handleUpdateOption(option.id, 'label', text)}
                    placeholder={`Opção ${index + 1}`}
                  />
                  <TextInput
                    style={[styles.input, styles.optionInput]}
                    value={option.value}
                    onChangeText={(text) => handleUpdateOption(option.id, 'value', text)}
                    placeholder="Valor"
                  />
                </View>
                <TouchableOpacity 
                  style={styles.removeOptionButton}
                  onPress={() => handleRemoveOption(option.id)}
                >
                  <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Button
          onPress={onCancel}
          variant="secondary"
          style={styles.actionButton}
        >
          Cancelar
        </Button>
        <Button
          onPress={handleSave}
          variant="primary"
          style={styles.actionButton}
        >
          Salvar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addOptionText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInputs: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  optionInput: {
    flex: 1,
  },
  removeOptionButton: {
    padding: 8,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});

export default QuestionEditor;