import { signToken } from './../../utlis/token';
import { User } from './../../types/index';
import { generatePin } from './../../utlis/signUp';
import { string, z } from 'zod'
import { router, publicProcedure } from './../createRouter';

export const user = router({
    signup: publicProcedure
    .mutation(async ({ ctx }) => {

        if((await ctx).user){
            return {
                message: "user already exists",
                user: {
                    pin: (await ctx).user?.pin,
                    expire: (await ctx).user?.expire
                }
            }
        } else {
            const newUser = new (await ctx).userModel({
                pin: generatePin(),
                expire: new Date(new Date().getTime() + 86400000)
            })
    
            const { pin, expire }: User = await newUser.save();
            
            let token = signToken({ pin, expire });
    
            return {
                message: "user created",
                user: {
                    pin,
                    expire
                },
                token
            };
        }
    })
})

