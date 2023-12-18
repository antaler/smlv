const user = {
  username: 'antaler',
  password: 'antaler'
}
const loginEndpoint = {
  method: 'post',
  endpoint: 'login',
  handler: async (request, reply) => {
    if (!request.body) return reply.status(400).send(null)

    const { username, password } = JSON.parse(request.body)

    console.log({ username, password })
    if (!username || !password) {
      return reply.status(400).send(null)
    }
    if ((username === user.username && password === user.password)) {
      reply.status(200).headers({
        Authorization: 'a.b.c'
      }).send()
    } else {
      reply.status(401).send(null)
    }
  }
}

export const prefix = '/api/'

export const endpoints = [loginEndpoint]
