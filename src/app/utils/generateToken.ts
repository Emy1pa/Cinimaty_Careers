import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export function generateJWT(JwtPayload: JWTPayload): string {
  const token = jwt.sign(JwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
}
export function setCookie(jwtPayload: JWTPayload): string {
  const token = generateJWT(jwtPayload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}

export const deleteCookie = () => {
  cookies().delete("jwtToken");
};
