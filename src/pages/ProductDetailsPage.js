import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Package, Layers, Weight, Ruler } from "lucide-react";

export default function ProductDetailPage({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // 🔹 Default to 0 if product is missing
  const parseTimeStringToSeconds = (timeString) => {
    const parts = timeString?.match(/(\d+)min\s*(\d+)sec/);
    if (parts?.length === 3) {
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return minutes * 60 + seconds;
    }
    return 0;
  };

  // ✅ Hook always runs
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    product ? parseTimeStringToSeconds(product.timer) : 0
  );

  // ✅ Hook always runs
  useEffect(() => {
    if (!product || remainingSeconds <= 0) return;

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [product, remainingSeconds]);

  // ❌ Put conditional return *after* hooks
  if (!product) {
    return <div>Product not found!</div>;
  }

  // 🔹 Formatter
  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "0min 00sec";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds < 10 ? "0" : ""}${seconds}sec`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      {/* 🔹 Image + Carousel */}
      <div className="flex justify-center py-8 border-b">
        <div className="min-h-[250px]">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          {/* Carousel dots */}
          <div className="flex justify-center mt-2 gap-1">
            {product.gallery?.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === 0 ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Product Title + Price */}
      <div className="px-6 py-3 border-b text-left">
        <h1 className="text-sm text-gray-800">{product.name}</h1>

        <div className="flex items-center gap-2 mt-1">
          {product.assured && (
            <img src="/fAssured.png" alt="Assured" className="h-5" />
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-green-600 font-semibold text-sm">
            {product.discount} off
          </span>
          <span className="line-through text-gray-500 text-sm">
            {product.originalPrice}
          </span>
          <span className="text-lg font-bold text-gray-900">
            {product.price}
          </span>
        </div>
      </div>

      {/* 🔹 Offer Timer */}
      {product?.timer && (
        <div className="px-6 py-2 border-b flex justify-center gap-2 items-center text-sm">
          <span className="font-semibold">Offer ends in</span>
          <span className="text-red-500 font-bold">
            {formatTime(remainingSeconds)}
          </span>
        </div>
      )}

      {/* 🔹 Pay Later Banner (structured JSX, not static image) */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <img
          src="/payLaterBanner.png"
          alt="Flipkart Pay Later"
          className="w-full"
        />
      </div>

      {/* 🔹 Extra Info (icons) */}
      <div className="grid grid-cols-3 border-b text-center text-xs py-4">
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

      {/* Product details  */}
      <div className="bg-white">
        {/* 🔹 Specs Grid */}
        <div className="px-6 py-4 border-b text-sm text-left text-gray-800">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Brand</span>: {product.brand}
            </p>
            <p>
              <span className="font-semibold">Colour</span>: {product.colour}
            </p>
            <p>
              <span className="font-semibold">Material</span>:{" "}
              {product.material}
            </p>
            <p>
              <span className="font-semibold">Product Dimensions</span>:{" "}
              {product.dimensions}
            </p>
            <p>
              <span className="font-semibold">Size</span>: {product.size}
            </p>
            <p>
              <span className="font-semibold">Back Style</span>:{" "}
              {product.backStyle}
            </p>
            <p>
              <span className="font-semibold">Special Feature</span>:{" "}
              {product.specialFeature}
            </p>
          </div>
        </div>

        {/* 🔹 Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-6 border-b text-sm text-gray-700">
          <div className="flex items-start justify-center gap-2">
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

        {/* 🔹 About Section */}
        <div className="px-6 py-4 border-b mb-[50px] text-left">
          <h2 className="font-semibold text-gray-900 mb-2">About this item</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 ">
            {product.about.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* 🔹 Bottom Buttons */}
        <div className="flex fixed bottom-0 left-0 w-screen">
          <Link
            to={`/order/${product.id}`}
            className="flex-1 py-3 text-gray-800 bg-white font-medium border-r text-center"
          >
            Add to Cart
          </Link>
          <Link
            to={`/order/${product.id}`}
            className="flex-1 py-3 font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
