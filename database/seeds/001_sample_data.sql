-- Dados de exemplo para testes
-- Execute após rodar o script de migração principal

-- Inserir formulário de exemplo
INSERT INTO formulario (titulo, descricao) VALUES 
('Avaliação de Saúde Básica', 'Questionário para levantamento de dados básicos de saúde do paciente');

-- Inserir questões de exemplo
INSERT INTO questao (descricao, tipo, formulario_id) VALUES 
('Qual é o seu nome completo?', 'texto', 1),
('Qual é a sua faixa etária?', 'radio', 1),
('Quais sintomas você está sentindo? (pode marcar mais de uma opção)', 'checkbox', 1),
('Descreva detalhadamente seus sintomas:', 'texto', 1);

-- Inserir alternativas para questão de faixa etária (radio)
INSERT INTO alternativa (descricao, questao_id) VALUES 
('18-25 anos', 2),
('26-35 anos', 2),
('36-45 anos', 2),
('46-60 anos', 2),
('Acima de 60 anos', 2);

-- Inserir alternativas para questão de sintomas (checkbox)
INSERT INTO alternativa (descricao, questao_id) VALUES 
('Dor de cabeça', 3),
('Febre', 3),
('Tosse', 3),
('Dor no corpo', 3),
('Náusea', 3),
('Fadiga', 3);

-- Inserir outro formulário de exemplo
INSERT INTO formulario (titulo, descricao) VALUES 
('Avaliação Nutricional', 'Questionário para avaliação dos hábitos alimentares');

-- Inserir questões para o segundo formulário
INSERT INTO questao (descricao, tipo, formulario_id) VALUES 
('Quantas refeições você faz por dia?', 'radio', 2),
('Quais alimentos você consome regularmente?', 'checkbox', 2),
('Descreva sua dieta típica durante uma semana:', 'texto', 2);

-- Alternativas para refeições por dia
INSERT INTO alternativa (descricao, questao_id) VALUES 
('1-2 refeições', 5),
('3 refeições', 5),
('4-5 refeições', 5),
('Mais de 5 refeições', 5);

-- Alternativas para alimentos consumidos
INSERT INTO alternativa (descricao, questao_id) VALUES 
('Frutas', 6),
('Vegetais', 6),
('Carnes', 6),
('Laticínios', 6),
('Grãos integrais', 6),
('Fast food', 6),
('Doces', 6);
