// ** Next Imports
import { NextRequest, NextResponse } from "next/server";

// ** Config
import { externalAPI } from "@/config/endpoints";

export async function GET(request: NextRequest) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const authorization = request.headers.get("Authorization");

  if (authorization) {
    headers.set("Authorization", authorization);
  }

  const apiResponse = await fetch(`${externalAPI}/users/owned/info`, {
    method: request.method,
    headers,
  });

  if (!apiResponse.ok) {
    const error = await apiResponse.json();

    return NextResponse.json(error.message, {
      status: apiResponse.status,
    });
  }

  const userInfo = await apiResponse.json();

  const response = NextResponse.json(
    { message: "Get user info successfully", data: userInfo },
    {
      status: apiResponse.status,
    },
  );

  return response;
}
