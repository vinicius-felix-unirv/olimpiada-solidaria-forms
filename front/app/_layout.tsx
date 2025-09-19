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
            headerShown: false 
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
        <Stack.Screen
          name="recuperar-senha"
          options={{
            title: 'Recuperar Senha',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
