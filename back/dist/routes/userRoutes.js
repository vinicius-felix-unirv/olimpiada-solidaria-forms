"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rota para cadastrar um novo usuário
router.post('/usuarios', userController_1.createUser);
// Rotas da Tarefa 2 (podem ser adicionadas depois por Erik)
router.post('/login', userController_1.login);
router.put('/perfil', authMiddleware_1.authMiddleware, userController_1.updateProfile);
exports.default = router;
