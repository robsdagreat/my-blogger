import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  // Skip auth check for auth-related routes
  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    // In a production environment, you might want a more robust logging system here
    console.error("JWT_SECRET is not set in environment variables.");
    return NextResponse.json(
      { error: "Server configuration error: JWT secret missing" },
      { status: 500 }
    );
  }

  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
