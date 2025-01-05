import { connectToMongoDB } from "@/app/lib/connectDB";
import Application from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/app/utils/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  /**
   * @swagger
   * /api/applications/{id}:  # Added leading slash
   *   get:
   *     summary: Get applications by user ID
   *     description: Retrieves all applications for a given user, based on the user's ID.
   *     tags:
   *       - Applications
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Successful response
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
   *                       userId:
   *                         type: string
   *                       status:
   *                         type: string
   *                         enum: [Pending, Accepted, Rejected]
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       500:
   *         description: Internal server error
   */
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
/**
 * @swagger
 * /api/applications/{id}:
 *   patch:
 *     summary: Update application status
 *     description: Update the status of a specific application.
 *     tags:
 *       - Applications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the application.
 *                 enum: [Pending, Accepted, Rejected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 application:
 *                   type: object
 *       400:
 *         description: Bad Request - Invalid status or missing status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Application not found
 *       500:
 *         description: Internal server error
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongoDB();

    const applicationId = params.id;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["Pending", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Application status updated successfully",
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
