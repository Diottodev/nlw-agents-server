import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'

const getRoomQuestionsParamsSchema = z.object({
  roomId: z.string(),
})

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/questions',
    { schema: { params: getRoomQuestionsParamsSchema } },
    async (request) => {
      const { roomId } = request.params
      const results = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.questions,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(schema.questions.createdAt)
      return results
    }
  )
}
