// src/controllers/userController.ts
import { Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/User';

// Tipagem para os campos do usuário
interface UserInput {
  nome: string;
  email: string;
  senha: string;
  crm?: string;
  instituicao?: string;
  telefone?: string;
  especialidade?: string;
}

export const createUser = async (req: Request, res: Response) => {
  const userInput: UserInput = req.body;

  // 1. Validação com Joi
  const schema = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    crm: Joi.string().allow(null, ''),
    instituicao: Joi.string().allow(null, ''),
    telefone: Joi.string().allow(null, ''),
    especialidade: Joi.string().allow(null, '')
  });

  const { error } = schema.validate(userInput);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    // 2. Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInput.senha, salt);
    
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
    
    // TODO: Descomentar quando PostgreSQL estiver configurado
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
  } catch (err: any) {
    console.error('Erro ao criar usuário:', err);
    
    // Tratar erros específicos do Sequelize
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Este email já está cadastrado.' });
    }
    
    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map((error: any) => error.message);
      return res.status(400).json({ message: 'Dados inválidos', errors: validationErrors });
    }
    
    res.status(500).json({ message: 'Erro interno do servidor ao criar usuário.' });
  }
};

// Deixe as funções do Erik preparadas para ele implementar
export const login = async (req: Request, res: Response) => {
  // Implementação básica de login (placeholder para Tarefa 2)
  res.status(501).json({ message: 'Funcionalidade de login será implementada na Tarefa 2' });
};

export const updateProfile = async (req: Request, res: Response) => {
  // Implementação básica de atualização de perfil (placeholder para Tarefa 2)
  res.status(501).json({ message: 'Funcionalidade de atualização de perfil será implementada na Tarefa 2' });
};