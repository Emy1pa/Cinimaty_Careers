import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/lib/validation";
import { connectToMongoDB } from "@/app/lib/connectDB";
import { RegisterUserDto } from "@/app/utils/dtos";
export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await connectToMongoDB();
    const body = (await req.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ where: { email: body.email } });
    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = new User({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      phoneNumber: body.phoneNumber,
      address: body.address,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
