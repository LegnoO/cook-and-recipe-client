// ** Next Imports
import { NextRequest, NextResponse } from "next/server";

// ** Config
import { externalAPI } from "@/config/endpoints";

export async function POST(request: NextRequest) {
  // const headers = new Headers();
  // headers.set("Content-Type", "application/json");
  // const apiResponse = await fetch(`${externalAPI}/auth/read-cookie-test`, {
  //   method: request.method,
  //   headers,
  // });
  // console.log("🚀 ~ GET ~ apiResponse:", apiResponse.headers.getSetCookie());
  // if (!apiResponse.ok) {
  //   const error = await apiResponse.json();
  //   console.log("🚀 ~ GET ~ error:", error);
  //   const response = NextResponse.json(error.message, {
  //     status: apiResponse.status,
  //   });
  //   response.cookies.set("testA", "test", { sameSite: "none" });
  //   return response;
  // }
  // const userInfo = await apiResponse.json();
  // const response = NextResponse.json(
  //   { message: "Get user info successfully", data: userInfo },
  //   {
  //     status: apiResponse.status,
  //   },
  // );
  // return response;
  const response = NextResponse.json("test set cookie", {
    status: 200,
  });
  response.cookies.set("testA", "test", { secure: true, sameSite: "none" });
  return response;
}
