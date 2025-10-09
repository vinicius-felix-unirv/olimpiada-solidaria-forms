import { Pool } from 'pg';
import { IFormulario, IFormularioCompleto, ICreateFormularioRequest, IUpdateFormularioRequest } from './formulario.model';
export declare class FormularioRepository {
    private readonly db;
    constructor(db: Pool);
    findAll(): Promise<IFormulario[]>;
    findById(id: number): Promise<IFormulario | null>;
    findByIdComplete(id: number): Promise<IFormularioCompleto | null>;
    create(data: ICreateFormularioRequest): Promise<IFormularioCompleto>;
    update(id: number, data: IUpdateFormularioRequest): Promise<IFormularioCompleto | null>;
    delete(id: number): Promise<boolean>;
    private findQuestoesByFormularioId;
    private findAlternativasByQuestaoId;
    private createQuestao;
    private updateQuestoes;
    private processQuestaoAction;
    private deleteQuestao;
    private updateQuestaoData;
    private buildUpdateQuery;
    private updateAlternativas;
}
//# sourceMappingURL=formulario.repository.d.ts.map