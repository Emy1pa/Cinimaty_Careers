import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(JwtPayload: JWTPayload): string {
  const token = jwt.sign(JwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
}
