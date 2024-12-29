"use client";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  DollarSign,
  Code,
  ArrowRight,
  Search,
  MapPin,
  BadgeCheck,
} from "lucide-react";
import { JobOffer } from "@/app/utils/interfaces";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

interface ApiResponse {
  data: JobOffer[];
}
const ITEMS_PER_PAGE = 8;
const Offers = () => {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  // const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const filteredOffers = offers.filter((offer) => {
    const titleMatch = offer.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const locationMatch =
      !selectedLocation || offer.location === selectedLocation;
    const jobTypeMatch = !selectedJobType || offer.jobType === selectedJobType;
    return titleMatch && locationMatch && jobTypeMatch;
  });
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("pageNumber")) || 1;
  const totalPages = Math.ceil(filteredOffers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleOffers = filteredOffers.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:5000/job-offers/");
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const responseData: ApiResponse = await response.json();
        const data = Array.isArray(responseData)
          ? responseData
          : responseData.data;
        setOffers(data);
        // setFilteredOffers(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "an error occured");
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);
  const locations = [...new Set(offers.map((offer) => offer.location))];
  const jobTypes = [
    ...new Set(offers.map((offer) => offer.jobType).filter(Boolean)),
  ];
  useEffect(() => {
    // let results = offers;
    // results = results.filter((offer) => {
    //   const titleMatch = offer.title
    //     .toLowerCase()
    //     .includes(searchTerm.toLowerCase());
    //   const locationMatch =
    //     selectedLocation === "" || offer.location === selectedLocation;
    //   const jobTypeMatch =
    //     selectedJobType === "" || offer.jobType === selectedJobType;
    //   return titleMatch && locationMatch && jobTypeMatch;
    // });
    // setFilteredOffers(results);
  }, [searchTerm, selectedLocation, selectedJobType, offers]);

  const parseSkills = (skilsString: string | undefined): string[] => {
    if (!skilsString) return [];
    try {
      return JSON.parse(skilsString);
    } catch {
      return skilsString.split(",").map((skill) => skill.trim());
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-purple-100 flex items-center justify-center">
        <div className="text-2xl text-purple-600 font-semibold">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-purple-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-purple-100">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Available Job Offers
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover your next career opportunity
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search job titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-purple-100 focus:border-purple-300 
                         focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              />
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <div className="relative inline-block">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border border-purple-100 focus:border-purple-300 
                           focus:ring-2 focus:ring-purple-200 focus:outline-none appearance-none bg-white"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative inline-block">
                <BadgeCheck className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border border-purple-100 focus:border-purple-300 
                           focus:ring-2 focus:ring-purple-200 focus:outline-none appearance-none bg-white"
                >
                  <option value="">All Job Types</option>
                  {jobTypes.map((jobType) => (
                    <option key={jobType} value={jobType}>
                      {jobType}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.length > 0 ? (
            visibleOffers.map((offer: JobOffer) => (
              <div
                key={offer.id}
                className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-xl 
                         border border-purple-100 transition-all duration-200 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative mb-6 flex-grow">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${offer.imageUrl}`}
                    alt={offer.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-purple-600 mr-1" />
                      <span className="text-sm font-medium text-gray-800">
                        {offer.salaryRange}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600">
                        {offer.location}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {offer.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {parseSkills(offer.requiredSkills).map(
                      (skill: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                                bg-purple-50 text-purple-600 border border-purple-100"
                        >
                          <Code className="w-4 h-4 mr-1" />
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link href={`offers/jobOffers/${offer.id}`}>
                      <button
                        className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 
                      text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 
                      transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-600">
              No job offers available at the moment.
            </div>
          )}
        </div>
        {filteredOffers.length > ITEMS_PER_PAGE && (
          <Pagination
            pageNumber={currentPage}
            pages={totalPages}
            route="/offers"
          />
        )}
      </div>
    </div>
  );
};

export default Offers;
