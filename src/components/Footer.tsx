import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-purple-800 to-purple-950 text-purple-200">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100/10 rounded-xl">
                <Briefcase className="h-6 w-6 text-green-200" />
              </div>
              <span className="text-xl font-bold text-white">JobPortal</span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting talent with opportunities worldwide. Your journey to
              success starts here.
            </p>
            <div className="flex space-x-5">
              <Link
                href="#"
                className="hover:text-green-200 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-green-200 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-green-200 transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="hover:text-green-200 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Contact",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={``}
                    className="text-sm hover:text-green-200 transition-colors duration-300 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {["Technology", "Marketing", "Design", "Finance"].map(
                (category) => (
                  <li key={category}>
                    <Link
                      href={``}
                      className="text-sm hover:text-green-200 transition-colors duration-300 block"
                    >
                      {category}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <div className="space-y-4">
              {[
                {
                  icon: <Mail className="h-5 w-5" />,
                  text: "support@jobportal.com",
                },
                { icon: <Phone className="h-5 w-5" />, text: "+1 234 567 890" },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  text: "123 Business Street, NY 10001",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="mt-1 text-green-200">{item.icon}</div>
                  <span className="text-sm group-hover:text-green-200 transition-colors duration-300">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-12 pt-8">
          <div className="text-center text-sm">
            <p className="text-purple-300">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
