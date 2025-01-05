import { connectToMongoDB } from "@/app/lib/connectDB";
import { applicationSchema } from "@/app/lib/validation";
import Application from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
/**
 * @swagger
 * /api/apply/{id}/:
 *   post:
 *     summary: Submit a job application
 *     description: Allows users to submit a job application by providing their details and uploading a CV.
 *     tags:
 *       - Applications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job offer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the applicant
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the applicant
 *                 example: johndoe@example.com
 *               message:
 *                 type: string
 *                 description: A message or cover letter from the applicant
 *                 example: I am excited about this opportunity.
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: The applicant's CV file
 *               userId:
 *                 type: string
 *                 description: The ID of the user submitting the application
 *                 example: 12345
 *               jobTitle:
 *                 type: string
 *                 description: The title of the job the user is applying for
 *                 example: Software Developer
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Application submitted successfully
 *                 application:
 *                   type: object
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Internal server error
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  try {
    await connectToMongoDB();
    const { id: offerId } = params;
    if (!offerId) {
      return NextResponse.json(
        { message: "Offer ID is missing" },
        { status: 400 }
      );
    }
    const formData = await req.formData();
    const jobTitle = formData.get("jobTitle");

    if (!jobTitle) {
      return NextResponse.json(
        { message: "Job title is required" },
        { status: 400 }
      );
    }

    const application = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      message: formData.get("message"),
      cv: formData.get("cv") as File,
      offerId,
      userId: formData.get("userId"),
      jobTitle: formData.get("jobTitle"),
    };

    const validation = applicationSchema.safeParse(application);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const cvUrl = await uploadToCloudinary(application.cv);

    const newApplication = await Application.create({
      ...application,
      cvUrl,
      status: "Pending",
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application: newApplication,
      },
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
