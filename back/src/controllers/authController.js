const jwt = require('jsonwebtoken');


const mockUsers = [
  {
    id: 1,
    nome: "Dr. João Pedro",
    email: "joao.pedro@email.com",
    senha: "senha123", 
    crm: "12345-GO"
  },
  {
    id: 2,
    nome: "Dra. Maria Eduarda",
    email: "maria.eduarda@email.com",
    senha: "outrasenha456",
    crm: "54321-GO"
  }
];


const login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const usuario = mockUsers.find(u => u.email === email);

  if (!usuario) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  if (usuario.senha !== senha) {
    return res.status(401).json({ message: 'Email ou senha inválidos.' });
  }

  const payload = {
    id: usuario.id,
    nome: usuario.nome,
    crm: usuario.crm
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  
  res.status(200).json({ 
    message: 'Login bem-sucedido!',
    token: token 
  });
};

module.exports = {
  login,
};