import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        pubkey: {
          label: "Public Key",
          type: "text",
          placeholder: "public key...",
        },
        pvtkey: {
          label: "Private Key",
          type: "password",
          placeholder: "private key...",
        },
      },
      async authorize(credentials) {
        if (!credentials?.pubkey || !credentials?.pvtkey) {
          throw new Error("Invalid credentials");
        }

        const user = await prismadb.user.findUnique({
          where: {
            hashedPubkey: credentials.pubkey,
          },
        });

        if (!user || !user?.hashedPvtkey) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.pvtkey,
          user?.hashedPvtkey as string
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
