import { useEffect, useState } from "react";
import { ShieldCheck, BadgeCheck, RefreshCcw } from "lucide-react";

export default function PaymentPage({ product, handlePayment }) {
  // 🔹 Convert timer string into seconds
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
    return <div>Product not found!</div>;
  }

  // 🔹 Format time
  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "0min 00sec";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds < 10 ? "0" : ""}${seconds}sec`;
  };

  return (
    <div className="h-full bg-[#f1f2f4] flex flex-col items-center px-4 sm:px-6 py-6">
      {/* 🔹 Offer Timer */}
      <div className="text-red-600 font-semibold text-base sm:text-lg mb-4 text-center">
        Offer ends in {formatTime(remainingSeconds)}
      </div>

      {/* 🔹 Price Details Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Price Details</h2>
        <div className="flex justify-between py-2 text-sm sm:text-base">
          <span>Price (1 item)</span>
          <span className="font-medium">₹{product.price}</span>
        </div>
        <div className="flex justify-between py-2 text-sm sm:text-base">
          <span>Delivery Charges</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between py-2 text-base sm:text-lg font-bold">
          <span>Amount Payable</span>
          <span>₹{product.price}</span>
        </div>
      </div>

      {/* 🔹 Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6 max-w-lg w-full">
        <div className="flex flex-col items-center text-sm sm:text-base text-gray-700">
          <BadgeCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 mb-1" />
          Authentic Products
        </div>
        <div className="flex flex-col items-center text-sm sm:text-base text-gray-700">
          <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-green-500 mb-1" />
          Secure Payments
        </div>
        <div className="flex flex-col items-center text-sm sm:text-base text-gray-700">
          <RefreshCcw className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 mb-1" />
          Easy Returns
        </div>
      </div>

      {/* 🔹 Payment Options */}
      <div className="flex justify-center mt-8 max-w-lg w-full">
        <img
          src="/payMethods.jpg"
          alt="Payment Methods"
          className="w-full sm:w-4/5 md:w-3/5 object-contain"
        />
      </div>

      {/* 🔹 Final Price & Button */}
      <div className="mt-8 text-center w-full max-w-lg">
        <p className="line-through text-gray-400 text-sm sm:text-base">
          {product.originalPrice}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">
          ₹{product.price}
        </p>
        <button
          onClick={async () => await handlePayment()}
          className="mt-4 w-full mb-10 sm:w-auto px-8 py-3 text-base sm:text-lg bg-yellow-400 text-black font-semibold rounded-2xl shadow-md hover:bg-yellow-500 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
