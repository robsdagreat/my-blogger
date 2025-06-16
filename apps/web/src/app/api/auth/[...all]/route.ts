import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3002'); // Allow requests from your frontend origin
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
  setCorsHeaders(response);
  return response;
}

export async function POST(request: NextRequest) {
  const originalResponse = await handler.POST(request);
  const response = new NextResponse(originalResponse.body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers: originalResponse.headers,
  });
  setCorsHeaders(response);
  return response;
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 204 }); // 204 No Content for preflight
  setCorsHeaders(response);
  return response;
} 