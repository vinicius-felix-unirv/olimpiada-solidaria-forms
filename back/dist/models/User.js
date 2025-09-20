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
// src/models/User.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Classe do modelo User
class User extends sequelize_1.Model {
    // Método estático para buscar usuário por email
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({ where: { email } });
        });
    }
    // Método estático para verificar se email já existe
    static emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findByEmail(email);
            return user !== null;
        });
    }
}
// Definição do modelo no Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nome é obrigatório',
            },
            len: {
                args: [3, 100],
                msg: 'Nome deve ter entre 3 e 100 caracteres',
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: {
            name: 'unique_email',
            msg: 'Este email já está cadastrado',
        },
        validate: {
            notEmpty: {
                msg: 'Email é obrigatório',
            },
            isEmail: {
                msg: 'Formato de email inválido',
            },
        },
    },
    senha: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Senha é obrigatória',
            },
            len: {
                args: [6, 255],
                msg: 'Senha deve ter pelo menos 6 caracteres',
            },
        },
    },
    crm: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    instituicao: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    especialidade: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email'],
        },
    ],
});
exports.default = User;
