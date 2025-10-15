// index.ts

import 'dotenv/config'; 
import authRoutes from './src/routes/authRoutes.js';
import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API do INFOMED no ar!');
});

app.use('/login', authRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});