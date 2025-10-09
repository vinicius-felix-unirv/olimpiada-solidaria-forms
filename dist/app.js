"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const rateLimiter_middleware_1 = require("./middlewares/rateLimiter.middleware");
const database_1 = require("./config/database");
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000');
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"]
                }
            }
        }));
        this.app.use((0, cors_1.default)({
            origin: process.env.NODE_ENV === 'production'
                ? process.env.FRONTEND_URL
                : ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true,
            optionsSuccessStatus: 200
        }));
        this.app.use(rateLimiter_middleware_1.generalLimiter);
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        if (process.env.NODE_ENV === 'development') {
            this.app.use((req, res, next) => {
                console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
                next();
            });
        }
    }
    initializeRoutes() {
        this.app.use('/api', routes_1.default);
        this.app.get('/', (req, res) => {
            res.json({
                success: true,
                message: 'Healthcare Survey API',
                version: '1.0.0',
                documentation: '/api/health'
            });
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.notFoundHandler);
        this.app.use(error_middleware_1.errorHandler);
    }
    async start() {
        try {
            await database_1.db.connect();
            this.app.listen(this.port, () => {
                console.log(`🚀 Servidor rodando na porta ${this.port}`);
                console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
                console.log(`🔗 URL: http://localhost:${this.port}`);
                console.log(`🏥 API Health: http://localhost:${this.port}/api/health`);
            });
        }
        catch (error) {
            console.error('❌ Erro ao iniciar servidor:', error);
            process.exit(1);
        }
    }
    async stop() {
        try {
            await database_1.db.disconnect();
            console.log('✅ Servidor encerrado graciosamente');
        }
        catch (error) {
            console.error('❌ Erro ao encerrar servidor:', error);
        }
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map