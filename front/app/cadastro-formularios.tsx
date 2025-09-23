import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { DynamicForm, Question, QuestionType, NavigationItem } from '../src/types';
import { Button, Modal, QuestionEditor } from '../src/components';

const CadastroFormulariosScreen = () => {
  const [form, setForm] = useState<DynamicForm>({
    id: '',
    title: 'Novo Formulário',
    description: '',
    questions: [
      {
        id: '1',
        type: 'text',
        title: 'Nome completo',
        placeholder: 'Digite seu nome completo',
        required: true,
      },
      {
        id: '2',
        type: 'select',
        title: 'Estado civil',
        options: [
          { id: '1', label: 'Solteiro(a)', value: 'solteiro' },
          { id: '2', label: 'Casado(a)', value: 'casado' },
          { id: '3', label: 'Divorciado(a)', value: 'divorciado' },
          { id: '4', label: 'Viúvo(a)', value: 'viuvo' },
        ],
        required: true,
      },
      {
        id: '3',
        type: 'checkbox',
        title: 'Áreas de interesse',
        options: [
          { id: '1', label: 'Saúde', value: 'saude' },
          { id: '2', label: 'Educação', value: 'educacao' },
          { id: '3', label: 'Tecnologia', value: 'tecnologia' },
          { id: '4', label: 'Esportes', value: 'esportes' },
        ],
        required: false,
      },
      {
        id: '4',
        type: 'radio',
        title: 'Gênero',
        options: [
          { id: '1', label: 'Masculino', value: 'masculino' },
          { id: '2', label: 'Feminino', value: 'feminino' },
          { id: '3', label: 'Outro', value: 'outro' },
          { id: '4', label: 'Prefiro não informar', value: 'nao_informar' },
        ],
        required: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);

  const navigationItems: NavigationItem[] = [
    { id: '1', label: 'Home', icon: 'home-outline', route: '/', active: false },
    { id: '2', label: 'Formulários', icon: 'document-text-outline', route: '/cadastro-formularios', active: true },
    { id: '3', label: 'Relatórios', icon: 'bar-chart-outline', route: '/relatorios', active: false },
    { id: '4', label: 'Perfil', icon: 'person-outline', route: '/perfil', active: false },
  ];

  const handleEditQuestion = (questionId: string) => {
    const question = form.questions.find(q => q.id === questionId);
    if (question) {
      setEditingQuestion(question);
      setEditingQuestionId(questionId);
      setShowQuestionModal(true);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    Alert.alert(
      'Excluir Questão',
      'Tem certeza que deseja excluir esta questão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setForm(prev => ({
              ...prev,
              questions: prev.questions.filter(q => q.id !== questionId),
            }));
          },
        },
      ]
    );
  };

  const handleAddQuestion = () => {
    setEditingQuestion(undefined);
    setEditingQuestionId(null);
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = (question: Question) => {
    if (editingQuestionId) {
      // Editando questão existente
      setForm(prev => ({
        ...prev,
        questions: prev.questions.map(q => 
          q.id === editingQuestionId ? question : q
        ),
      }));
    } else {
      // Adicionando nova questão
      setForm(prev => ({
        ...prev,
        questions: [...prev.questions, question],
      }));
    }
    setShowQuestionModal(false);
    setEditingQuestion(undefined);
    setEditingQuestionId(null);
  };

  const handleCancelQuestionEdit = () => {
    setShowQuestionModal(false);
    setEditingQuestion(undefined);
    setEditingQuestionId(null);
  };

  const handleSaveForm = () => {
    // TODO: Implementar salvamento do formulário
    Alert.alert('Salvar Formulário', 'Formulário salvo com sucesso!');
  };

  const renderQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'text':
        return 'text-outline';
      case 'select':
        return 'chevron-down-outline';
      case 'checkbox':
        return 'checkbox-outline';
      case 'radio':
        return 'radio-button-on-outline';
      default:
        return 'help-outline';
    }
  };

  const renderQuestion = (question: Question) => (
    <View key={question.id} style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={styles.questionInfo}>
          <Ionicons 
            name={renderQuestionTypeIcon(question.type) as any} 
            size={20} 
            color="#666" 
          />
          <Text style={styles.questionTitle}>{question.title}</Text>
          {question.required && <Text style={styles.requiredMark}>*</Text>}
        </View>
        <View style={styles.questionActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditQuestion(question.id)}
          >
            <Ionicons name="pencil-outline" size={18} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteQuestion(question.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      
      {question.placeholder && (
        <Text style={styles.questionPlaceholder}>{question.placeholder}</Text>
      )}
      
      {question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <View key={option.id} style={styles.optionItem}>
              <Ionicons 
                name={question.type === 'checkbox' ? 'checkbox-outline' : 'radio-button-off-outline'} 
                size={16} 
                color="#999" 
              />
              <Text style={styles.optionLabel}>{option.label}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro de Formulários</Text>
        <TouchableOpacity onPress={handleSaveForm}>
          <Ionicons name="checkmark" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>{form.title}</Text>
          <Text style={styles.questionCount}>{form.questions.length} questões</Text>
        </View>

        {form.questions.map(renderQuestion)}

        <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.addQuestionText}>Adicionar Questão</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {navigationItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.footerItem, item.active && styles.footerItemActive]}
            onPress={() => router.push(item.route as any)}
          >
            <Ionicons 
              name={item.icon as any} 
              size={24} 
              color={item.active ? '#007AFF' : '#999'} 
            />
            <Text style={[styles.footerLabel, item.active && styles.footerLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal de Edição/Adição de Questão */}
      <Modal
        visible={showQuestionModal}
        onClose={handleCancelQuestionEdit}
        showCloseButton={false}
      >
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={handleCancelQuestionEdit}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formHeader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
    color: '#666',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  requiredMark: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 4,
  },
  questionActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  questionPlaceholder: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  addQuestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
  },
  addQuestionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingVertical: 8,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerItemActive: {
    // Estilo para item ativo
  },
  footerLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  footerLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default CadastroFormulariosScreen;