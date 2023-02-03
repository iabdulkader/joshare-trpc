import { TRPCError } from "@trpc/server";
import moment from "moment";
import { string, z } from "zod";
import { signToken } from "../../utlis/token/token";
import { User } from "./../../types/index";
import { generatePin } from "../../utlis/signup/signUp";
import { router, publicProcedure, privateProcedure } from "../createRouter";
import { emailSender } from "../../utlis/email/emailService";

export const user = router({
  signup: publicProcedure.mutation(async ({ ctx }) => {
    if ((await ctx).user) {
      return {
        message: "user already exists",
        user: {
          pin: (await ctx).user?.pin,
          expire: (await ctx).user?.expire,
        },
      };
    } else {
      const newUser = new (await ctx).userModel({
        pin: generatePin(),
        expire: new Date(new Date().getTime() + 86400000),
      });

      const { pin, expire }: User = await newUser.save();

      let token = await signToken({ pin, expire });

      return {
        message: "user created",
        user: {
          pin,
          expire,
        },
        token,
      };
    }
  }),

  getUser: publicProcedure
    .input(
      z.object({
        pin: string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { pin } = input;

      if (user) {
        const user = (await (
          await ctx
        ).userModel.findOne({
          pin,
        })) as User;

        if (user) {
          return {
            message: "user found",
            user,
          };
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User with pin not found.",
          });
        }
      } else {
        return {
          message: "user not found",
        };
      }
    }),

  sendEmail: privateProcedure
    .input(
      z.object({
        to: string(),
        from: string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { to, from } = input;
      const { pin, expire } = (await ctx).user as User;

      const { success, message, messageId } = await emailSender({
        to,
        from,
        pin,
        expire,
      });

      if (success) {
        try {
          let { emailRemaining } = (await (
            await ctx
          ).userModel.findOneAndUpdate(
            {
              pin,
            },
            {
              $inc: {
                emailRemaining: -1,
              },
            },
            { new: true }
          )) as User;

          return {
            emailRemaining,
            success,
            message,
            messageId,
          };
        } catch (error) {
          return {
            success: false,
            message,
            messageId,
          };
        }
      } else {
        return {
          success,
          message,
          messageId,
        };
      }
    }),

  extendTime: privateProcedure
    .input(
      z.object({
        pin: string(),
        hour: z.number().min(1).max(24),
        expire: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { pin, hour, expire: prevExpire } = input;

      try {
        const { timeExtRemaining, expire } = (await (
          await ctx
        ).userModel.findOneAndUpdate(
          {
            pin,
          },
          {
            $inc: {
              timeExtRemaining: -1,
            },
            $set: {
              expire: moment(prevExpire).add(hour, "hours"),
            },
          },
          { new: true }
        )) as User;

        const token: string = await signToken({ pin, expire }, expire);

        return {
          success: true,
          token,
          message: "time extended",
          expire,
          timeExtRemaining,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    }),
});
