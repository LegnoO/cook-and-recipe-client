// ** Next Imports
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const accessTokenCookie = cookieStore.get("accessToken")?.value || "";

  const headers = new Headers(request.headers);

  headers.set("Authorization", `Bearer ${accessTokenCookie}`);

  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  // return NextResponse.redirect(new URL("/", request.url));

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/profile"],
};
