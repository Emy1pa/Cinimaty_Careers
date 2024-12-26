import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Building,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import JobPortal2 from "../../../public/4236127.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-purple-100">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full px-6 py-2 bg-purple-50 border border-purple-100">
              <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Over 10,000 jobs available
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400">
                Perfect Career
              </span>{" "}
              Path Today
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with top employers and discover opportunities that match
              your skills and aspirations. Your dream job is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl 
                           bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold
                           shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 
                           transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Find Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/post-job"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl
                           border-2 border-purple-400 text-purple-600 font-semibold
                           hover:bg-purple-50 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Post a Job
              </Link>
            </div>
          </div>

          <div className="lg:block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-green-300 rounded-3xl blur-lg opacity-30 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
              <Image
                src={JobPortal2}
                alt="Recruitment"
                className="w-full h-auto rounded-2xl transform hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, label: "Active Jobs", count: "10k+" },
              { icon: Users, label: "Job Seekers", count: "1M+" },
              { icon: Building, label: "Companies", count: "50k+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-purple-100 
                            shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden relative"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-green-400 transform origin-left 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-green-50">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.count}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Popular Job Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Explore opportunities in trending industries
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {["Technology", "Marketing", "Design", "Finance"].map(
            (category, index) => (
              <Link
                href={""}
                key={category}
                className="group relative p-8 bg-white/80 backdrop-blur-lg rounded-3xl 
                         shadow-lg hover:shadow-xl border border-purple-100 
                         transition-all duration-200 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 
                            opacity-0 group-hover:opacity-5 transition-opacity duration-200"
                />
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-green-400 
                            transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {category}
                  </h3>
                  <ArrowRight
                    className="h-5 w-5 text-purple-600 opacity-0 group-hover:opacity-100 
                                     transform translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                  />
                </div>
                <p className="text-gray-600">1000+ jobs</p>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
