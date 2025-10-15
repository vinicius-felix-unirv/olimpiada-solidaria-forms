import type { Request } from 'express'; 

export class Usuario {
    public id: number;
    public nome: string;
    public email: string;
    public senha: string;
    public crm: string;
    public instituicao: string;
    public telefone: string;
    public especialidade: string;

    constructor(
        id: number,
        nome: string,
        email: string,
        senha: string,
        crm: string,
        instituicao: string,
        telefone: string,
        especialidade: string
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.crm = crm;
        this.instituicao = instituicao;
        this.telefone = telefone;
        this.especialidade = especialidade;
    }
}

export type AuthPayload = Pick<Usuario, 'id' | 'nome' | 'crm' | 'especialidade'>;

export interface AuthRequest extends Request {
    user?: AuthPayload;
}