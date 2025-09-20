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
exports.syncDatabase = exports.testConnection = void 0;
// src/config/database.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configuração do banco de dados PostgreSQL
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'infomed',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
// Função para testar a conexão com o banco
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    }
    catch (error) {
        console.error('❌ Erro ao conectar com o banco de dados:', error);
        throw error;
    }
});
exports.testConnection = testConnection;
// Função para sincronizar o banco de dados
const syncDatabase = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (force = false) {
    try {
        yield sequelize.sync({ force });
        console.log('✅ Banco de dados sincronizado com sucesso.');
    }
    catch (error) {
        console.error('❌ Erro ao sincronizar o banco de dados:', error);
        throw error;
    }
});
exports.syncDatabase = syncDatabase;
exports.default = sequelize;
