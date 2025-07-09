# NLW Agents - Server

API REST desenvolvida durante o evento **NLW Agents** da [Rocketseat](https://www.rocketseat.com.br/).

## 🚀 Tecnologias

- **Node.js** com TypeScript
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com PgVector - Banco de dados
- **Drizzle ORM** - ORM TypeScript-first
- **Docker** - Containerização
- **Zod** - Validação de esquemas

## 📋 Pré-requisitos

- Node.js (versão 18+)
- PNPM
- Docker e Docker Compose

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd server
```

2. Instale as dependências:

```bash
pnpm install
```

3. Suba o banco de dados PostgreSQL com Docker:

```bash
docker-compose up -d
```

4. Configure as variáveis de ambiente criando um arquivo `.env`:

```env
PORT=3333
DATABASE_URL=postgresql://postgres:docker@localhost:5432/agents
```

5. Execute as migrações e seed do banco:

```bash
pnpm db:seed
```

## 🚀 Como executar

### Desenvolvimento

```bash
pnpm dev
```

### Produção

```bash
pnpm start
```

O servidor estará rodando em `http://localhost:3333`

## 📡 Endpoints

### Health Check

```http
GET /health
```

### Listar Salas

```http
GET /rooms
```

## 📁 Estrutura do Projeto

```
src/
├── db/
│   ├── connection.ts      # Conexão com o banco
│   ├── seed.ts            # Dados de exemplo
│   ├── schemas/           # Esquemas do banco
│   └── migrations/        # Migrações do banco
├── http/
│   └── routes/            # Rotas da API
├── env.ts                 # Configuração de ambiente
└── server.ts              # Servidor principal
```

## 🎯 Sobre o NLW Agents

Este projeto foi desenvolvido durante o evento **NLW Agents** da Rocketseat, focando no desenvolvimento de aplicações com inteligência artificial e agentes.

---

Desenvolvido durante o [NLW Agents](https://www.rocketseat.com.br/) da Rocketseat
