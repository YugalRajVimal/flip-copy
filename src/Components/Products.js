import React from "react";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 p-2  md:p-6 bg-gray-100">
      {products.map((product) => (
        <a href={`/product/${product.id}`}>
          <div
            key={product.id}
            className="bg-white border rounded-md h-full p-1 md:p-4 flex flex-col shadow hover:shadow-lg transition relative"
          >
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={product.img}
                alt={product.name}
                className="h-32 md:h-40 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium mt-3 line-clamp-2 text-gray-800">
              {product.name}
            </h3>

            {/* Price & Discount */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-green-600 font-semibold text-xs md:text-sm">
                {product.discount} Off
              </span>
              <span className="line-through text-gray-500 text-xs md:text-sm">
                {product.originalPrice}
              </span>
            </div>

            {/* Final Price */}
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="text-md md:text-lg text-left font-bold text-gray-900">
                ₹{product.price}
              </div>
              {/* Assured Badge */}
              {product.assured && (
                <img src="/fAssured.png" alt="Assured" className="h-5" />
              )}
            </div>
            {/* Rating + Reviews */}
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
                {product.rating} <span>★</span>
              </span>
              <span className="text-xs md:text-sm text-gray-600">
                {product.reviews} Ratings
              </span>
            </div>

            {/* Delivery Info */}
            <div className="text-xs text-gray-600 mt-2">{product.delivery}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
