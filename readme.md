
PDV API
Descrição:

Este projeto desenvolve uma API para um sistema de PDV (Ponto de Venda), com foco na gestão de categorias, usuários e autenticação.

Tecnologias:

Node.js
PostgreSQL
npm (Node Package Manager)
Requisitos:

Ter o Node.js instalado
Ter o PostgreSQL instalado e configurado
Ter o npm instalado globalmente
Instalação:

Clone o repositório:
Bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Instale as dependências:
Bash
npm install

Configure o arquivo .env:
Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente:
DATABASE_URL=postgres://seu_usuario:sua_senha@host_do_postgresql:5432/nome_do_seu_banco
ACCESS_TOKEN_SECRET=sua_chave_secreta
PORT=3000

Configure o banco de dados:
Crie o banco de dados pdv no PostgreSQL e execute as migrações e seeds:

Bash
npx knex migrate:latest
npx knex seed:run

Estrutura do Projeto:

pdv-api/
│
├── config/
│  └── database.js
│
├── controllers/
│  ├── categoryController.js
│  └── userController.js
│
├── middlewares/
│  └── authMiddleware.js
│
├── migrations/
│  ├── timestamp_create_usuarios_table.js
│  └── timestamp_create_categorias_table.js
│
├── routes/
│  ├── categoryRoutes.js
│  └── userRoutes.js
│
├── seeds/
│  └── timestamp_seed_categorias.js
│
├── src/
│  └── index.js
├── knexfile.js
├── .env
├── .gitignore
└── package.json

Observações:

Substitua seu-usuario, sua_senha, host_do_postgresql e nome_do_seu_banco pelas suas credenciais de banco de dados.
A variável ACCESS_TOKEN_SECRET deve ser uma string única e segura para gerar tokens de autenticação.
O projeto utiliza o Knex.js para gerenciar migrações e seeds do banco de dados.

Endpoints
Registrar Usuário
Método: POST
URL: /usuarios/register

Body (JSON):

JSON
{
  "nome": "Seu Nome",
  "email": "seuemail@exemplo.com",
  "senha": "suaSenha"
}

Resposta:

JSON
{
  "id": 1,
  "message": "Usuário cadastrado com sucesso"
}

Login de Usuário
Método: POST
URL: /usuarios/login

Body (JSON):

JSON
{
  "email": "seuemail@exemplo.com",
  "senha": "suaSenha"
}

Resposta:

JSON
{
  "accessToken": "token_jwt_aqui"
}

Obter Perfil do Usuário
Método: GET
URL: /usuarios/profile

Headers:

Authorization: Bearer <token_jwt_aqui>

Resposta:

JSON
{
  "id": 1,
  "nome": "Seu Nome",
  "email": "seuemail@exemplo.com"
}

Atualizar Perfil do Usuário
Método: PUT
URL: /usuarios

Headers:

Authorization: Bearer <token_jwt_aqui>

Body (JSON):

JSON
{
  "nome": "Nome Atualizado",
  "email": "emailatualizado@exemplo.com",
  "senha": "novaSenha"
}

Resposta:

JSON
{
  "message": "Perfil atualizado com sucesso"
}

Listar Categorias
Método: GET
URL: /categorias

Resposta:

JSON
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
Para executar a API em modo de desenvolvimento, utilize o seguinte comando:

Bash
npm run dev

A API estará acessível em http://localhost:3000.

Observações:

Substitua suaSenha por sua senha real nos exemplos acima.
O token JWT recebido no login deve ser utilizado na autorização para acessar os endpoints privados (/usuarios/profile e /usuarios).
Para mais informações sobre como usar a API, consulte a documentação do código-fonte.

Testando com Insomnia
Observações:

Certifique-se de ter iniciado a API em modo de desenvolvimento, conforme instruído na seção "Executando a API".
Substitua <token_jwt_aqui> pelo token JWT real obtido após o login de um usuário.
Registrar Usuário:

Abra o Insomnia e crie uma nova requisição.
Defina o método como POST e a URL como http://localhost:3000/usuarios/register.
No cabeçalho "Body", selecione a opção "JSON" e cole o seguinte payload:
JSON
{
  "nome": "Seu Nome",
  "email": "seuemail@exemplo.com",
  "senha": "suaSenha"
}

Clique em "Enviar" para realizar a requisição.
A resposta deve conter o código de status 201 e um JSON com o ID do usuário cadastrado e a mensagem "Usuário cadastrado com sucesso".
Login de Usuário:

Crie uma nova requisição no Insomnia.
Defina o método como POST e a URL como http://localhost:3000/usuarios/login.
No cabeçalho "Body", selecione a opção "JSON" e cole o seguinte payload:
JSON
{
  "email": "seuemail@exemplo.com",
  "senha": "suaSenha"
}

Clique em "Enviar" para realizar a requisição.
A resposta deve conter o código de status 200 e um JSON com o token JWT no campo "accessToken". Armazene este token para as próximas requisições.
Obter Perfil do Usuário:

Crie uma nova requisição no Insomnia.
Defina o método como GET e a URL como http://localhost:3000/usuarios/profile.
No cabeçalho "Authorization", adicione o tipo de autenticação como Bearer e o token JWT obtido no login no campo "Token".
Clique em "Enviar" para realizar a requisição.
A resposta deve conter o código de status 200 e um JSON com as informações do perfil do usuário, incluindo ID, nome e email.
Atualizar Perfil do Usuário:

Crie uma nova requisição no Insomnia.
Defina o método como PUT e a URL como http://localhost:3000/usuarios.
No cabeçalho "Authorization", adicione o tipo de autenticação como Bearer e o token JWT obtido no login no campo "Token".
No cabeçalho "Body", selecione a opção "JSON" e cole o seguinte payload, substituindo os valores com as suas novas informações:
JSON
{
  "nome": "Nome Atualizado",
  "email": "emailatualizado@exemplo.com",
  "senha": "novaSenha"
}

Clique em "Enviar" para realizar a requisição.
A resposta deve conter o código de status 200 e um JSON com a mensagem "Perfil atualizado com sucesso".
Listar Categorias:

Crie uma nova requisição no Insomnia.
Defina o método como GET e a URL como http://localhost:3000/categorias.
Clique em "Enviar" para realizar a requisição.
A resposta deve conter o código de status 200 e um array JSON com a lista de categorias, incluindo ID e descrição.
Contribuindo:

Faça um fork do repositório do projeto.
Crie uma nova branch: git checkout -b minha-nova-feature.
Faça suas alterações e commits: git commit -m 'Adiciona minha nova feature'.
Envie as alterações para o seu fork: git push origin minha-nova-feature.
Abra um Pull Request para o repositório original.
Licença:

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais detalhes.

Conclusão:

Este guia completo fornece instruções detalhadas sobre como testar os endpoints da API PDV usando o Insomnia.


Agradecimentos
Gostaria de agradecer a todos que contribuíram para o desenvolvimento deste projeto PDV API.

Agradecimentos individuais:

