import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaclient";


const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages:{
    signIn:"/signin",
  //   signOut:"/signout",
  //   newUser:"/onboard"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET as string

}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
