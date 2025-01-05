import { connectToMongoDB } from "@/app/lib/connectDB";
import Application from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     description: Fetches all applications from the database, sorted by creation date in descending order.
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier of the application
 *                       name:
 *                         type: string
 *                         description: Name of the application
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation timestamp of the application
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 */
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await connectToMongoDB();
    const applications = await Application.find().sort({ createdAt: -1 });
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
