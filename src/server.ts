import { log } from 'node:console'
import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { getRoomQuestionsRoute } from './http/routes/get-rooms-questions.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, {
  origin: '*',
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.get('/health', () => {
  return { status: 'OK' }
})
app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)
app.listen({ port: env.PORT }, (err) => {
  if (err) {
    log(err, 'Server failed to start')
    process.exit(1)
  }
  log(`Server is running at http://localhost:${process.env.PORT || 3333}`)
})
