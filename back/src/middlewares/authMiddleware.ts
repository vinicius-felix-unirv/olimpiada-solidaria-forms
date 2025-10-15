// authMiddleware.ts

import type { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import type { AuthRequest, AuthPayload } from '../types/Usuario.js';

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

const parts = authHeader.split(' ') as [string, string]; 
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;

    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;