import { Router } from 'express';
import { FormularioController } from '../controllers/formulario.controller';
import { validateFormulario } from '../middlewares/validation.middleware';

const router = Router();
const formularioController = new FormularioController();

/**
 * @route GET /api/formularios
 * @desc Listar todos os formulários
 * @access Public
 */
router.get('/', formularioController.getAllFormularios);

/**
 * @route GET /api/formularios/:id
 * @desc Buscar formulário por ID (com questões e alternativas)
 * @access Public
 */
router.get('/:id', formularioController.getFormularioById);

/**
 * @route POST /api/formularios
 * @desc Criar novo formulário
 * @access Private (Admin/Professional)
 * @body { titulo, descricao?, questoes[] }
 */
router.post(
  '/',
  validateFormulario('create'),
  formularioController.createFormulario
);

/**
 * @route PUT /api/formularios/:id
 * @desc Atualizar formulário existente
 * @access Private (Admin/Professional)
 * @body { titulo?, descricao?, questoes[]? }
 */
router.put(
  '/:id',
  validateFormulario('update'),
  formularioController.updateFormulario
);

/**
 * @route DELETE /api/formularios/:id
 * @desc Deletar formulário
 * @access Private (Admin/Professional)
 */
router.delete('/:id', formularioController.deleteFormulario);

export default router;
