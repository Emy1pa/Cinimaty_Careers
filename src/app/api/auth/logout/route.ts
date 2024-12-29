import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  cookies().delete("jwtToken");
  return NextResponse.json({ message: "logged out successfully" });
};
