export interface IFormulario {
    id?: number;
    titulo: string;
    descricao?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface IQuestao {
    id?: number;
    descricao: string;
    tipo: TipoQuestao;
    formulario_id: number;
    created_at?: Date;
    updated_at?: Date;
}
export interface IAlternativa {
    id?: number;
    descricao: string;
    questao_id: number;
    created_at?: Date;
    updated_at?: Date;
}
export declare enum TipoQuestao {
    TEXTO = "texto",
    RADIO = "radio",
    CHECKBOX = "checkbox"
}
export interface IFormularioCompleto extends IFormulario {
    questoes: IQuestaoCompleta[];
}
export interface IQuestaoCompleta extends IQuestao {
    alternativas: IAlternativa[];
}
export interface ICreateFormularioRequest {
    titulo: string;
    descricao?: string;
    questoes: ICreateQuestaoRequest[];
}
export interface ICreateQuestaoRequest {
    descricao: string;
    tipo: TipoQuestao;
    alternativas?: ICreateAlternativaRequest[];
}
export interface ICreateAlternativaRequest {
    descricao: string;
}
export interface IUpdateFormularioRequest {
    titulo?: string;
    descricao?: string;
    questoes?: IUpdateQuestaoRequest[];
}
export interface IUpdateQuestaoRequest {
    id?: number;
    descricao?: string;
    tipo?: TipoQuestao;
    alternativas?: IUpdateAlternativaRequest[];
    _action?: 'create' | 'update' | 'delete';
}
export interface IUpdateAlternativaRequest {
    id?: number;
    descricao?: string;
    _action?: 'create' | 'update' | 'delete';
}
//# sourceMappingURL=formulario.model.d.ts.map