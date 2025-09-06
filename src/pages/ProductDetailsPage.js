import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Package, Layers, Weight, Ruler } from "lucide-react";

export default function ProductDetailPage({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // Parse "6min 20sec" → total seconds
  const parseTimeStringToSeconds = (timeString) => {
    const parts = timeString?.match(/(\d+)min\s*(\d+)sec/);
    if (parts?.length === 3) {
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return minutes * 60 + seconds;
    }
    return 0;
  };

  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    product ? parseTimeStringToSeconds(product.timer) : 0
  );

  useEffect(() => {
    if (!product || remainingSeconds <= 0) return;

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [product, remainingSeconds]);

  if (!product) {
    return <div className="p-6 text-center">Product not found!</div>;
  }

  // Format time
  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "0min 00sec";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds < 10 ? "0" : ""}${seconds}sec`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      {/* 🔹 Image + Carousel */}
      <div className="flex justify-center py-6 border-b bg-gray-50">
        <div className="w-full max-w-md">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-64 md:h-80 object-contain"
          />
          {/* Carousel dots */}
          <div className="flex justify-center mt-3 gap-2">
            {product.gallery?.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition ${
                  i === 0 ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Product Title + Price */}
      <div className="px-4 md:px-6 py-3 border-b text-left">
        <h1 className="text-base md:text-lg font-medium text-gray-800">{product.name}</h1>

        <div className="flex items-center gap-2 mt-1">
          {product.assured && (
            <img src="/fAssured.png" alt="Assured" className="h-5" />
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-green-600 font-semibold text-sm md:text-base">
            {product.discount} off
          </span>
          <span className="line-through text-gray-500 text-sm">
            {product.originalPrice}
          </span>
          <span className="text-lg md:text-xl font-bold text-gray-900">
            ₹{product.price}
          </span>
        </div>
      </div>

      {/* 🔹 Offer Timer */}
      {product?.timer && (
        <div className="px-4 md:px-6 py-2 border-b flex justify-center gap-2 items-center text-sm md:text-base">
          <span className="font-semibold">Offer ends in</span>
          <span className="text-red-500 font-bold">
            {formatTime(remainingSeconds)}
          </span>
        </div>
      )}

      {/* 🔹 Pay Later Banner */}
      <div className="border-b px-4 md:px-6 py-4">
        <img
          src="/payLaterBanner.png"
          alt="Flipkart Pay Later"
          className="w-full rounded-md"
        />
      </div>

      {/* 🔹 Extra Info (icons row) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 border-b text-center text-xs md:text-sm py-4 gap-y-4">
        <div className="flex flex-col items-center">
          <img
            src="/replace.png"
            alt="7 Days Replacement"
            className="h-6 mb-1"
          />
          <span>7 Days Replacement</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/nocod.png" alt="No COD" className="h-6 mb-1" />
          <span>No Cash On Delivery</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/fAssured.png" alt="Assured" className="h-6 mb-1" />
          <span>Plus (F-Assured)</span>
        </div>
      </div>

      {/* 🔹 Product details */}
      <div className="bg-white">
        {/* Specs Grid */}
        <div className="px-4 md:px-6 py-4 border-b text-sm md:text-base text-gray-800">
          <div className="flex flex-col gap-2 text-left">
            <p><span className="font-semibold">Brand</span>: {product.brand}</p>
            <p><span className="font-semibold">Colour</span>: {product.colour}</p>
            <p><span className="font-semibold">Material</span>: {product.material}</p>
            <p><span className="font-semibold">Product Dimensions</span>: {product.dimensions}</p>
            <p><span className="font-semibold">Size</span>: {product.size}</p>
            <p><span className="font-semibold">Back Style</span>: {product.backStyle}</p>
            <p><span className="font-semibold">Special Feature</span>: {product.specialFeature}</p>
          </div>
        </div>

        {/* Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-6 py-6 border-b text-sm text-gray-700">
          <div className="flex items-start justify-center gap-2 ">
            <Weight className="h-5 w-5" />
            <div>
              <p className="font-semibold">Item Weight</p>
              <p className="text-gray-600">{product.itemWeight}</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <Layers className="h-5 w-5" />
            <div>
              <p className="font-semibold">Frame Material</p>
              <p className="text-gray-600">{product.frameMaterial}</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <Ruler className="h-5 w-5" />
            <div>
              <p className="font-semibold">Max Weight</p>
              <p className="text-gray-600">{product.maxWeight}</p>
            </div>
          </div>
          <div className="flex items-start justify-center gap-2">
            <Package className="h-5 w-5" />
            <div>
              <p className="font-semibold">Style</p>
              <p className="text-gray-600">{product.style}</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 md:px-6 py-4 border-b mb-[60px] text-left">
          <h2 className="font-semibold text-gray-900 mb-2">About this item</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-gray-700 space-y-2">
            {product.about.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Bottom Buttons */}
        <div className="flex fixed bottom-0 left-0 w-full md:static">
          <Link
            to={`/order/${product.id}`}
            className="flex-1 py-3 text-gray-800 bg-white font-medium border-r text-center text-sm md:text-base"
          >
            Add to Cart
          </Link>
          <Link
            to={`/order/${product.id}`}
            className="flex-1 py-3 font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-center text-sm md:text-base"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
