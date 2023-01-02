import { router } from '../createRouter'
import { home } from './home.router'
import { user } from './user.router'

export const appRouter = router({
  home,
  user,
})

export type AppRouter = typeof appRouter