import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      const userExists = await ctx.db.user.findFirst({
        where: { email },
      });
      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already exists!",
        });
      }
      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10),
      );
      return ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userProfile = await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
    return userProfile ?? null;
  }),
});
