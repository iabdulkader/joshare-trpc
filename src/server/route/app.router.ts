import { support } from './support.router';
import { router } from '../createRouter'
import { home } from './home.router'
import { user } from './user.router'
import { files } from './files.router'

export const appRouter = router({
  home,
  user,
  files,
  support
})

export type AppRouter = typeof appRouter