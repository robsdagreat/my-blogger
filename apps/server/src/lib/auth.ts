import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

console.log("CORS_ORIGIN from .env (apps/server):", process.env.CORS_ORIGIN);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification
    }
  }),
  trustedOrigins: process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : [],
  emailAndPassword: {
    enabled: true,
    passwordMinLength: 6,
    passwordMaxLength: 100
  }
});


