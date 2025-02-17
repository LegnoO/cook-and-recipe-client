import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  if (request.nextUrl.pathname === "/login") {
    if (request.nextUrl.searchParams.get("session") === "expired") {
      return NextResponse.next();
    }
  }

  if (accessToken) {
    console.log("🚀 ~ middleware ~ accessToken:", accessToken);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password"],
};
