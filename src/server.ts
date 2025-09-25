import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { usuariosRoutes } from './routes/usuarios'
import { refeicoesRoutes } from './routes/refeicoes' 

const app = fastify()

app.register(cookie)

app.register(usuariosRoutes, {
  prefix: 'usuarios',
})

app.register(refeicoesRoutes, { // <- REGISTRAR AQUI
  prefix: 'refeicoes',
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('🚀 Servidor HTTP rodando na porta 3333!')
})