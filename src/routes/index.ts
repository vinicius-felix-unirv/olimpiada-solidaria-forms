import { Router } from 'express';
import formularioRoutes from './formulario.routes';

const router = Router();

// Formularios routes
router.use('/formularios', formularioRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
