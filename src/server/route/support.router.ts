import { publicProcedure } from "./../createRouter";
import { router } from "../createRouter";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const support = router({
  postMessage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, message } = input;

      try {
        const telegramSend = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: `<b>New Support Message Received</b>\n\n<b>Name: </b><b><code>${name}</code></b>\n<b>Email: </b><code>${email}</code>\n\n<b>Message:\n</b><code>${message}</code>`,
              parse_mode: "HTML",
            }),
          }
        );

        const response = await telegramSend.json();

        if (response.ok) {
          return {
            success: true,
          };
        } else {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong. Please try again later.",
          });
        }
      } catch (error) {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. Please try again later.",
        });
      }
    }),
});
