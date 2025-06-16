import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "@/lib/auth-client";

export async function middleware(request: NextRequest) {
  const session = await authClient.getSession();

  // If the user is not signed in and the current path is not /login or /signup,
  // redirect the user to /login
  if (!session && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is signed in and the current path is /login or /signup,
  // redirect the user to /dashboard
  if (session && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
