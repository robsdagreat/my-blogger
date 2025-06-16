import { NextResponse } from "next/server";
import { db } from "@/db";
import { user, account } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

function setCorsHeaders(response: NextResponse) {
  const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  setCorsHeaders(response);
  return response;
}

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password) {
      const response = NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
      setCorsHeaders(response);
      return response;
    }

    // Check if user already exists
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (existingUser) {
      const response = NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
      setCorsHeaders(response);
      return response;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = randomUUID();
    const now = new Date();
    
    const [newUser] = await db
      .insert(user)
      .values({
        id: userId,
        email,
        name,
        emailVerified: false,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    // Create account record with password
    await db
      .insert(account)
      .values({
        id: randomUUID(),
        accountId: userId,
        providerId: "email",
        userId: userId,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now
      });

    // Remove sensitive fields from response
    const { ...userWithoutSensitive } = newUser;

    const response = NextResponse.json(userWithoutSensitive, { status: 201 });
    setCorsHeaders(response);
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    const response = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    setCorsHeaders(response);
    return response;
  }
} 