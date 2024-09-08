const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Simular um banco de dados simples para usuários e tutorias
const users = [{ username: 'admin', password: 'admin' }];
const tutorias = [];

// Rota para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
});

// Rota para salvar tutoria
app.post('/tutoria', (req, res) => {
    const { nomeAluno, dataHora, ...rest } = req.body;
    tutorias.push({ nomeAluno, dataHora, ...rest });
    res.status(201).json({ message: 'Tutoria salva com sucesso!' });
});

// Rota para listar tutorias
app.get('/tutoria', (req, res) => {
    res.json(tutorias);
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
