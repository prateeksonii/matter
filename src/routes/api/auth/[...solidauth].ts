import { SolidAuth, type SolidAuthConfig } from "@auth/solid-start";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "~/services/db";

export const authOpts: SolidAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ] as any[],
  debug: true,
};

export const { GET, POST } = SolidAuth(authOpts);
