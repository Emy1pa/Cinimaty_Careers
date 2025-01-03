"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", checkToken);
    checkToken();

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const navItems = [
    { label: "Find Jobs", href: "/offers" },
    { label: "Companies", href: "/companies" },
    { label: "My Applications", href: "/applications" },
  ];

  return (
    <nav className="bg-gradient-to-r from-white via-purple-50 to-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-all duration-300">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                JobPortal
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50/70 transition-all duration-300 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-purple-100">
                <Link
                  href="/login"
                  className="px-4 py-2 text-purple-600 font-medium hover:text-purple-700 hover:bg-purple-50/70 rounded-lg transition-all duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium 
                          shadow-[0_4px_12px_rgba(147,51,234,0.25)] 
                          hover:shadow-[0_6px_20px_rgba(147,51,234,0.35)] 
                          hover:bg-purple-700 transition-all duration-300 
                          active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <Link
                href="/"
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium 
                          shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.35)]
                          hover:bg-red-700 transition-all duration-300 
                          active:scale-95"
              >
                <button onClick={handleLogout}>Logout</button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50/70 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-purple-50">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50/70 
                          transition-all duration-300 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="grid gap-2 pt-4 mt-4 border-t border-purple-50">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-3 text-purple-600 font-medium 
                          hover:text-purple-700 hover:bg-purple-50/70 rounded-lg 
                          transition-all duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg 
                          font-medium shadow-[0_4px_12px_rgba(147,51,234,0.25)] 
                          hover:shadow-[0_6px_20px_rgba(147,51,234,0.35)] 
                          hover:bg-purple-700 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <Link href="/">
                <button
                  className="w-full text-center px-4 py-3 bg-red-600 text-white rounded-lg 
                          font-medium shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.35)]
                          hover:bg-red-700 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
