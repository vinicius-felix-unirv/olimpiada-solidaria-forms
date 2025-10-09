"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFormulario = exports.formularioValidationSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
exports.formularioValidationSchemas = {
    create: joi_1.default.object({
        titulo: joi_1.default.string()
            .required()
            .min(3)
            .max(255)
            .trim()
            .messages({
            'string.base': 'Título deve ser uma string',
            'string.empty': 'Título é obrigatório',
            'string.min': 'Título deve ter pelo menos 3 caracteres',
            'string.max': 'Título deve ter no máximo 255 caracteres',
            'any.required': 'Título é obrigatório'
        }),
        descricao: joi_1.default.string()
            .optional()
            .allow('')
            .max(1000)
            .trim()
            .messages({
            'string.base': 'Descrição deve ser uma string',
            'string.max': 'Descrição deve ter no máximo 1000 caracteres'
        }),
        questoes: joi_1.default.array()
            .items(joi_1.default.object({
            descricao: joi_1.default.string()
                .required()
                .min(3)
                .max(1000)
                .trim()
                .messages({
                'string.base': 'Descrição da questão deve ser uma string',
                'string.empty': 'Descrição da questão é obrigatória',
                'string.min': 'Descrição da questão deve ter pelo menos 3 caracteres',
                'string.max': 'Descrição da questão deve ter no máximo 1000 caracteres',
                'any.required': 'Descrição da questão é obrigatória'
            }),
            tipo: joi_1.default.string()
                .valid('texto', 'radio', 'checkbox')
                .required()
                .messages({
                'any.only': 'Tipo deve ser: texto, radio ou checkbox',
                'any.required': 'Tipo da questão é obrigatório'
            }),
            alternativas: joi_1.default.array()
                .items(joi_1.default.object({
                descricao: joi_1.default.string()
                    .required()
                    .min(1)
                    .max(500)
                    .trim()
                    .messages({
                    'string.base': 'Descrição da alternativa deve ser uma string',
                    'string.empty': 'Descrição da alternativa é obrigatória',
                    'string.min': 'Descrição da alternativa deve ter pelo menos 1 caractere',
                    'string.max': 'Descrição da alternativa deve ter no máximo 500 caracteres',
                    'any.required': 'Descrição da alternativa é obrigatória'
                })
            }))
                .when('tipo', {
                is: joi_1.default.string().valid('radio', 'checkbox'),
                then: joi_1.default.array().min(2).required().messages({
                    'array.min': 'Questões de múltipla escolha devem ter pelo menos 2 alternativas',
                    'any.required': 'Questões de múltipla escolha devem ter alternativas'
                }),
                otherwise: joi_1.default.optional()
            })
        }))
            .min(1)
            .required()
            .messages({
            'array.min': 'Formulário deve ter pelo menos 1 questão',
            'any.required': 'Questões são obrigatórias'
        })
    }),
    update: joi_1.default.object({
        titulo: joi_1.default.string()
            .optional()
            .min(3)
            .max(255)
            .trim()
            .messages({
            'string.base': 'Título deve ser uma string',
            'string.min': 'Título deve ter pelo menos 3 caracteres',
            'string.max': 'Título deve ter no máximo 255 caracteres'
        }),
        descricao: joi_1.default.string()
            .optional()
            .allow('')
            .max(1000)
            .trim()
            .messages({
            'string.base': 'Descrição deve ser uma string',
            'string.max': 'Descrição deve ter no máximo 1000 caracteres'
        }),
        questoes: joi_1.default.array()
            .items(joi_1.default.object({
            id: joi_1.default.number().optional(),
            descricao: joi_1.default.string()
                .optional()
                .min(3)
                .max(1000)
                .trim()
                .messages({
                'string.base': 'Descrição da questão deve ser uma string',
                'string.min': 'Descrição da questão deve ter pelo menos 3 caracteres',
                'string.max': 'Descrição da questão deve ter no máximo 1000 caracteres'
            }),
            tipo: joi_1.default.string()
                .optional()
                .valid('texto', 'radio', 'checkbox')
                .messages({
                'any.only': 'Tipo deve ser: texto, radio ou checkbox'
            }),
            _action: joi_1.default.string()
                .valid('create', 'update', 'delete')
                .required()
                .messages({
                'any.only': 'Ação deve ser: create, update ou delete',
                'any.required': 'Ação é obrigatória'
            }),
            alternativas: joi_1.default.array()
                .items(joi_1.default.object({
                id: joi_1.default.number().optional(),
                descricao: joi_1.default.string()
                    .optional()
                    .min(1)
                    .max(500)
                    .trim()
                    .messages({
                    'string.base': 'Descrição da alternativa deve ser uma string',
                    'string.min': 'Descrição da alternativa deve ter pelo menos 1 caractere',
                    'string.max': 'Descrição da alternativa deve ter no máximo 500 caracteres'
                }),
                _action: joi_1.default.string()
                    .valid('create', 'update', 'delete')
                    .optional()
                    .messages({
                    'any.only': 'Ação deve ser: create, update ou delete'
                })
            }))
                .optional()
        }))
            .optional()
    })
};
const validateFormulario = (schema) => {
    return (req, res, next) => {
        const validationSchema = exports.formularioValidationSchemas[schema];
        const { error } = validationSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errorMessages = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: errorMessages
            });
            return;
        }
        next();
    };
};
exports.validateFormulario = validateFormulario;
//# sourceMappingURL=validation.middleware.js.map