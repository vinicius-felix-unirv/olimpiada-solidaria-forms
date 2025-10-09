"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLimiter = exports.createLimiter = exports.generalLimiter = exports.createRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max,
        message: {
            success: false,
            message: 'Muitas requisições realizadas, tente novamente mais tarde',
            error: 'Rate limit exceeded'
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                message: 'Muitas requisições realizadas, tente novamente mais tarde',
                error: 'Rate limit exceeded'
            });
        }
    });
};
exports.createRateLimiter = createRateLimiter;
exports.generalLimiter = (0, exports.createRateLimiter)(15 * 60 * 1000, 100);
exports.createLimiter = (0, exports.createRateLimiter)(60 * 1000, 10);
exports.deleteLimiter = (0, exports.createRateLimiter)(60 * 1000, 5);
//# sourceMappingURL=rateLimiter.middleware.js.map