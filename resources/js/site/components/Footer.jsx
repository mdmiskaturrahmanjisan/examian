import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-10 shadow-inner">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* About */}
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-orange-400">About Us</h4>
            <p className="text-gray-400 text-sm">
              Dedicated to providing exceptional, reliable, and affordable services tailored to your everyday needs.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-orange-400">Contact</h4>
            <p className="text-gray-400">
              Email:{" "}
              <a href="mailto:miskaturrahman1997@gmail.com" className="hover:text-orange-300">
                miskaturrahman1997@gmail.com
              </a>
            </p>
            <p className="text-gray-400">
              WhatsApp:{" "}
              <a href="tel:+8801759741135" className="hover:text-orange-300">
                +8801759741135
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-orange-400">Quick Links</h4>
            <ul className="text-gray-400 space-y-1">
              <li>
                <a href="#" className="hover:text-orange-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-300">
                  Careers
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        &copy; {currentYear} Made <span className="text-red-500">❤️</span> by Md Miskatur Rahman. All Rights Reserved.
      </div>
    </footer>
  );
}
