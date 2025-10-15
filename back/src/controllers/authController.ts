// authController.ts

import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import type { Usuario, AuthPayload } from '../types/Usuario.js'; 

async function findUserByEmail(email: string): Promise<Usuario | undefined> {
    
   //preciso do banco
    
    return undefined;
}

const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, senha }: { email?: string, senha?: string } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usuario: Usuario | undefined = await findUserByEmail(email); 

    if (!usuario) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    if (usuario.senha !== senha) { 
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const payload: AuthPayload = {
        id: usuario.id,
        nome: usuario.nome,
        crm: usuario.crm,
        especialidade: usuario.especialidade
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '8h' }
    );

    return res.status(200).json({
        message: 'Login bem-sucedido!',
        token: token
    });
};

export {
    login,
};