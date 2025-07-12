# NLW Agents - Server

API REST desenvolvida durante o evento **NLW Agents** da [Rocketseat](https://www.rocketseat.com.br/). 

Uma aplicação que permite criar salas de perguntas e respostas com **Inteligência Artificial**, onde é possível fazer upload de áudios que são transcritos e processados para gerar respostas automáticas baseadas no contexto fornecido.

## 🤖 Funcionalidades com IA

- **Transcrição de áudio** - Converte arquivos de áudio em texto usando Google Gemini
- **Embeddings vetoriais** - Gera embeddings para busca semântica de conteúdo
- **Respostas inteligentes** - Gera respostas contextuais para perguntas baseadas no conteúdo transcrito
- **Busca por similaridade** - Encontra conteúdo relevante usando distância vetorial

## 🚀 Tecnologias

- **Node.js** com TypeScript
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** com **PgVector** - Banco de dados com suporte a vetores
- **Drizzle ORM** - ORM TypeScript-first
- **Google Gemini AI** - Para transcrição e geração de embeddings
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
GOOGLE_GENAI_API_KEY=sua_chave_api_aqui
```

> **Importante:** Você precisa criar uma conta no [Google AI Studio](https://aistudio.google.com/) e obter uma chave de API gratuita.

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

Cria uma nova pergunta em uma sala e gera uma resposta automaticamente usando IA baseada no conteúdo de áudio transcrito.

```http
POST /rooms/:roomId/questions
Content-Type: application/json

{
  "question": "O que é o Next.js?"
}
```

**Response:**

```json
{
  "questionId": "uuid",
  "answer": "Resposta gerada pela IA com base no contexto dos áudios"
}
```

### Audio Upload

#### Upload de Áudio

Faz upload de um arquivo de áudio que será transcrito e processado para gerar embeddings.

```http
POST /rooms/:roomId/audio
Content-Type: multipart/form-data

# Arquivo de áudio (MP3, WAV, etc.)
```

**Response:**

```json
{
  "audioChunkId": "uuid",
  "transcription": "Texto transcrito do áudio",
  "embeddings": [0.1, 0.2, 0.3, ...]
}
```

## 📁 Estrutura do Projeto

```
src/
├── db/
│   ├── connection.ts      # Conexão com o banco
│   ├── seed.ts            # Dados de exemplo
│   ├── schemas/           # Esquemas do banco
│   │   ├── rooms.ts       # Schema das salas
│   │   ├── questions.ts   # Schema das perguntas
│   │   └── audio.chunks.ts # Schema dos chunks de áudio
│   └── migrations/        # Migrações do banco
├── http/
│   └── routes/            # Rotas da API
│       ├── create-room.ts
│       ├── get-rooms.ts
│       ├── create-question.ts
│       ├── get-rooms-questions.ts
│       └── upload-audio.ts
├── services/
│   └── gemini.ts          # Integração com Google Gemini AI
├── env.ts                 # Configuração de ambiente
└── server.ts              # Servidor principal
```

## 🎯 Sobre o NLW Agents

Este projeto foi desenvolvido durante o evento **NLW Agents** da Rocketseat, focando no desenvolvimento de aplicações com **inteligência artificial** e **agentes autônomos**.

### O que você aprende no projeto:

- 🤖 **Integração com IA** - Como usar Google Gemini para transcrição e embeddings
- 🔍 **Busca vetorial** - Implementação de busca semântica com PostgreSQL e pgvector
- 📁 **Upload de arquivos** - Processamento de arquivos de áudio com multipart
- 🗄️ **Banco vetorial** - Armazenamento e consulta de embeddings
- 🚀 **API REST moderna** - Fastify com TypeScript e validação com Zod

### Funcionalidades principais:

1. **Criação de salas** para organizar conversas
2. **Upload de áudios** que são automaticamente transcritos
3. **Geração de embeddings** para busca semântica
4. **Perguntas e respostas inteligentes** baseadas no contexto dos áudios
5. **API REST** completa e documentada

---

💜 Desenvolvido durante o [NLW Agents](https://www.rocketseat.com.br/) da Rocketseat
