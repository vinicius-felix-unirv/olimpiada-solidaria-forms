import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Olimpíada Solidária',
            headerShown: false // Remove o header completamente da tela inicial
          }} 
        />
        <Stack.Screen 
          name="cadastro" 
          options={{ 
            title: 'Cadastro',
            headerShown: true,
            headerBackTitle: 'Voltar'
          }} 
        />
      </Stack>
    </>
  );
}
