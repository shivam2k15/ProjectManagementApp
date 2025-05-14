import { authOptions } from "~/server/auth";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const handler = NextAuth(authOptions) as (
  req: NextRequest,
) => Promise<Response>;

export { handler as GET, handler as POST };
