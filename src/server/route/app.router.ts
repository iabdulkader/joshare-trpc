import { router } from '../createRouter'
import { home } from './home.router'
import { user } from './user.router'
import { files } from './files.router'

export const appRouter = router({
  home,
  user,
  files
})

export type AppRouter = typeof appRouter