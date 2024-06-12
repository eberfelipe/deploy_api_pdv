\# PDV API

Este é um projeto de uma API para um PDV (Frente de Caixa). O objetivo é gerenciar categorias, usuários e permitir operações de login e registro de usuários.

\## Requisitos

- Node.js
- PostgreSQL
- npm (Node Package Manager)

\## Instalação

1. Clone o repositório:

\```bash

git clone https://github.com/seu-usuario/seu-repositorio.git

cd seu-repositorio

Instale as dependências:

bash

Copiar código

npm install

Configure o arquivo .env:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

plaintext

Copiar código

DATABASE\_URL=postgres://seu\_usuario:sua\_senha@host\_do\_postgresql:5432/nome\_do\_seu\_banco

ACCESS\_TOKEN\_SECRET=sua\_chave\_secreta

PORT=3000

Configure o banco de dados:

Crie o banco de dados pdv no PostgreSQL e execute as migrações e seeds:

bash

Copiar código

npx knex migrate:latest

npx knex seed:run

Estrutura do Projeto

plaintext

Copiar código

pdv-api/

│

├── config/

│   └── database.js

│

├── controllers/

│   ├── categoryController.js

│   └── userController.js

│

├── middlewares/

│   └── authMiddleware.js

│

├── migrations/

│   ├── timestamp\_create\_usuarios\_table.js

│   └── timestamp\_create\_categorias\_table.js

│

├── routes/

│   ├── categoryRoutes.js

│   └── userRoutes.js

│

├── seeds/

│   └── timestamp\_seed\_categorias.js

│

├── src/

│   └── index.js

├── knexfile.js

├── .env

├── .gitignore

└── package.json

Endpoints

Registrar Usuário

Método: POST

URL: /usuarios/register

Body (JSON):

json

Copiar código

{

"nome": "Seu Nome",

"email": "seuemail@exemplo.com",

"senha": "suaSenha"

}

Resposta:

json

Copiar código

{

"id": 1,

"message": "Usuário cadastrado com sucesso"

}

Login de Usuário

Método: POST

URL: /usuarios/login

Body (JSON):

json

Copiar código

{

"email": "seuemail@exemplo.com",

"senha": "suaSenha"

}

Resposta:

json

Copiar código

{

"accessToken": "token\_jwt\_aqui"

}

Obter Perfil do Usuário

Método: GET

URL: /usuarios/profile

Headers:

Authorization: Bearer <token\_jwt\_aqui>

Resposta:

json

Copiar código

{

"id": 1,

"nome": "Seu Nome",

"email": "seuemail@exemplo.com"

}

Atualizar Perfil do Usuário

Método: PUT

URL: /usuarios

Headers:

Authorization: Bearer <token\_jwt\_aqui>

Body (JSON):

json

Copiar código

{

"nome": "Nome Atualizado",

"email": "emailatualizado@exemplo.com",

"senha": "novaSenha"

}

Resposta:

json

Copiar código

{

"message": "Perfil atualizado com sucesso"

}

Listar Categorias

Método: GET

URL: /categorias

Resposta:

json

Copiar código

[

{ "id": 1, "descricao": "Informática" },

{ "id": 2, "descricao": "Celulares" },

{ "id": 3, "descricao": "Beleza e Perfumaria" },

{ "id": 4, "descricao": "Mercado" },

{ "id": 5, "descricao": "Livros e Papelaria" },

{ "id": 6, "descricao": "Brinquedos" },

{ "id": 7, "descricao": "Moda" },

{ "id": 8, "descricao": "Bebê" },

{ "id": 9, "descricao": "Games" }

]

Executando a API

Para iniciar a API em modo de desenvolvimento, use:

bash

Copiar código

npm run dev

A API estará disponível em http://localhost:3000.

Testando com Insomnia

Registrar Usuário

Método: POST

URL: http://localhost:3000/usuarios/register

Body: JSON

json

Copiar código

{

"nome": "Seu Nome",

"email": "seuemail@exemplo.com",

"senha": "suaSenha"

}

Login de Usuário

Método: POST

URL: http://localhost:3000/usuarios/login

Body: JSON

json

Copiar código

{

"email": "seuemail@exemplo.com",

"senha": "suaSenha"

}

Obter Perfil do Usuário

Método: GET

URL: http://localhost:3000/usuarios/profile

Headers:

Authorization: Bearer <token\_jwt\_aqui>

Atualizar Perfil do Usuário

Método: PUT

URL: http://localhost:3000/usuarios

Headers:

Authorization: Bearer <token\_jwt\_aqui>

Body: JSON

json

Copiar código

{

"nome": "Nome Atualizado",

"email": "emailatualizado@exemplo.com",

"senha": "novaSenha"

}

Listar Categorias

Método: GET

URL: http://localhost:3000/categorias

Contribuição

Faça um fork do projeto.

Crie uma nova branch: git checkout -b minha-nova-feature

Faça suas alterações e commit: git commit -m 'Adiciona minha nova feature'

Envie para o seu fork: git push origin minha-nova-feature

Envie um Pull Request.

Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

bash

Copiar código

\### Conclusão

Este README detalhado cobre a configuração do projeto, a estrutura do projeto, os endpoints da API e como testar usando Insomnia. Se precisar de mais alguma coisa, estou à disposição!