import { rest } from 'msw'
import { LoginInput } from '../features/auth/useLoginMutation'

const mockUser = {
  id: 1,
  mail: 'email@gmail.com',
  first_name: 'User',
  last_name: 'Mock',
  avatar: {}
}

export const handlers = [
  rest.post('https://api.go1.co/user/account/login', (req, res, ctx) => {
    const { username, password } = req.body as any

    if (username === 'email@gmail.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          jwt: 'some_jwt',
          ...mockUser
        })
      )
    }
    
    return res(ctx.status(403), ctx.json({ message: 'Wrong credentials' }))
  })
]
