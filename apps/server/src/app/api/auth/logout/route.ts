import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  // invalidate session
  const session = await authRequest.validate();
  if (session) {
    await auth.invalidateSession(session.sessionId);
  }

  authRequest.setSession(null);

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
} 