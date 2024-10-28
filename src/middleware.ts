// ** Next Imports
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const response = NextResponse.next();
  const accessTokenCookie = cookieStore.get("access_token")?.value || "";

  const currentPathname = request.nextUrl.pathname;

  if (!accessTokenCookie && currentPathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/profile"],
};
