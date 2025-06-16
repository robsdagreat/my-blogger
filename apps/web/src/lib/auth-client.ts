import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3002",
  trustedOrigins: ["http://localhost:3001"]
});
