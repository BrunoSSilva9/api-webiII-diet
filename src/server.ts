import fastify from 'fastify'
import cookie from '@fastify/cookie' // Importe o plugin de cookie
import { usuariosRoutes } from './routes/usuarios'

const app = fastify()
app.register(cookie)

// Registra as rotas de usuários
app.register(usuariosRoutes, {
  prefix: 'usuarios', 
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('Servidor HTTP rodando na porta 3333!')
})