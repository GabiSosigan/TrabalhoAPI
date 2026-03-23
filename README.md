# API de Livros

## Autor: Gabriela Sosigan Pavaneli Silva

## Endpoints

### 1- GET /api/livros
Método: GET
URL: http://localhost:3000/api/livros
Descrição: Lista todos os livros. Aceita filtros e ordenação

### 2- GET /api/livros/:id
Método: GET
URL: http://localhost:3000/api/livros/1
Body: não possui

{
  "id": 1,
  "nome": "O Pequeno Príncipe",
  "preco": 20,
  "genero": "Fábula",
  "paginas": 120
}

### 3- POST /api/livros
Método: POST
URL: http://localhost:3000/api/livros
Body:
{
  "nome": "O Pequeno Príncipe",
  "preco": 20,
  "genero": "Fábula",
  "paginas": 120
}

## Exemplos de requisição no Postman
GET http://localhost:3000/api/livros
GET http://localhost:3000/api/livros/1
POST http://localhost:3000/api/livros

## Capturas de tela dos testes

## Validações implementadas
No POST/api/livros
nome obrigatório
preco maior que 0
genero obrigatório
paginas maior que 0
