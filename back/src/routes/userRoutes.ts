// src/routes/userRoutes.ts
import { Router } from 'express';
import { createUser, login, updateProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rota para cadastrar um novo usuário
router.post('/usuarios', createUser);

// Rotas da Tarefa 2 (podem ser adicionadas depois por Erik)
router.post('/login', login);
router.put('/perfil', authMiddleware, updateProfile);

export default router;