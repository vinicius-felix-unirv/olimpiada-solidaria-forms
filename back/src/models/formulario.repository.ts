import { Pool } from 'pg';
import { 
  IFormulario, 
  IQuestao, 
  IAlternativa, 
  IFormularioCompleto,
  ICreateFormularioRequest,
  IUpdateFormularioRequest
} from './formulario.model';

export class FormularioRepository {
  constructor(private readonly db: Pool) {}

  async findAll(): Promise<IFormulario[]> {
    const query = 'SELECT * FROM formulario ORDER BY created_at DESC';
    const result = await this.db.query(query);
    return result.rows;
  }

  async findById(id: number): Promise<IFormulario | null> {
    const query = 'SELECT * FROM formulario WHERE id = $1';
    const result = await this.db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findByIdComplete(id: number): Promise<IFormularioCompleto | null> {
    const formulario = await this.findById(id);
    if (!formulario) return null;

    const questoes = await this.findQuestoesByFormularioId(id);
    const questoesCompletas = await Promise.all(
      questoes.map(async (questao) => ({
        ...questao,
        alternativas: await this.findAlternativasByQuestaoId(questao.id!)
      }))
    );

    return {
      ...formulario,
      questoes: questoesCompletas
    };
  }

  async create(data: ICreateFormularioRequest): Promise<IFormularioCompleto> {
    const client = await this.db.connect();
    
    try {
      await client.query('BEGIN');

      // Criar formulário
      const formularioQuery = `
        INSERT INTO formulario (titulo, descricao, created_at, updated_at) 
        VALUES ($1, $2, NOW(), NOW()) 
        RETURNING *
      `;
      const formularioResult = await client.query(formularioQuery, [
        data.titulo, 
        data.descricao || null
      ]);
      const formulario = formularioResult.rows[0];

      // Criar questões
      const questoes = [];
      for (const questaoData of data.questoes) {
        const questao = await this.createQuestao(client, {
          ...questaoData,
          formulario_id: formulario.id
        });
        questoes.push(questao);
      }

      await client.query('COMMIT');
      
      return {
        ...formulario,
        questoes
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id: number, data: IUpdateFormularioRequest): Promise<IFormularioCompleto | null> {
    const client = await this.db.connect();
    
    try {
      await client.query('BEGIN');

      // Atualizar formulário
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      if (data.titulo !== undefined) {
        updateFields.push(`titulo = $${paramCount}`);
        values.push(data.titulo);
        paramCount++;
      }

      if (data.descricao !== undefined) {
        updateFields.push(`descricao = $${paramCount}`);
        values.push(data.descricao);
        paramCount++;
      }

      updateFields.push(`updated_at = NOW()`);
      values.push(id);

      const formularioQuery = `
        UPDATE formulario 
        SET ${updateFields.join(', ')} 
        WHERE id = $${paramCount} 
        RETURNING *
      `;
      
      const formularioResult = await client.query(formularioQuery, values);
      if (formularioResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return null;
      }

      // Atualizar questões se fornecidas
      if (data.questoes) {
        await this.updateQuestoes(client, id, data.questoes);
      }

      await client.query('COMMIT');
      
      const formularioCompleto = await this.findByIdComplete(id);
      return formularioCompleto;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await this.db.connect();
    
    try {
      await client.query('BEGIN');

      // Deletar alternativas das questões do formulário
      await client.query(`
        DELETE FROM alternativa 
        WHERE questao_id IN (
          SELECT id FROM questao WHERE formulario_id = $1
        )
      `, [id]);

      // Deletar questões do formulário
      await client.query('DELETE FROM questao WHERE formulario_id = $1', [id]);

      // Deletar formulário
      const result = await client.query('DELETE FROM formulario WHERE id = $1', [id]);

      await client.query('COMMIT');
      
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  private async findQuestoesByFormularioId(formularioId: number): Promise<IQuestao[]> {
    const query = 'SELECT * FROM questao WHERE formulario_id = $1 ORDER BY id';
    const result = await this.db.query(query, [formularioId]);
    return result.rows;
  }

  private async findAlternativasByQuestaoId(questaoId: number): Promise<IAlternativa[]> {
    const query = 'SELECT * FROM alternativa WHERE questao_id = $1 ORDER BY id';
    const result = await this.db.query(query, [questaoId]);
    return result.rows;
  }

  private async createQuestao(client: any, questaoData: any) {
    const questaoQuery = `
      INSERT INTO questao (descricao, tipo, formulario_id, created_at, updated_at) 
      VALUES ($1, $2, $3, NOW(), NOW()) 
      RETURNING *
    `;
    const questaoResult = await client.query(questaoQuery, [
      questaoData.descricao,
      questaoData.tipo,
      questaoData.formulario_id
    ]);
    const questao = questaoResult.rows[0];

    // Criar alternativas se existirem
    const alternativas = [];
    if (questaoData.alternativas && questaoData.alternativas.length > 0) {
      for (const alternativaData of questaoData.alternativas) {
        const alternativaQuery = `
          INSERT INTO alternativa (descricao, questao_id, created_at, updated_at) 
          VALUES ($1, $2, NOW(), NOW()) 
          RETURNING *
        `;
        const alternativaResult = await client.query(alternativaQuery, [
          alternativaData.descricao,
          questao.id
        ]);
        alternativas.push(alternativaResult.rows[0]);
      }
    }

    return {
      ...questao,
      alternativas
    };
  }

  private async updateQuestoes(client: any, formularioId: number, questoesData: any[]) {
    for (const questaoData of questoesData) {
      await this.processQuestaoAction(client, formularioId, questaoData);
    }
  }

  private async processQuestaoAction(client: any, formularioId: number, questaoData: any) {
    switch (questaoData._action) {
      case 'delete':
        await this.deleteQuestao(client, questaoData);
        break;
      case 'create':
        await this.createQuestao(client, { ...questaoData, formulario_id: formularioId });
        break;
      case 'update':
        await this.updateQuestaoData(client, questaoData);
        break;
    }
  }

  private async deleteQuestao(client: any, questaoData: any) {
    if (questaoData.id) {
      await client.query('DELETE FROM alternativa WHERE questao_id = $1', [questaoData.id]);
      await client.query('DELETE FROM questao WHERE id = $1', [questaoData.id]);
    }
  }

  private async updateQuestaoData(client: any, questaoData: any) {
    if (!questaoData.id) return;

    const { updateQuery, values } = this.buildUpdateQuery(questaoData);
    
    if (values.length > 1) {
      await client.query(updateQuery, values);
    }

    if (questaoData.alternativas) {
      await this.updateAlternativas(client, questaoData.id, questaoData.alternativas);
    }
  }

  private buildUpdateQuery(questaoData: any) {
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (questaoData.descricao !== undefined) {
      updateFields.push(`descricao = $${paramCount}`);
      values.push(questaoData.descricao);
      paramCount++;
    }

    if (questaoData.tipo !== undefined) {
      updateFields.push(`tipo = $${paramCount}`);
      values.push(questaoData.tipo);
      paramCount++;
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(questaoData.id);

    const updateQuery = `
      UPDATE questao 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount}
    `;

    return { updateQuery, values };
  }

  private async updateAlternativas(client: any, questaoId: number, alternativasData: any[]) {
    for (const alternativaData of alternativasData) {
      if (alternativaData._action === 'delete' && alternativaData.id) {
        await client.query('DELETE FROM alternativa WHERE id = $1', [alternativaData.id]);
      } else if (alternativaData._action === 'create') {
        const alternativaQuery = `
          INSERT INTO alternativa (descricao, questao_id, created_at, updated_at) 
          VALUES ($1, $2, NOW(), NOW()) 
          RETURNING *
        `;
        await client.query(alternativaQuery, [alternativaData.descricao, questaoId]);
      } else if (alternativaData._action === 'update' && alternativaData.id) {
        const updateQuery = `
          UPDATE alternativa 
          SET descricao = $1, updated_at = NOW() 
          WHERE id = $2
        `;
        await client.query(updateQuery, [alternativaData.descricao, alternativaData.id]);
      }
    }
  }
}
