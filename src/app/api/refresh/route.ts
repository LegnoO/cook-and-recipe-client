// ** Next Imports
import { NextRequest, NextResponse } from "next/server";

// ** Config
import { externalAPI } from "@/config/endpoints";

// ** Lib
import { parseSetCookie } from "@/lib/utils/cookies";

export async function POST(request: NextRequest) {
  const headers = new Headers();
  const body = JSON.stringify(await request.json());
  headers.set("Content-Type", "application/json");
  headers.set("Cookie", request.cookies.toString());

  const apiResponse = await fetch(`${externalAPI}/auth/refresh`, {
    method: request.method,
    body,
    headers,
  });

  const cookiesResponse = apiResponse.headers.getSetCookie();

  if (!apiResponse.ok) {
    const error = await apiResponse.json();

    return NextResponse.json(error.message, {
      status: error.statusCode,
    });
  }

  const accessToken = await apiResponse.text();

  const response = NextResponse.json(
    { message: "Refresh successfully" },
    {
      status: apiResponse.status,
    },
  );

  cookiesResponse.forEach((cookie) => {
    if (cookie) response.cookies.set(parseSetCookie(cookie));
  });

  response.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: false,
    secure: true,
    path: "/",
  });

  return response;
}
