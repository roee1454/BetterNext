import { betterAuth } from "better-auth";
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/prisma'
import { headers } from "next/headers";
import { sendEmail } from "./email";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Oops! Some of your google auth env variables aren't present or misconfigured, fix this!")
}

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Oops! Some of your github auth env variables aren't present or misconfigured, fix this!")
}

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("Oops! You forgot to enter your app's BETTER_AUTH_URL, fix this!")
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  emailVerification: {
    sendVerificationEmail: async ( { user, url } ) => {
      if (!user?.email || typeof user.email !== 'string') {
        throw new Error('User email is missing or invalid.');
      }
      await sendEmail({
        // Buy email domain for this to work, works for tests only on main user's email address.
        from: 'Test Template <onboarding@resend.dev>',
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click the link to verify your email: <a href="${url}">Verify</a></p>`,
      });
    },
  },
  
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/google"
    },
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/github"
    },
    // Add more here...
  }
});

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers()
  })
}
