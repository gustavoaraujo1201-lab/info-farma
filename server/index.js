const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

// Rota para dados de medicamentos
app.get('/api/medicamentos', (req, res) => {
    const medicamentos = require('../data/medicamentos.json');
    const { q, tarja, classe } = req.query;

    let result = medicamentos;

    if (q) {
        const search = q.toLowerCase();
        result = result.filter(m =>
            m.nome.toLowerCase().includes(search) ||
            m.ativo.toLowerCase().includes(search) ||
            (m.obs && m.obs.toLowerCase().includes(search))
        );
    }
    if (tarja) result = result.filter(m => m.tarja === tarja);
    if (classe) result = result.filter(m => m.classe === classe);

    res.json(result);
});

// Rota raiz → login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

// Rotas das páginas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 Info-Farma rodando em: http://localhost:${PORT}\n`);
});
