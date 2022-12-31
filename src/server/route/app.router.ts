import { router } from '../createRouter'
import { user } from './user.router'

export const appRouter = router({
  user,
})

export type AppRouter = typeof appRouter