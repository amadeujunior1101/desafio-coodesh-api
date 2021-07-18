# API em NodeJs

Simples aplicação que manipula array de pessoas atraves dos metodos: index, store, update e delete

## Pacotes inclusos

1. Typescript
2. Express
3. Dotenv
4. Sqlite 3
5. Ajv
6. Cors
7. JsonSchema

Atenção:

    criar arquivo .env na raiz do projeto copiando os valores do .env.exemple
    dados migrados para db.sqlite, prontos para serem consumidos no frontend

Clonar do repositório:

    git clone git@github.com/amadeujunior1102/desafio-coodesh/desafio-coodesh-api.git

## Development
    yarn dev

### Árvore de arquivos

```
├── dist
|
├── src
│   ├── config
│   │   └── database
|   |       └── migrations
|   |           └── users.ts
|   |       └── connection.ts
|   |       └── db.sqlite
│   │   └── db.ts
|   |
│   ├── Controllers
│   │   └── Http
|   |       └── User
|   |           └── UserController.ts
|   |           └── schema.ts
|   |           └── user.json
|   |           └── types.ts
│   ├── routes.ts
|   |
|   |server.ts
|   |
├── .env.exemple
├── .gitignore
├── environment.config.ts
├── knexfile.js
├── packege.json
├── tsconfig.json
├── README.md

```
