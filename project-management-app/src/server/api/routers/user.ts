import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
      const hashedPassword = await bcrypt.hash(
        input.password,
        await bcrypt.genSalt(10),
      );
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
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
