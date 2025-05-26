import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/", "/entrar", "/cadastrar"];

  const isValid = await validateToken(token);

  if (protectedRoutes.includes(pathname)) {
    if (!isValid) {
      return NextResponse.redirect(new URL("/entrar", req.url));
    }
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    if (isValid) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

async function validateToken(token?: string) {
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
