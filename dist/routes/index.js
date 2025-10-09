"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formulario_routes_1 = __importDefault(require("./formulario.routes"));
const router = (0, express_1.Router)();
router.use('/formularios', formulario_routes_1.default);
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando corretamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map