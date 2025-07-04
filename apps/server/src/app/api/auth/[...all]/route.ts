import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth.handler);

function setCorsHeaders(response: NextResponse, origin: string) {
  console.log("Setting CORS headers for origin:", origin);
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

export async function GET(request: NextRequest) {
  const originalResponse = await handler.GET(request);
  const response = new NextResponse(originalResponse.body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers: originalResponse.headers,
  });
  setCorsHeaders(response, process.env.CORS_ORIGIN || '');
  return response;
}

export async function POST(request: NextRequest) {
  const originalResponse = await handler.POST(request);
  const response = new NextResponse(originalResponse.body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers: originalResponse.headers,
  });
  setCorsHeaders(response, process.env.CORS_ORIGIN || '');
  return response;
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 }); // 204 No Content for preflight
  setCorsHeaders(response, process.env.CORS_ORIGIN || '');
  return response;
}
