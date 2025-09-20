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
exports.updateProfile = exports.login = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    // 1. Validação com Joi
    const schema = joi_1.default.object({
        nome: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().required(),
        senha: joi_1.default.string().min(6).required(),
        crm: joi_1.default.string().allow(null, ''),
        instituicao: joi_1.default.string().allow(null, ''),
        telefone: joi_1.default.string().allow(null, ''),
        especialidade: joi_1.default.string().allow(null, '')
    });
    const { error } = schema.validate(userInput);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        // 2. Hash da senha
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(userInput.senha, salt);
        // 3. Simular criação do usuário (modo desenvolvimento sem banco)
        console.log('⚠️  Modo desenvolvimento: Simulando criação de usuário');
        console.log('📝 Dados recebidos:', {
            nome: userInput.nome,
            email: userInput.email,
            crm: userInput.crm,
            instituicao: userInput.instituicao,
            telefone: userInput.telefone,
            especialidade: userInput.especialidade
        });
        // TODO: Descomentar quando MySQL estiver configurado
        // const emailExists = await User.emailExists(userInput.email);
        // if (emailExists) {
        //   return res.status(400).json({ message: 'Este email já está cadastrado.' });
        // }
        // const newUser = await User.create({
        //   nome: userInput.nome,
        //   email: userInput.email,
        //   senha: hashedPassword,
        //   crm: userInput.crm || undefined,
        //   instituicao: userInput.instituicao || undefined,
        //   telefone: userInput.telefone || undefined,
        //   especialidade: userInput.especialidade || undefined,
        // });
        // const { senha, ...userResponse } = newUser.toJSON();
        // Resposta simulada para desenvolvimento
        const userResponse = {
            id: Math.floor(Math.random() * 1000),
            nome: userInput.nome,
            email: userInput.email,
            crm: userInput.crm || null,
            instituicao: userInput.instituicao || null,
            telefone: userInput.telefone || null,
            especialidade: userInput.especialidade || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        res.status(201).json({
            message: 'Usuário criado com sucesso! (Modo desenvolvimento - sem persistência)',
            data: userResponse
        });
    }
    catch (err) {
        console.error('Erro ao criar usuário:', err);
        // Tratar erros específicos do Sequelize
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Este email já está cadastrado.' });
        }
        if (err.name === 'SequelizeValidationError') {
            const validationErrors = err.errors.map((error) => error.message);
            return res.status(400).json({ message: 'Dados inválidos', errors: validationErrors });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao criar usuário.' });
    }
});
exports.createUser = createUser;
// Deixe as funções do Erik preparadas para ele implementar
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implementação básica de login (placeholder para Tarefa 2)
    res.status(501).json({ message: 'Funcionalidade de login será implementada na Tarefa 2' });
});
exports.login = login;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implementação básica de atualização de perfil (placeholder para Tarefa 2)
    res.status(501).json({ message: 'Funcionalidade de atualização de perfil será implementada na Tarefa 2' });
});
exports.updateProfile = updateProfile;
