import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/lib/validation";
import { connectToMongoDB } from "@/app/lib/connectDB";
import { RegisterUserDto } from "@/app/utils/dtos";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by creating an account with their details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 description: Password for the user account.
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user.
 *               address:
 *                 type: string
 *                 description: Address of the user.
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *               - address
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *       400:
 *         description: Invalid input or user already exists
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal server error
 */
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
