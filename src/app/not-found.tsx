"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Home, MapPin } from "lucide-react";
import NotFound from "../../public/notfound.jpg";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-5xl w-full border border-yellow-100 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start flex-1">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
              404
            </h1>

            <h2 className="text-4xl font-bold text-gray-700 mb-2">
              Page Not Found
            </h2>

            <div className="text-gray-600 mb-8 w-full">
              <p className="mb-4 text-lg">
                Oops! We couldn't find the page you're looking for
              </p>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative block p-4 bg-white rounded-lg text-gray-600 text-sm break-all border border-yellow-100 group-hover:border-yellow-200 transition-colors duration-200">
                  <MapPin className="w-5 h-5 inline-block mr-2 text-yellow-500" />
                  The page might have been moved or deleted
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full max-w-md">
              <Link
                href="/"
                className="w-full block text-center bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                <span>Return to Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full block text-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-yellow-100 hover:border-yellow-200 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
              >
                <span>Go Back</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={NotFound}
                alt="404 Error Robot"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center mt-8">
          Lost? Check our{" "}
          <a
            href="/sitemap"
            className="text-yellow-600 hover:text-yellow-700 underline"
          >
            sitemap
          </a>{" "}
          or{" "}
          <a
            href="/contact"
            className="text-yellow-600 hover:text-yellow-700 underline"
          >
            contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
