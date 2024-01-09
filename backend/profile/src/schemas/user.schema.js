import { z } from 'zod'

const User = z.object({
  height: z.number().min(100).max(300).optional(),
  weight: z.number().min(40).max(500).optional(),
  gender: z.enum(['M', 'W']).optional(),
  birthDay: z.coerce.date().optional(),
  email: z.string().email().optional(),
  name: z.string().optional()
})

export function validateUser (user) {
  return User.safeParse(user)
}
