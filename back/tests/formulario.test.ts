import request from 'supertest';
import App from '../src/app';

describe('Formulario API', () => {
  let app: App;
  let server: any;

  beforeAll(async () => {
    app = new App();
    server = app.app;
  });

  afterAll(async () => {
    await app.stop();
  });

  describe('GET /api/health', () => {
    it('should return API health status', async () => {
      const response = await request(server)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/formularios', () => {
    it('should return list of formularios', async () => {
      const response = await request(server)
        .get('/api/formularios')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/formularios', () => {
    it('should create a new formulario', async () => {
      const novoFormulario = {
        titulo: 'Teste de Formulário',
        descricao: 'Formulário para testes unitários',
        questoes: [
          {
            descricao: 'Qual é seu nome?',
            tipo: 'texto'
          },
          {
            descricao: 'Qual sua idade?',
            tipo: 'radio',
            alternativas: [
              { descricao: '18-25 anos' },
              { descricao: '26-35 anos' }
            ]
          }
        ]
      };

      const response = await request(server)
        .post('/api/formularios')
        .send(novoFormulario)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.titulo).toBe(novoFormulario.titulo);
    });

    it('should return validation error for invalid data', async () => {
      const formularioInvalido = {
        titulo: 'AB', // Muito curto
        questoes: [] // Sem questões
      };

      const response = await request(server)
        .post('/api/formularios')
        .send(formularioInvalido)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('errors');
    });
  });
});
