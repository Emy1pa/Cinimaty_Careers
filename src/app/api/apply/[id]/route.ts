import { connectToMongoDB } from "@/app/lib/connectDB";
import { applicationSchema } from "@/app/lib/validation";
import Application from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
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
