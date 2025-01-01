import React from "react";
import { DollarSign, MapPin, Clock, Star, Code, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import AuthActionButton from "@/app/offers/jobOffers/[id]/AuthActionButton";
async function getAuthStatus() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("jwtToken");

  return !!cookie;
}
const OfferDetails = async ({ params }: { params: { id: string } }) => {
  const isAuthenticated = await getAuthStatus();

  const response = await fetch(
    `http://localhost:5000/job-offers/${params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch offer");
  }
  const offer = await response.json();

  const parseSkills = (skillsString: string): string[] => {
    try {
      return JSON.parse(skillsString);
    } catch {
      return skillsString.split(",").map((skill) => skill.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative w-full h-96 mb-8">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${offer.imageUrl}`}
            alt={offer.title}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
        <Link href={"/offers"}>
          <button className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Listings
          </button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {offer.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">{offer.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">{offer.salaryRange}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">
                {offer.jobType || "Full Time"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-gray-600">
                {offer.experienceLevel || "Mid-Level"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {offer.description || "No description available"}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {parseSkills(offer.requiredSkills).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm 
                             bg-purple-50 text-purple-600 border border-purple-100"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-4">
              <AuthActionButton offerId={params.id} />
              <Link href={"/offers"}>
                <button
                  className="mt-4 w-full py-4 px-6 rounded-xl border-2 border-purple-600
                text-purple-600 font-semibold text-lg
                hover:bg-purple-50 transform hover:-translate-y-0.5 
                transition-all duration-200 flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Return to Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
