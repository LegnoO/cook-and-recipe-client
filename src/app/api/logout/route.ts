// ** Next Imports
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ** Lib
import fetcher from "@/lib/apiServer";
import { ServerError } from "@/lib/ServerError";

export async function POST() {
  const cookieStore = cookies();

  try {
    const response = await fetcher(`/auth/logout`, {
      method: "POST",
    });
    cookieStore.delete("access_token");
    const data = await response.text();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof ServerError) {
      return new NextResponse(error.message, { status: error.status });
    }
    return new NextResponse("An unknown error occurred", { status: 500 });
  }
}
