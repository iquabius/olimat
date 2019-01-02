<h1 align="center" style="color:RoyalBlue">OliMAT</h1>

<div align="center">

Uma aplicação web de código aberto para as Olimpíadas de Matemática da [UNEMAT](http://portal.unemat.br).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-brightgreen.svg)](https://www.gnu.org/licenses/agpl-3.0)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

</div>

## Desenvolvimento

### Pré-requisitos

Pra rodar esse projeto, é necessário instalar:

- Node.js versão 10.0
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Baixe a aplicação e instale as dependências

Clone o repositório para o seu computador:

```bash
git clone https://github.com/iquabius/olimat.git
```

Navegue até o diretório do *backend* e instale as dependências do NPM:

```bash
cd olimat/backend && npm install
```

Agora instale as dependências do *frontend*:

```bash
cd ../frontend && npm install
```

### 2. Levante o serviço de banco de dados do Prisma

Levante os serviços *prisma* e *postgres* definidos em `backend/docker-compose.yml`:

```bash
cd ../backend
docker-compose up -d
```

O Prisma agora está conectado ao banco de dados e roda em `http://localhost:4466`.
Ele é utilizado pelo servidor GraphQL para ler e escrever no BD.

Para criar as tabelas no BD, implante a API do Prisma definida em `backend/prisma/datamodel.graphql`:

```bash
npx prisma deploy
```

> Note que quando a implantação do serviço do Prisma é feita pela primeira vez, o comando irá executar o script [`backend/prisma/seed/seed.ts`](backend/prisma/seed/seed.ts) para semear o banco com dados iniciais. Ele sabe desse script porque está listado em [`backend/prisma/prisma.yml`](backend/prisma/prisma.yml) na propriedade `seed`.

### 3. Inicie o servidor GraphQL

Agora que o serviço de banco de dados do Prisma está disponível, podemos iniciar
o servidor:

```bash
npm run dev
```

O script `dev` inicia o servidor em [`http://localhost:4000/graphql`](http://localhost:4000/graphql). Ele pode ser acessado pelo navegador através do GraphQL Playground, onde é possível explorar as operações disponíveis navegando pela documentação integrada.

### 4. Inicie o *frontend*

Inicia a aplicação em [`http://localhost:3000`](http://localhost:3000):

```bash
cd ../frontend
npm run dev
```

### 5. Abra o repositório no VS Code

Esse repositório está configurado pra funcionar como um [espaço de trabalho multi-raiz do Visual Studio Code](https://code.visualstudio.com/docs/editor/multi-root-workspaces).
Isso garante o funcionamento correto de algumas integrações, como o a extensão
[Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo). Há duas formas de abrir esse repositório como um espaço de trabalho:

Se abrir esse projeto como pasta, um aviso aparecerá no canto inferior direito:

> This folder contains a workspace file 'olimat.code-workspace'. Do you want to open it? [Learn more](https://code.visualstudio.com/docs/editor/multi-root-workspaces) about workspace files.

Clique em 'Open Workspace' para abrir o projeto como espaço de trabalho.

Para abrir a espaço de trabalho diretamente, abra o VS Code, clique em `File -> Open Workspace`, navegue até o diretório do projeto e selecione o arquivo `olimat.code-workspace`.

## Licença

[AGPL-3.0](./LICENSE)