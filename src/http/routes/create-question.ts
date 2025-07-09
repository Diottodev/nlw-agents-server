import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'

const createRoomBodySchema = z.object({
  questions: z.string().min(1).max(500),
})

const createRoomParamsSchema = z.object({
  roomId: z.string().uuid(),
})

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    { schema: { body: createRoomBodySchema, params: createRoomParamsSchema } },
    async (request, reply) => {
      const { roomId } = request.params
      const { questions } = request.body
      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ roomId, questions })
        .returning({ id: schema.questions.id })
      if (!createdQuestion) {
        throw new Error('Failed to create question')
      }
      reply.status(201).send({ questionId: createdQuestion.id })
    }
  )
}
