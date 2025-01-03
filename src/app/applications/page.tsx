"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  MessageCircle,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Application, JobOffer } from "../utils/interfaces";

interface CombinedApplication extends Application {
  jobOffer?: JobOffer;
}

const MyApplications = () => {
  const [applications, setApplications] = useState<CombinedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const jwtToken = localStorage.getItem("token");

        if (!userId) {
          console.log("Missing userId cookie");
        }
        if (!jwtToken) {
          console.log("Missing jwtToken cookie");
        }

        if (!userId || !jwtToken) {
          setError("Please log in to view your applications");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/applications/${userId}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 401) {
          setError("Your session has expired. Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        console.log(data);

        setApplications(data.applications);
      } catch (err) {
        setError("Failed to load applications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md">
          <div className="p-6 text-center text-red-600 flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-2 text-gray-600">
            Track your job application status
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 text-center text-gray-600">
              You haven't submitted any applications yet.
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.jobTitle || "Job Title Not Available"}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{application.fullName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2
                        ${
                          application.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          application.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          application.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                      >
                        {getStatusIcon(application.status)}
                        <span>{application.status}</span>
                      </div>
                      <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Applied on:{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600 flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 mt-1" />
                      <p className="flex-1">{application.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
