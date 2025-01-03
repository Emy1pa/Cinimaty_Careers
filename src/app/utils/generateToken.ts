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
// export function setCookie(jwtPayload: JWTPayload): string {
//   const token = generateJWT(jwtPayload);

//   return token;
// }

// export const deleteCookie = () => {
//   cookies().delete("jwtToken");
// };
