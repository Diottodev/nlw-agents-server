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

## 📡 API Documentation

### Health Check

Verifica se a API está funcionando corretamente.

```http
GET /health
```

**Response:**
```json
{
  "status": "OK"
}
```

### Rooms

#### Listar Salas

Retorna todas as salas com contagem de perguntas.

```http
GET /rooms
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Room Name",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "questions": 5
  }
]
```

#### Criar Sala

Cria uma nova sala.

```http
POST /rooms
Content-Type: application/json

{
  "name": "Room Name",
  "description": "Room Description" // opcional
}
```

**Response:**
```json
{
  "roomId": "uuid"
}
```

### Questions

#### Listar Perguntas de uma Sala

Retorna todas as perguntas de uma sala específica.

```http
GET /rooms/:roomId/questions
```

**Response:**
```json
[
  {
    "id": "uuid",
    "question": "Question text",
    "answer": "Answer text or null",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

#### Criar Pergunta

Cria uma nova pergunta em uma sala.

```http
POST /rooms/:roomId/questions
Content-Type: application/json

{
  "questions": "Question text"
}
```

**Response:**
```json
{
  "questionId": "uuid"
}
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
