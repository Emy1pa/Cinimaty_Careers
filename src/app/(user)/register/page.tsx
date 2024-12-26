"use client";
import React from "react";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import JobPortal from "../../../../public/4236127.jpg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/app/lib/validation";
type RegisterFormData = z.infer<typeof registerSchema>;
const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Registration successfully registered");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-purple-100 w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <Image
              src={JobPortal}
              alt="Register illustration"
              className="w-full h-auto"
            />
          </div>

          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Create Account
              </span>
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message as string}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message as string}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-purple-500" />
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                    className="w-full pl-10 pr-4 py-2 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message as string}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
