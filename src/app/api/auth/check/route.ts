import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const GET = async () => {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwtToken");
  return NextResponse.json({
    isAuthenticated: !!jwtToken,
  });
};
