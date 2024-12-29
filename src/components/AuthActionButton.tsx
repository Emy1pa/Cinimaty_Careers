"use client";
import React, { useEffect, useState } from "react";
import { Send, LogIn } from "lucide-react";
import Link from "next/link";

const AuthActionButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/check", {
        credentials: "include",
      });
      const data = await response.json();
      setIsLoggedIn(!!(token && data.isAuthenticated));
    };

    window.addEventListener("storage", checkToken);
    checkToken();

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  if (isLoggedIn) {
    return (
      <button
        className="w-full py-4 px-6 rounded-xl bg-purple-600 
                   text-white font-semibold text-lg shadow-lg
                   hover:bg-purple-700 transform hover:-translate-y-0.5 
                   transition-all duration-200 flex items-center justify-center"
      >
        <Send className="mr-2 h-5 w-5" />
        Apply Now
      </button>
    );
  }

  return (
    <Link href={"/login"}>
      <button
        className="w-full py-4 px-6 rounded-xl bg-gray-600 
                  text-white font-semibold text-lg shadow-lg
                  hover:bg-gray-700 transform hover:-translate-y-0.5 
                  transition-all duration-200 flex items-center justify-center"
      >
        <LogIn className="mr-2 h-5 w-5" />
        Login to Apply
      </button>
    </Link>
  );
};

export default AuthActionButton;
