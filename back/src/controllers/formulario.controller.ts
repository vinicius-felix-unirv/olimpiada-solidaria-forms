import { Request, Response } from 'express';
import { FormularioRepository } from '../models/formulario.repository';
import { ICreateFormularioRequest, IUpdateFormularioRequest } from '../models/formulario.model';
import { AppError, ApiResponse, asyncHandler } from '../middlewares/error.middleware';
import { db } from '../config/database';

export class FormularioController {
  private readonly formularioRepository: FormularioRepository;

  constructor() {
    this.formularioRepository = new FormularioRepository(db.getPool());
  }

  public getAllFormularios = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const formularios = await this.formularioRepository.findAll();
    
    const response: ApiResponse = {
      success: true,
      message: 'Formulários recuperados com sucesso',
      data: formularios
    };

    res.status(200).json(response);
  });

  public getFormularioById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id || '0');
    
    if (isNaN(id) || id <= 0) {
      throw new AppError('ID do formulário inválido', 400);
    }

    const formulario = await this.formularioRepository.findByIdComplete(id);
    
    if (!formulario) {
      throw new AppError('Formulário não encontrado', 404);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Formulário recuperado com sucesso',
      data: formulario
    };

    res.status(200).json(response);
  });

  public createFormulario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const formularioData: ICreateFormularioRequest = req.body;
    
    // Validações adicionais de negócio
    this.validateFormularioBusinessRules(formularioData);
    
    const novoFormulario = await this.formularioRepository.create(formularioData);
    
    const response: ApiResponse = {
      success: true,
      message: 'Formulário criado com sucesso',
      data: novoFormulario
    };

    res.status(201).json(response);
  });

  public updateFormulario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id || '0');
    const updateData: IUpdateFormularioRequest = req.body;
    
    if (isNaN(id) || id <= 0) {
      throw new AppError('ID do formulário inválido', 400);
    }

    // Verificar se o formulário existe
    const formularioExistente = await this.formularioRepository.findById(id);
    if (!formularioExistente) {
      throw new AppError('Formulário não encontrado', 404);
    }

    // Validações adicionais de negócio para atualização
    this.validateUpdateBusinessRules(updateData);
    
    const formularioAtualizado = await this.formularioRepository.update(id, updateData);
    
    const response: ApiResponse = {
      success: true,
      message: 'Formulário atualizado com sucesso',
      data: formularioAtualizado
    };

    res.status(200).json(response);
  });

  public deleteFormulario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id || '0');
    
    if (isNaN(id) || id <= 0) {
      throw new AppError('ID do formulário inválido', 400);
    }

    // Verificar se o formulário existe
    const formularioExistente = await this.formularioRepository.findById(id);
    if (!formularioExistente) {
      throw new AppError('Formulário não encontrado', 404);
    }

    const deletado = await this.formularioRepository.delete(id);
    
    if (!deletado) {
      throw new AppError('Erro ao deletar formulário', 500);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Formulário deletado com sucesso'
    };

    res.status(200).json(response);
  });

  private validateFormularioBusinessRules(data: ICreateFormularioRequest): void {
    // Validar se questões de múltipla escolha têm pelo menos 2 alternativas
    for (const questao of data.questoes) {
      if (questao.tipo === 'radio' || questao.tipo === 'checkbox') {
        if (!questao.alternativas || questao.alternativas.length < 2) {
          throw new AppError(
            `Questão "${questao.descricao}" deve ter pelo menos 2 alternativas`,
            400
          );
        }
      } else if (questao.tipo === 'texto') {
        // Questões de texto não devem ter alternativas
        if (questao.alternativas && questao.alternativas.length > 0) {
          throw new AppError(
            `Questão de texto "${questao.descricao}" não deve ter alternativas`,
            400
          );
        }
      }
    }

    // Validar limite de caracteres na descrição das questões
    for (const questao of data.questoes) {
      if (questao.descricao.length > 1000) {
        throw new AppError(
          `Descrição da questão deve ter no máximo 1000 caracteres`,
          400
        );
      }
    }
  }

  private validateUpdateBusinessRules(data: IUpdateFormularioRequest): void {
    if (!data.questoes) return;

    for (const questao of data.questoes) {
      this.validateQuestaoUpdate(questao);
    }
  }

  private validateQuestaoUpdate(questao: any): void {
    if (questao._action !== 'create' && questao._action !== 'update') return;
    
    if (this.isMultipleChoiceQuestion(questao.tipo)) {
      this.validateMultipleChoiceAlternatives(questao);
    }
  }

  private isMultipleChoiceQuestion(tipo: string): boolean {
    return tipo === 'radio' || tipo === 'checkbox';
  }

  private validateMultipleChoiceAlternatives(questao: any): void {
    if (!questao.alternativas) return;

    const alternativasAtivas = questao.alternativas.filter(
      (alt: any) => alt._action !== 'delete'
    );
    
    if (alternativasAtivas.length < 2) {
      throw new AppError(
        `Questão "${questao.descricao || 'sem descrição'}" deve ter pelo menos 2 alternativas`,
        400
      );
    }
  }
}
