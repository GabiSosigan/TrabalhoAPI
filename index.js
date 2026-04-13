const express = require('express');
const app = express();

app.use(express.json());

/**
 * Banco de dados em memória para armazenar os livros.
 * Cada livro tem um ID único, nome, preço, gênero e número de páginas.
 */

let livros = [
    { id: 1, nome: "O Pequeno Príncipe", preco: 20, genero: "Fábula", paginas: 120 },
    { id: 2, nome: "Os Sete Maridos de Evelyn Hugo", preco: 60, genero: "Romance", paginas: 360 },
    { id: 3, nome: "It: A Coisa", preco: 120, genero: "Terror", paginas: 1104 },
    { id: 4, nome: "O Hobbit", preco: 50, genero: "Fantasia", paginas: 340 },
    { id: 5, nome: "1984", preco: 30, genero: "Ficção Distópica", paginas: 400 },
    { id: 6, nome: "A Menina que Roubava Livros", preco: 25, genero: "Ficção Histórica", paginas: 480 },
    { id: 7, nome: "Jogos Vorazes", preco: 35, genero: "Ficção Científica", paginas: 384 },
    { id: 8, nome: "A Maldição do Mar", preco: 45, genero: "Fantasia", paginas: 320 },
    { id: 9, nome: "O Corvo", preco: 15, genero: "Poesia", paginas: 64 },
    { id: 10, nome: "Tudo ou Nada", preco: 40, genero: "Ficção", paginas: 400 }
];

let proximoId = 11;

/**
 * Endpoint GET que lista todos os livros
 */

app.get('/api/livros', (req, res) => {
    const {
        genero,
        preco_max,
        preco_min,
        ordem,
        direcao = 'asc',
        pagina = 1,
        limite = 10
    } = req.query;

    let resultado = [...livros];

    if (genero) {
        resultado = resultado.filter(livro =>
            livro.genero.toLowerCase() === genero.toLowerCase()
        );
    }

    if (preco_max !== undefined) {
        const valorMax = parseFloat(preco_max);
        if (!isNaN(valorMax)) {
            resultado = resultado.filter(livro => livro.preco <= valorMax);
        }
    }

    if (preco_min !== undefined) {
        const valorMin = parseFloat(preco_min);
        if (!isNaN(valorMin)) {
            resultado = resultado.filter(livro => livro.preco >= valorMin);
        }
    }

    if (ordem === 'preco' || ordem === 'nome') {
        resultado.sort((a, b) => {
            if (ordem === 'preco') {
                return direcao === 'desc' ? b.preco - a.preco : a.preco - b.preco;
            }

            return direcao === 'desc'
                ? b.nome.localeCompare(a.nome)
                : a.nome.localeCompare(b.nome);
        });
    }

    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;

    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

/**
 * Endpoint GET que pega livros pelo ID
 */

app.get('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(livro);
});

/**
 * Endpoint POST que cria um novo livro
 */

app.post('/api/livros', (req, res) => {
    const { nome, preco, genero, paginas } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "O nome é obrigatório" });
    }

    if (preco === undefined || isNaN(preco) || preco <= 0) {
        return res.status(400).json({ erro: "O preço deve ser um número válido maior que 0" });
    }

    if (!genero || genero.trim() === "") {
        return res.status(400).json({ erro: "O gênero é obrigatório" });
    }

    if (paginas === undefined || isNaN(paginas) || paginas <= 0) {
        return res.status(400).json({ erro: "As páginas devem ser um número válido maior que 0" });
    }

    const novoLivro = {
        id: proximoId++,
        nome: nome.trim(),
        preco: Number(preco),
        genero: genero.trim(),
        paginas: Number(paginas)
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

/**
 * Endpoint DELETE que remove um livro pelo ID
 */

app.delete('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const livroRemovido = livros.splice(index, 1)[0];

    res.json({
        mensagem: "Livro removido com sucesso",
        livro: livroRemovido
    });
});

/**
 * Endpoint PUT que atualiza um livro pelo ID
 */

app.put('/api/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const { nome, preco, genero, paginas } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "O nome é obrigatório" });
    }

    if (preco === undefined || isNaN(preco) || preco <= 0) {
        return res.status(400).json({ erro: "O preço deve ser um número válido maior que 0" });
    }

    if (!genero || genero.trim() === "") {
        return res.status(400).json({ erro: "O gênero é obrigatório" });
    }

    if (paginas === undefined || isNaN(paginas) || paginas <= 0) {
        return res.status(400).json({ erro: "As páginas devem ser um número válido maior que 0" });
    }

    livro.nome = nome.trim();
    livro.preco = Number(preco);
    livro.genero = genero.trim();
    livro.paginas = Number(paginas);

    res.json({
        mensagem: "Livro atualizado com sucesso",
        livro
    });
});

/**
 * Inicia o servidor na porta 3000
 */

app.listen(3000, () => {
    console.log('🚀 API rodando em http://localhost:3000');
});