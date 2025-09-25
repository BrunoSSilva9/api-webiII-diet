import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../hooks/check-session-id-exists'

export async function usuariosRoutes(app: FastifyInstance) {
  // Rota para CRIAR um novo usuário
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = createUserBodySchema.parse(request.body)

    const sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
    })

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  // Rota para buscar as MÉTRICAS do usuário
  app.get(
    '/metricas',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const totalMeals = await knex('meals')
        .where('user_id', request.user.id)
        .count('id', { as: 'total' })
        .first()

      const mealsOnDiet = await knex('meals')
        .where({
          user_id: request.user.id,
          is_on_diet: true,
        })
        .count('id', { as: 'total' })
        .first()

      const mealsOffDiet = await knex('meals')
        .where({
          user_id: request.user.id,
          is_on_diet: false,
        })
        .count('id', { as: 'total' })
        .first()

      const allMeals = await knex('meals')
        .where('user_id', request.user.id)
        .orderBy('date_and_time')

      let bestSequence = 0
      let currentSequence = 0

      for (const meal of allMeals) {
        if (meal.is_on_diet) {
          currentSequence++
        } else {
          currentSequence = 0
        }

        if (currentSequence > bestSequence) {
          bestSequence = currentSequence
        }
      }

      return {
        totalMeals: totalMeals?.total,
        mealsOnDiet: mealsOnDiet?.total,
        mealsOffDiet: mealsOffDiet?.total,
        bestSequence,
      }
    },
  )
}