"use client";
import React from "react";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import LoginImage from "../../../../public/login.jpg";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/app/lib/validation";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  id: string;
  isAdmin: boolean;
  exp: number;
  [key: string]: any;
}
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        const token = result.token;
        console.log("token", token);
        localStorage.setItem("token", token);
        const decoded: DecodedToken = jwtDecode(token);
        console.log(decoded);
        console.log(decoded.id);

        localStorage.setItem("userId", decoded.id.toString());

        window.dispatchEvent(new Event("storage"));

        toast.success("Login successful");
        setTimeout(() => {
          router.push("/offers");
        }, 1000);
      } else {
        toast.error(result.message || "Login failed");
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
              src={LoginImage}
              alt="Login illustration"
              className="w-full h-auto"
            />
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <Lock className="w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Sign In
              </span>
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <div className="space-y-4">
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

                <div className="flex justify-end">
                  <a
                    href="/reset-password"
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Reset Password
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Login
                </button>

                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Sign up now
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

export default Login;
