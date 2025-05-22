import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}

export async function GET(req: Request) {
  const token = await NextResponse.next().cookies.get("token")?.value;

  if (!token) return null;

  return token;
}
