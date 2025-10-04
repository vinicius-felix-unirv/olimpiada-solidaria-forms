import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

// Funções para responsividade
const scale = (size: number): number => (width / 375) * size; // Base: iPhone X
const verticalScale = (size: number): number => (height / 812) * size;
const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#004F9E" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userGroup}>
          <View style={styles.userAvatar}>
            <Icon name="user-md" size={moderateScale(16)} color="#FFFFFF" solid />
          </View>
          <Text style={styles.welcomeText}>
            Bem vindo, Dr Fulano{'\n'}Cardiologista
          </Text>
        </View>
      </View>

      {/* Titulo Pagina */}
      <Text style={styles.pageTitle}>Início</Text>

      {/* Opções */}
      <View style={styles.contentContainer}>
        {/* Opção 1 - Responder Formulário */}
        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.optionBackground}>
            <View style={styles.iconButton}>
              <Icon name="pen" size={moderateScale(14)} color="#FFFFFF" solid />
            </View>
          </View>
          <Text style={styles.optionText}>Responder Formulário</Text>
        </TouchableOpacity>

        {/* Opção 2 - Editar Formulário */}
        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.optionBackground}>
            <View style={styles.iconButton}>
              <Icon name="plus" size={moderateScale(10)} color="#FFFFFF" solid />
            </View>
          </View>
          <Text style={styles.optionText}>Editar Formulário</Text>
        </TouchableOpacity>

        {/* Opção 3 - Visualizar Respostas */}
        <TouchableOpacity style={styles.optionContainer}>
          <View style={styles.optionBackground}>
            <View style={styles.iconButton}>
              <Icon name="plus" size={moderateScale(10)} color="#FFFFFF" solid />
            </View>
          </View>
          <Text style={styles.optionText}>Visualizar Respostas</Text>
        </TouchableOpacity>
      </View>

      {/* Botões Navegação */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-alt" size={moderateScale(18)} color="rgba(0,0,0,0.5)" solid />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="file-medical" size={moderateScale(18)} color="rgba(0,0,0,0.5)" solid />
          <Text style={styles.navText}>Formulários</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={moderateScale(18)} color="#004F9E" solid />
          <Text style={[styles.navText, styles.activeNavText]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="chart-bar" size={moderateScale(18)} color="rgba(0,0,0,0.5)" solid />
          <Text style={styles.navText}>Relatórios</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="cogs" size={moderateScale(18)} color="rgba(0,0,0,0.5)" solid />
          <Text style={styles.navText}>Conf.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    height: verticalScale(150),
    backgroundColor: '#004F9E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
  },
  userGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: scale(45),
    height: scale(45),
    backgroundColor: 'rgba(109, 148, 218, 0.5)',
    borderRadius: scale(22.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
    lineHeight: moderateScale(18),
  },
  pageTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#000000',
    marginLeft: scale(16),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    gap: verticalScale(20),
    alignItems: 'center',
  },
  optionContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: scale(300),
  },
  optionBackground: {
    width: '100%',
    height: verticalScale(115),
    backgroundColor: 'rgba(99, 144, 227, 0.1)',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  iconButton: {
    width: scale(50),
    height: scale(50),
    backgroundColor: 'rgba(99, 144, 227, 0.7)',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: moderateScale(16),
    color: '#000000',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: 'rgba(217, 217, 217, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(5),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: verticalScale(8),
  },
  navText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.5)',
    marginTop: verticalScale(4),
    textAlign: 'center',
  },
  activeNavText: {
    color: '#004F9E',
    fontWeight: '700',
  },
});

export default HomeScreen;