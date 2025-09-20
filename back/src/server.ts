// src/server.ts
import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import { testConnection, syncDatabase } from './config/database';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para o Express entender JSON
app.use(express.json());

// Usar as rotas de usuário
app.use('/api', userRoutes);

// Inicializar banco de dados e servidor
const startServer = async () => {
  try {
    console.log('⚠️  Modo de desenvolvimento: Conexão com banco de dados desabilitada');
    console.log('💡 Para habilitar o banco, configure PostgreSQL e descomente as linhas de conexão');
    
    // TODO: Descomentar quando PostgreSQL estiver configurado
    // await testConnection();
    // await syncDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 API disponível em: http://localhost:${PORT}/api`);
      console.log(`📝 Endpoint de cadastro: POST http://localhost:${PORT}/api/usuarios`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
};

// Iniciar aplicação
startServer();