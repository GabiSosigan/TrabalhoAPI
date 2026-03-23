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
Teste GET/api/livros
<img width="1109" height="1000" alt="testeGETlivros" src="https://github.com/user-attachments/assets/402fdf65-053d-4c0d-beb1-73fc355840b9" />

Teste GET/api/livros/2
<img width="1100" height="407" alt="testeGETlivrosID" src="https://github.com/user-attachments/assets/2a11a36d-a30c-4a6f-8cff-9064f8c95c2f" />

Teste POST completo
<img width="1094" height="691" alt="testePOST" src="https://github.com/user-attachments/assets/af8df9f5-0c22-45b2-9018-4f78f6ce4d34" />

Teste POST sem nome
<img width="1092" height="603" alt="testePOSTsemNome" src="https://github.com/user-attachments/assets/1f0f502b-9335-45e3-9457-d0dbd7bda734" />

Teste POST sem páginas
<img width="1097" height="638" alt="testePOSTpagina0" src="https://github.com/user-attachments/assets/c7305e15-77af-4fef-b588-15b91126d272" />

Teste POST sem gênero
<img width="1094" height="623" alt="testePOSTsemGenero" src="https://github.com/user-attachments/assets/20bf28fb-57e6-46dc-bc50-4b52b2d065dd" />

Teste POST sem preço
<img width="1095" height="622" alt="testePOSTpreco0" src="https://github.com/user-attachments/assets/536b4cdc-32bb-44a9-996f-ee12d2980a9a" />

## Validações implementadas
No POST/api/livros
nome obrigatório
preco maior que 0
genero obrigatório
paginas maior que 0
