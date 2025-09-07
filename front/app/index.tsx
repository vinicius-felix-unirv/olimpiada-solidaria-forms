import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olimpíada Solidária
      </Text>
      
      <Text style={styles.subtitle}>
        Levantamento de informações pelos profissionais da saúde da UNIRV
      </Text>

      <View style={styles.buttonContainer}>
        <Link href="/cadastro" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Cadastro
            </Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004F9E',
    marginBottom: 32,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#004F9E',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#374151',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
});
