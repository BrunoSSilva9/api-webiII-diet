// src/hooks/check-session-id-exists.ts
import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Não autorizado.',
    })
  }

  const user = await knex('users').where({ session_id: sessionId }).first()

  if (!user) {
    return reply.status(401).send({
      error: 'Não autorizado.',
    })
  }

  // Adiciona o usuário encontrado ao objeto de requisição para uso posterior
  request.user = user
}
