import { and, eq, sql } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts'

const createRoomBodySchema = z.object({
  question: z.string().min(1).max(500),
})

const createRoomParamsSchema = z.object({
  roomId: z.string(),
})

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    { schema: { body: createRoomBodySchema, params: createRoomParamsSchema } },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body
      const embeddings = await generateEmbeddings(question)
      const embeddingsAsString = `[${embeddings?.join(',')}]`
      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.8`
          )
        )
        .orderBy(
          sql`(${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`
        )
      let answer: string | null = null
      if (chunks.length > 0) {
        const [firstChunk] = chunks
        answer = await generateAnswer(question, [firstChunk.transcription])
      }
      if (!(chunks.length && answer)) {
        answer = await generateAnswer(
          question,
          chunks.map((chunk) => chunk.transcription)
        )
      }
      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ roomId, question, answer })
        .returning({ id: schema.questions.id })
      if (!createdQuestion) {
        throw new Error('Failed to create question')
      }
      reply.status(201).send({ questionId: createdQuestion.id, answer })
    }
  )
}
