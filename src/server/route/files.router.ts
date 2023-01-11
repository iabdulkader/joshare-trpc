import { Path } from './../../types/index';
import { privateProcedure } from './../createRouter';
import { router } from "../createRouter";
import { z } from 'zod';
import { TRPCError } from '@trpc/server';


export const files = router({
    deleteFile: privateProcedure
    .input(z.object({
        id: z.string(),
        url: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const { id, url } = input;

        const file = await (await ctx).userModel.findOneAndUpdate({ pin: (await ctx).user?.pin }, {
            $pull: {
              files: { id: id },
            }
          }, { new: true })

        if(file){

            let response = await fetch(`${process.env.NEXT_PUBLIC_FILES_SERVER}/api/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-authorization": `Bearer ${(await ctx).req.cookies.token}`
                },
                body: JSON.stringify({
                    url
                })
            });

            console.log(await response.json())

            return {
                success: true,
                id,
                message: "file deleted"
            }
        } else {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "file not found"
            })
        }
    }),

});