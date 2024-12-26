"use client";
import Link from "next/link";
import React from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-red-100 relative z-10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
            <AlertCircle className="w-20 h-20 text-red-500 relative" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mt-6 mb-2">
            Oops! Error Encountered
          </h1>

          <div className="text-gray-600 text-center mb-8 w-full">
            <p className="mb-4 text-lg">We hit an unexpected roadblock</p>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <code className="relative block p-4 bg-white rounded-lg text-red-800 text-sm font-mono break-all border border-red-100 group-hover:border-red-200 transition-colors duration-200">
                {error.message}
              </code>
            </div>
          </div>

          <div className="space-y-4 w-full">
            <button
              onClick={() => reset()}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              <RefreshCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="w-full block text-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-red-100 hover:border-red-200 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3"
            >
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center">
            Need help? Contact our{" "}
            <a
              href="/support"
              className="text-red-600 hover:text-red-700 underline"
            >
              support team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
