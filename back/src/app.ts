import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { generalLimiter } from './middlewares/rateLimiter.middleware';
import { db } from './config/database';

// Carregar variáveis de ambiente
dotenv.config();

class App {
  public app: express.Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middlewares
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"]
        }
      }
    }));

    // CORS configuration
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
      optionsSuccessStatus: 200
    }));

    // Rate limiting
    this.app.use(generalLimiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging in development
    if (process.env.NODE_ENV === 'development') {
      this.app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
      });
    }
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api', routes);
    
    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Healthcare Survey API',
        version: '1.0.0',
        documentation: '/api/health'
      });
    });
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Conectar ao banco de dados
      await db.connect();
      
      // Iniciar servidor
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor rodando na porta ${this.port}`);
        console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 URL: http://localhost:${this.port}`);
        console.log(`🏥 API Health: http://localhost:${this.port}/api/health`);
      });
    } catch (error) {
      console.error('❌ Erro ao iniciar servidor:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await db.disconnect();
      console.log('✅ Servidor encerrado graciosamente');
    } catch (error) {
      console.error('❌ Erro ao encerrar servidor:', error);
    }
  }
}

export default App;
