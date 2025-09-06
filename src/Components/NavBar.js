import React, { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🔹 Navbar */}
      <div className="w-full bg-white shadow pr-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center justify-start gap-1">
            <img src="/logo.svg" alt="Flipkart" className="h-8" />
          </div>

          {/* 🔹 Desktop Search */}
          <div className="hidden md:flex items-center w-[40%]">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg flex items-center justify-center">
              <Search className="w-5 text-white" />
            </button>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* 🔹 Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 🔹 Mobile Search */}
        <div className="flex md:hidden items-center mt-2 ml-4">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-r-lg flex items-center justify-center">
            <Search className="w-5 text-white" />
          </button>
        </div>

        {/* 🔹 Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 space-y-3 border-t border-gray-200 pt-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <User className="w-5 h-5" />
              <span>Login</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
            <span className="cursor-pointer block">Become a Seller</span>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
