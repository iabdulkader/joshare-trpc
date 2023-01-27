import { publicProcedure } from './../createRouter';
import { router } from "../createRouter";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';


export const support = router({
    postMessage: publicProcedure
    .input(z.object({
        name: z.string(),
        email: z.string(),
        message: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const { name, email, message } = input;

        const messageObj = await (await ctx).supportModel.create({
            name,
            email,
            message
        })

        if(messageObj){

            return {
                success: true,
                message: "Message submitted successfully"
            }
        } else {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Error submitting message"
            })
        }
    }),

});