import React from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white text-sm">
      {/* 🔹 Top Section */}
      <div className="flex md:flex-row flex-col justify-evenly gap-6 px-6 md:px-12 py-10 border-b border-gray-700">
        {/* About */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-400">ABOUT</h3>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-400">HELP</h3>
          <ul className="space-y-2">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-400">CONSUMER POLICY</h3>
          <ul className="space-y-2">
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        {/* Addresses */}
        <div className="col-span-2 md:col-span-1 md:pl-6">
          <h3 className="font-semibold mb-3 text-gray-400">Mail Us:</h3>
          <p className="text-gray-300 mb-4">
            Flipkart Internet Private Limited, <br />
            Buildings Alyssa, Begonia & <br />
            Clove Embassy Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli Village, <br />
            Bengaluru, 560103, <br />
            Karnataka, India
          </p>
          <h3 className="font-semibold mb-3 text-gray-400">Social:</h3>
          <div className="flex space-x-4 text-gray-300 justify-center">
            <Facebook className="w-5 h-5 cursor-pointer" />
            <Twitter className="w-5 h-5 cursor-pointer" />
            <Youtube className="w-5 h-5 cursor-pointer" />
            <Instagram className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 text-gray-300 text-xs">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4 md:mb-0">
          <span>Become a Seller</span>
          <span>Advertise</span>
          <span>Gift Cards</span>
          <span>Help Center</span>
        </div>
        <div className="text-center md:text-left mb-4 md:mb-0">
          © 2007-2025 Flipkart.com
        </div>
        <div className="flex items-center  space-x-2">
          <img
            src="/payMethods.jpg"
            alt="Visa"
            className="h-10 rounded-full"
          />
          
        </div>
      </div>
    </footer>
  );
}
