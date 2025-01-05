"use client";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Calendar,
  MessageCircle,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Mail,
} from "lucide-react";
import { Application, JobOffer } from "../utils/interfaces";

interface CombinedApplication extends Application {
  jobOffer?: JobOffer;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<CombinedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const jwtToken = localStorage.getItem("token");

        if (!jwtToken) {
          setError("Please log in to view applications");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/applications", {
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

  const handleStatusChange = async (
    applicationId: string,
    newStatus: string
  ) => {
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update application status");
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
          <h1 className="text-3xl font-bold text-gray-900">All Applications</h1>
          <p className="mt-2 text-gray-600">
            Manage and review all job applications
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 text-center text-gray-600">
              No applications have been submitted yet.
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.jobTitle || "Job Title Not Available"}
                        </h3>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-4 w-4" />
                            <span>{application.fullName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{application.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(application._id, "Accepted")
                          }
                          className={`px-4 py-1.5 rounded-full text-sm font-medium 
                            ${
                              application.status === "Accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 hover:bg-green-50 text-gray-600 hover:text-green-600"
                            }`}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(application._id, "Rejected")
                          }
                          className={`px-4 py-1.5 rounded-full text-sm font-medium 
                            ${
                              application.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600"
                            }`}
                        >
                          Reject
                        </button>
                      </div>
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
                        }`}
                      >
                        {getStatusIcon(application.status)}
                        <span>{application.status}</span>
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

export default AdminApplications;
