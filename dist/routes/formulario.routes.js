"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formulario_controller_1 = require("../controllers/formulario.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
const formularioController = new formulario_controller_1.FormularioController();
router.get('/', formularioController.getAllFormularios);
router.get('/:id', formularioController.getFormularioById);
router.post('/', (0, validation_middleware_1.validateFormulario)('create'), formularioController.createFormulario);
router.put('/:id', (0, validation_middleware_1.validateFormulario)('update'), formularioController.updateFormulario);
router.delete('/:id', formularioController.deleteFormulario);
exports.default = router;
//# sourceMappingURL=formulario.routes.js.map