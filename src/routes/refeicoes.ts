import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../hooks/check-session-id-exists'

export async function refeicoesRoutes(app: FastifyInstance) {
  // Rota para CRIAR uma nova refeição
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] }, // <- Nosso "guarda" entra em ação aqui
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnDiet: z.boolean(),
        date: z.string().datetime(),
      })

      const { name, description, isOnDiet, date } = createMealBodySchema.parse(
        request.body,
      )

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_on_diet: isOnDiet,
        date_and_time: date,
        user_id: request.user.id, // <- Pegamos o ID do usuário que o "guarda" encontrou
      })

      return reply.status(201).send()
    },
  )

  // Rota para LISTAR todas as refeições do usuário
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] }, // <- O "guarda" protege aqui também
    async (request) => {
      const meals = await knex('meals')
        .where('user_id', request.user.id)
        .select()

      return { meals }
    },
  )
}