import { connectToMongoDB } from "@/app/lib/connectDB";
import Application from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/app/utils/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    await connectToMongoDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No authentication token found" },
        { status: 401 }
      );
    }

    const jwtToken = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET!
      ) as JWTPayload;

      if (decoded.id.toString() !== params.id) {
        return NextResponse.json(
          { message: "Unauthorized access" },
          { status: 403 }
        );
      }

      const applications = await Application.find({
        userId: params.id,
      }).sort({ createdAt: -1 });

      return NextResponse.json({ applications }, { status: 200 });
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
