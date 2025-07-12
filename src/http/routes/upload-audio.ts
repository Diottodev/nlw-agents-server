import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'
import { generateEmbeddings, transcribeAudio } from '../../services/gemini.ts'

const uploadParamsSchema = z.object({
  roomId: z.string(),
})

export const uploadRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    { schema: { params: uploadParamsSchema } },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file()
      if (!audio) {
        throw new Error('Audio file is required')
      }
      const audioBase64 = await audio.toBuffer()
      const audioAsBase64 = audioBase64.toString('base64')
      const transcribedText = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      )
      if (!transcribedText) {
        throw new Error('Failed to transcribe audio')
      }
      const embeddings = await generateEmbeddings(transcribedText)
      if (!embeddings) {
        throw new Error('Failed to generate embeddings')
      }
      const [createdAudioChunk] = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription: transcribedText,
          embeddings,
        })
        .returning()
      if (!createdAudioChunk) {
        throw new Error('Failed to create audio chunk')
      }
      reply.status(201).send({
        audioChunkId: createdAudioChunk.id,
        transcription: createdAudioChunk.transcription,
        embeddings: createdAudioChunk.embeddings,
      })
    }
  )
}
