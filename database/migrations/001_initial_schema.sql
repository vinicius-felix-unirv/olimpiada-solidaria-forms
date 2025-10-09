-- Criação do banco de dados para o sistema de questionários de saúde
-- Execute este script no PostgreSQL antes de iniciar a aplicação

-- Conectar como superuser (postgres) para criar o banco
-- psql -U postgres

-- Criar banco de dados
CREATE DATABASE healthcare_survey;

-- Conectar ao banco criado
-- \c healthcare_survey;

-- Criar extensão para UUID se necessário (opcional)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (para referência futura)
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    crm VARCHAR(50),
    instituicao VARCHAR(255),
    telefone VARCHAR(20),
    especialidade VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de formulários
CREATE TABLE IF NOT EXISTS formulario (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de questões
CREATE TABLE IF NOT EXISTS questao (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('texto', 'radio', 'checkbox')),
    formulario_id INTEGER NOT NULL REFERENCES formulario(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de alternativas (para questões de múltipla escolha)
CREATE TABLE IF NOT EXISTS alternativa (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    questao_id INTEGER NOT NULL REFERENCES questao(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de respostas
CREATE TABLE IF NOT EXISTS respostas (
    id SERIAL PRIMARY KEY,
    numero_usuario INTEGER NOT NULL, -- Identificador único do respondente na sessão
    formulario_id INTEGER NOT NULL REFERENCES formulario(id) ON DELETE CASCADE,
    questao_id INTEGER NOT NULL REFERENCES questao(id) ON DELETE CASCADE,
    alternativa_id INTEGER REFERENCES alternativa(id) ON DELETE CASCADE, -- NULL para questões de texto
    resposta_texto TEXT, -- Para armazenar respostas de texto livre
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_questao_formulario_id ON questao(formulario_id);
CREATE INDEX idx_alternativa_questao_id ON alternativa(questao_id);
CREATE INDEX idx_respostas_formulario_id ON respostas(formulario_id);
CREATE INDEX idx_respostas_questao_id ON respostas(questao_id);
CREATE INDEX idx_respostas_numero_usuario ON respostas(numero_usuario);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_usuario_updated_at BEFORE UPDATE ON usuario
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formulario_updated_at BEFORE UPDATE ON formulario
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questao_updated_at BEFORE UPDATE ON questao
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alternativa_updated_at BEFORE UPDATE ON alternativa
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
