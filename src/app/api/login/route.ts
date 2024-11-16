// ** Next Imports
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ** Lib
import fetcher from "@/lib/apiServer";
import { ServerError } from "@/lib/ServerError";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const requestBody = await request.json();
  try {
    const response = await fetcher(`/auth/public/login`, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });
    const data = await response.text();

    cookieStore.set({
      name: "access_token",
      value: data,
      httpOnly: false,
      secure: true,
      path: "/",
    });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    
    if (error instanceof ServerError) {
      return new NextResponse(error.message, { status: error.status });
    }
    return new NextResponse("An unknown error occurred", { status: 500 });
  }
}
