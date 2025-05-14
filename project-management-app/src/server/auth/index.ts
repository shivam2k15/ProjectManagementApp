import { getServerSession } from "next-auth";
import { authOptions } from "./config";
import type { GetServerSidePropsContext } from "next";

export { authOptions } from "./config";

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
