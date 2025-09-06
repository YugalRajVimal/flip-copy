import React from "react";

export default function OrderSummary({
  setStep,
  formData,
  product,
  getSessionId,
}) {
  const order = {
    customer: {
      name: formData.fullName,
      address: `${formData.house}, ${formData.road}, ${formData.city}, ${formData.state} (${formData.pincode})`,
      phone: formData.mobile,
      email: formData.email,
    },
    product: {
      name: product.name,
      image: product.img,
      qty: 1,
      mrp: parseFloat(product.originalPrice.replace(/[^0-9.-]+/g, "")),
      discount:
        parseFloat(product.originalPrice.replace(/[^0-9.-]+/g, "")) -
        parseFloat(product.price),
      discountPer: product.discount,
      finalPrice: parseFloat(product.price),
    },
  };

  return (
    <div className="bg-[#f1f2f4]  flex flex-col">
      {/* 🔹 Header */}
      <div className="flex items-center px-4 py-3 border-b bg-[#f1f2f4]">
        <button onClick={() => setStep(0)} className="text-gray-600 mr-2">
          ←
        </button>
        <h1 className="font-medium text-xl sm:text-2xl">Order Summary</h1>
      </div>

      {/* 🔹 Delivered To */}
      <div className="px-4 py-4 border-b bg-[#f1f2f4] text-left">
        <p className="font-medium text-lg sm:text-xl text-gray-800">Delivered to:</p>
        <p className="mt-1 text-gray-700">{order.customer.name}</p>
        <p className="text-sm text-gray-600">{order.customer.address}</p>
        <p className="text-sm text-gray-600">{order.customer.phone}</p>
      </div>

      {/* 🔹 Product Section */}
      <div className="px-4 py-4 border-b bg-[#f1f2f4] flex flex-col sm:flex-row gap-4 items-start">
        <img
          src={order.product.image}
          alt={order.product.name}
          className="w-24 h-24 object-contain rounded self-center sm:self-start"
        />
        <div className="flex-1 text-left">
          <p className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2">
            {order.product.name}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
              {order.product.discountPer}
            </span>
            <span className="text-gray-500 line-through text-sm">
              ₹{order.product.mrp.toLocaleString()}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{order.product.finalPrice}
            </span>
          </div>
          <p className="text-sm text-gray-700 mt-1">Qty: {order.product.qty}</p>
        </div>
      </div>

      {/* 🔹 Price Details */}
      <div className="px-4 py-4 border-b bg-[#f1f2f4] text-left">
        <h2 className="font-medium text-lg sm:text-xl text-gray-800 mb-3">
          Price Details
        </h2>
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>Price (1 item)</span>
          <span>₹{order.product.mrp.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600 mb-2">
          <span>Discount</span>
          <span>- ₹{order.product.discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span>Delivery Charges</span>
          <span className="text-green-600">FREE Delivery</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-gray-900">
          <span>Total Amount</span>
          <span>₹{order.product.finalPrice}</span>
        </div>
        <p className="text-green-600 text-sm mt-1">
          You will save ₹{order.product.discount.toLocaleString()} on this order
        </p>
      </div>

      {/* 🔹 Footer (Sticky on mobile) */}
      <div className="mt-auto border-t bg-[#f1f2f4] px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0">
        <p className="text-lg sm:text-xl flex flex-col font-semibold text-gray-900">
          <span className="text-gray-500 line-through text-sm">
            ₹{order.product.mrp.toLocaleString()}
          </span>
          ₹{order.product.finalPrice}
        </p>
        <button
          onClick={async () => {
            await getSessionId(
              order.customer.name,
              order.customer.email,
              order.customer.phone,
              order.product.finalPrice
            );
            setStep(2);
          }}
          className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded font-medium transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
