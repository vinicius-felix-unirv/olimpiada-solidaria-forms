import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const formularioValidationSchemas = {
  create: Joi.object({
    titulo: Joi.string()
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
    
    descricao: Joi.string()
      .optional()
      .allow('')
      .max(1000)
      .trim()
      .messages({
        'string.base': 'Descrição deve ser uma string',
        'string.max': 'Descrição deve ter no máximo 1000 caracteres'
      }),
    
    questoes: Joi.array()
      .items(
        Joi.object({
          descricao: Joi.string()
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
          
          tipo: Joi.string()
            .valid('texto', 'radio', 'checkbox')
            .required()
            .messages({
              'any.only': 'Tipo deve ser: texto, radio ou checkbox',
              'any.required': 'Tipo da questão é obrigatório'
            }),
          
          alternativas: Joi.array()
            .items(
              Joi.object({
                descricao: Joi.string()
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
              })
            )
            .when('tipo', {
              is: Joi.string().valid('radio', 'checkbox'),
              then: Joi.array().min(2).required().messages({
                'array.min': 'Questões de múltipla escolha devem ter pelo menos 2 alternativas',
                'any.required': 'Questões de múltipla escolha devem ter alternativas'
              }),
              otherwise: Joi.optional()
            })
        })
      )
      .min(1)
      .required()
      .messages({
        'array.min': 'Formulário deve ter pelo menos 1 questão',
        'any.required': 'Questões são obrigatórias'
      })
  }),

  update: Joi.object({
    titulo: Joi.string()
      .optional()
      .min(3)
      .max(255)
      .trim()
      .messages({
        'string.base': 'Título deve ser uma string',
        'string.min': 'Título deve ter pelo menos 3 caracteres',
        'string.max': 'Título deve ter no máximo 255 caracteres'
      }),
    
    descricao: Joi.string()
      .optional()
      .allow('')
      .max(1000)
      .trim()
      .messages({
        'string.base': 'Descrição deve ser uma string',
        'string.max': 'Descrição deve ter no máximo 1000 caracteres'
      }),
    
    questoes: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().optional(),
          descricao: Joi.string()
            .optional()
            .min(3)
            .max(1000)
            .trim()
            .messages({
              'string.base': 'Descrição da questão deve ser uma string',
              'string.min': 'Descrição da questão deve ter pelo menos 3 caracteres',
              'string.max': 'Descrição da questão deve ter no máximo 1000 caracteres'
            }),
          
          tipo: Joi.string()
            .optional()
            .valid('texto', 'radio', 'checkbox')
            .messages({
              'any.only': 'Tipo deve ser: texto, radio ou checkbox'
            }),
          
          _action: Joi.string()
            .valid('create', 'update', 'delete')
            .required()
            .messages({
              'any.only': 'Ação deve ser: create, update ou delete',
              'any.required': 'Ação é obrigatória'
            }),
          
          alternativas: Joi.array()
            .items(
              Joi.object({
                id: Joi.number().optional(),
                descricao: Joi.string()
                  .optional()
                  .min(1)
                  .max(500)
                  .trim()
                  .messages({
                    'string.base': 'Descrição da alternativa deve ser uma string',
                    'string.min': 'Descrição da alternativa deve ter pelo menos 1 caractere',
                    'string.max': 'Descrição da alternativa deve ter no máximo 500 caracteres'
                  }),
                _action: Joi.string()
                  .valid('create', 'update', 'delete')
                  .optional()
                  .messages({
                    'any.only': 'Ação deve ser: create, update ou delete'
                  })
              })
            )
            .optional()
        })
      )
      .optional()
  })
};

export const validateFormulario = (schema: 'create' | 'update') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationSchema = formularioValidationSchemas[schema];
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
