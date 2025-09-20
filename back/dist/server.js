"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para o Express entender JSON
app.use(express_1.default.json());
// Usar as rotas de usuário
app.use('/api', userRoutes_1.default);
// Inicializar banco de dados e servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('⚠️  Modo de desenvolvimento: Conexão com banco de dados desabilitada');
        console.log('💡 Para habilitar o banco, configure MySQL e descomente as linhas de conexão');
        // TODO: Descomentar quando MySQL estiver configurado
        // await testConnection();
        // await syncDatabase();
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📊 API disponível em: http://localhost:${PORT}/api`);
            console.log(`📝 Endpoint de cadastro: POST http://localhost:${PORT}/api/usuarios`);
        });
    }
    catch (error) {
        console.error('❌ Erro ao inicializar o servidor:', error);
        process.exit(1);
    }
});
// Iniciar aplicação
startServer();
