"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioController = void 0;
const formulario_repository_1 = require("../models/formulario.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const database_1 = require("../config/database");
class FormularioController {
    constructor() {
        this.getAllFormularios = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const formularios = await this.formularioRepository.findAll();
            const response = {
                success: true,
                message: 'Formulários recuperados com sucesso',
                data: formularios
            };
            res.status(200).json(response);
        });
        this.getFormularioById = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt(req.params.id || '0');
            if (isNaN(id) || id <= 0) {
                throw new error_middleware_1.AppError('ID do formulário inválido', 400);
            }
            const formulario = await this.formularioRepository.findByIdComplete(id);
            if (!formulario) {
                throw new error_middleware_1.AppError('Formulário não encontrado', 404);
            }
            const response = {
                success: true,
                message: 'Formulário recuperado com sucesso',
                data: formulario
            };
            res.status(200).json(response);
        });
        this.createFormulario = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const formularioData = req.body;
            this.validateFormularioBusinessRules(formularioData);
            const novoFormulario = await this.formularioRepository.create(formularioData);
            const response = {
                success: true,
                message: 'Formulário criado com sucesso',
                data: novoFormulario
            };
            res.status(201).json(response);
        });
        this.updateFormulario = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt(req.params.id || '0');
            const updateData = req.body;
            if (isNaN(id) || id <= 0) {
                throw new error_middleware_1.AppError('ID do formulário inválido', 400);
            }
            const formularioExistente = await this.formularioRepository.findById(id);
            if (!formularioExistente) {
                throw new error_middleware_1.AppError('Formulário não encontrado', 404);
            }
            this.validateUpdateBusinessRules(updateData);
            const formularioAtualizado = await this.formularioRepository.update(id, updateData);
            const response = {
                success: true,
                message: 'Formulário atualizado com sucesso',
                data: formularioAtualizado
            };
            res.status(200).json(response);
        });
        this.deleteFormulario = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const id = parseInt(req.params.id || '0');
            if (isNaN(id) || id <= 0) {
                throw new error_middleware_1.AppError('ID do formulário inválido', 400);
            }
            const formularioExistente = await this.formularioRepository.findById(id);
            if (!formularioExistente) {
                throw new error_middleware_1.AppError('Formulário não encontrado', 404);
            }
            const deletado = await this.formularioRepository.delete(id);
            if (!deletado) {
                throw new error_middleware_1.AppError('Erro ao deletar formulário', 500);
            }
            const response = {
                success: true,
                message: 'Formulário deletado com sucesso'
            };
            res.status(200).json(response);
        });
        this.formularioRepository = new formulario_repository_1.FormularioRepository(database_1.db.getPool());
    }
    validateFormularioBusinessRules(data) {
        for (const questao of data.questoes) {
            if (questao.tipo === 'radio' || questao.tipo === 'checkbox') {
                if (!questao.alternativas || questao.alternativas.length < 2) {
                    throw new error_middleware_1.AppError(`Questão "${questao.descricao}" deve ter pelo menos 2 alternativas`, 400);
                }
            }
            else if (questao.tipo === 'texto') {
                if (questao.alternativas && questao.alternativas.length > 0) {
                    throw new error_middleware_1.AppError(`Questão de texto "${questao.descricao}" não deve ter alternativas`, 400);
                }
            }
        }
        for (const questao of data.questoes) {
            if (questao.descricao.length > 1000) {
                throw new error_middleware_1.AppError(`Descrição da questão deve ter no máximo 1000 caracteres`, 400);
            }
        }
    }
    validateUpdateBusinessRules(data) {
        if (!data.questoes)
            return;
        for (const questao of data.questoes) {
            this.validateQuestaoUpdate(questao);
        }
    }
    validateQuestaoUpdate(questao) {
        if (questao._action !== 'create' && questao._action !== 'update')
            return;
        if (this.isMultipleChoiceQuestion(questao.tipo)) {
            this.validateMultipleChoiceAlternatives(questao);
        }
    }
    isMultipleChoiceQuestion(tipo) {
        return tipo === 'radio' || tipo === 'checkbox';
    }
    validateMultipleChoiceAlternatives(questao) {
        if (!questao.alternativas)
            return;
        const alternativasAtivas = questao.alternativas.filter((alt) => alt._action !== 'delete');
        if (alternativasAtivas.length < 2) {
            throw new error_middleware_1.AppError(`Questão "${questao.descricao || 'sem descrição'}" deve ter pelo menos 2 alternativas`, 400);
        }
    }
}
exports.FormularioController = FormularioController;
//# sourceMappingURL=formulario.controller.js.map