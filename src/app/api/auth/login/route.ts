import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/app/lib/validation";
import { JWTPayload } from "@/app/utils/types";
import { generateJWT, setCookie } from "@/app/utils/generateToken";
import { connectToMongoDB } from "@/app/lib/connectDB";
export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await connectToMongoDB();
    const body = (await req.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: body.email });
    if (!user)
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    // const jwtPayload: JWTPayload = {
    //   id: user._id,
    //   isAdmin: user.isAdmin,
    // };
    // const token = generateJWT(jwtPayload);
    const cookie = setCookie({
      id: user._id,
      isAdmin: user.isAdmin,
    });
    const { password, ...userWithoutPassword } = user._doc;
    return NextResponse.json(
      {
        message: "Authentication successful",
        user: userWithoutPassword,
      },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
