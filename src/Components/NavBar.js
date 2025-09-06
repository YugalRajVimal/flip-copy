import React from "react";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";

const NavBar = () => {
  return (
    <>
      {/* 🔹 Top Navbar */}
      <div className="w-full flex items-center justify-between bg-white px-6 py-2 shadow">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <img src="/logo.svg" alt="Flipkart" className="h-8" />
        </div>

        {/* Search */}
        <div className="flex items-center w-[40%]">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg flex items-center justify-center">
            <Search className="w-5 text-white" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer">
            <User className="w-5 h-5" />
            <span>Login</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </div>
          <span className="cursor-pointer">Become a Seller</span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
