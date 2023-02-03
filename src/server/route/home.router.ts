import { publicProcedure } from "./../createRouter";
import { router } from "../createRouter";

export const home = router({
  isAlive: publicProcedure.query(async ({ ctx }) => {
    return {
      message: "Server is running",
    };
  }),
});
