import { FastifyInstance } from 'fastify'
import { z } from 'zod' // Biblioteca para validar os dados
import { randomUUID } from 'node:crypto' // Para gerar IDs únicos
import { knex } from '../database' // Usando o arquivo database.ts existente!

export async function usuariosRoutes(app: FastifyInstance) {
  // Rota para CRIAR um novo usuário
  app.post('/', async (request, reply) => {
    const criarUsuarioBodySchema = z.object({
      nome: z.string(),
      email: z.string().email(),
    })

    const { nome, email } = criarUsuarioBodySchema.parse(request.body)

    const sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    })

    await knex('usuarios').insert({
      id: randomUUID(),
      nome,
      email,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}