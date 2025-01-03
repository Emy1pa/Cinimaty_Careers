"use client";
import { useState } from "react";
import { UploadCloud, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ApplicationFormProps {
  offerId: string;
  jobTitle: string;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  message: string;
  cv: FileList;
}

const ApplicationForm = ({
  offerId,
  jobTitle,
  onClose,
}: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!offerId) {
      alert("Offer ID is missing or invalid");
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    setIsSubmitting(true);
    console.log("Form data:", data);
    try {
      const formData = new FormData();
      console.log("FormData received:", [...formData.entries()]);

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("offerId", offerId);
      formData.append("userId", userId);
      formData.append("jobTitle", jobTitle);
      if (data.cv && data.cv[0]) {
        formData.append("cv", data.cv[0]);
      } else {
        throw new Error("No file selected");
      }
      console.log("FormData entries:", [...formData.entries()]);

      const response = await fetch(`/api/apply/${offerId}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }
      toast.success("Application has been submitted successfully:");

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Application submission error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <h2 className="text-2xl font-bold mb-4">Submit Application</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                placeholder="Tell us why you're interested in this position..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CV (PDF)</label>
              <input
                {...register("cv", {
                  required: "CV is required",
                  validate: {
                    acceptedFormats: (files) =>
                      files?.[0]?.type === "application/pdf" ||
                      "Only PDF files are accepted",
                    required: (files) =>
                      files?.length > 0 || "Please upload your CV",
                  },
                })}
                type="file"
                accept=".pdf"
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold file:bg-purple-50 
                         file:text-purple-700 hover:file:bg-purple-100"
              />
              {errors.cv && (
                <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
