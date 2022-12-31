import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "../../../server/createContext";


import { appRouter } from "../../../server/route/app.router";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
