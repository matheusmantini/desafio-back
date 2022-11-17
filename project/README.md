<h1 align="center"> Projeto E-commerce System - Back-end </h1>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![REST](https://img.shields.io/badge/REST%20API-%231572B6.svg?style=for-the-badge)

<p align="center">> Status do Projeto: Concluído :heavy_check_mark:</p>
    
## Funcionalidades

- **Usuários**

- [x] Criar novo usuário
- [x] Listar todos os usuários criados
- [x] Listar um usuário específico pelo id
- [x] Editar a senha de um usuário específico pelo id

- **Produtos**

- [x] Criar novo produto
- [x] Listar todos os produto criados
- [x] Listar um produto específico pelo id
- [x] Editar o preço e/ou url da foto de um produto específico pelo id
- [x] Deletar produto específico pelo id

- **Compras**

- [x] Criar nova compra
- [x] Listar todas as compra cadastradas
- [x] Listar uma compra específica pelo id
- [x] Deletar compra específica pelo id

- **Itens da Compra**

- [x] Criar novo item de compra
- [x] Listar todos os itens de compras cadastrados
- [x] Listar um item de compra específico pelo id
- [x] Editar a quantidade de um item de compra específico pelo id
- [x] Deletar item de compra

## Documentação da API com Swagger: :page_facing_up:	
http://localhost:3001/api

## Como rodar a aplicação:

1. No terminal, clone o projeto:
> git clone https://github.com/matheusmantini/desafio-back.git

2. Entre na pasta do projeto:
> cd desafio-back/project

3. Instale as dependências:
> npm install

4. Crie um container para rodar o PostgreSQL
> docker-compose up

5. Configure o arquivo .env com as informações do banco gerado

6. Inicie o prisma
> npx prisma init

7. Faça a migração das tabelas para o seu banco de dados
> npx prisma migrate dev

8. Execute a aplicação:
> npm run start

9. Pronto, agora é possível acessar a aplicação a partir da rota http://localhost:3001/api

## Desenvolvedor

| [<img src="https://avatars.githubusercontent.com/u/71985890?v=4" width=115 > <br> <sub> Matheus Mantini </sub>](https://github.com/matheusmantini) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |