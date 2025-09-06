import { useEffect, useState } from "react";
import { ShieldCheck, BadgeCheck, RefreshCcw } from "lucide-react";

export default function PaymentPage() {
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="h-full  bg-[#f1f2f4] flex flex-col items-center p-6">
      {/* Offer Timer */}
      <div className="text-red-600 font-semibold text-lg mb-4">
        Offer ends in {minutes}min {seconds < 10 ? `0${seconds}` : seconds}sec
      </div>

      {/* Price Details Card */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Price Details</h2>
        <div className="flex justify-between py-2">
          <span>Price (1 item)</span>
          <span className="font-medium">₹499.00</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Delivery Charges</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between py-2 text-lg font-bold">
          <span>Amount Payable</span>
          <span>₹499.00</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 text-center mt-6 max-w-lg w-full">
        <div className="flex flex-col items-center text-sm text-gray-700">
          <BadgeCheck className="w-6 h-6 text-blue-500 mb-1" />
          Authentic Products
        </div>
        <div className="flex flex-col items-center text-sm text-gray-700">
          <ShieldCheck className="w-6 h-6 text-green-500 mb-1" />
          Secure Payments
        </div>
        <div className="flex flex-col items-center text-sm text-gray-700">
          <RefreshCcw className="w-6 h-6 text-orange-500 mb-1" />
          Easy Returns
        </div>
      </div>

      {/* Payment Options */}
      <div className="flex justify-center gap-8  flex-wrap">
        <img src="/payMethods.jpg" alt="Visa" className="w-full" />
      </div>

      {/* Final Price & Button */}
      <div className=" text-center">
        <p className="line-through text-gray-400">₹17,999.00</p>
        <p className="text-2xl font-bold text-gray-900">₹499.00</p>
        <button className="mt-4 px-12 py-4 text-lg bg-yellow-400 text-black font-semibold rounded-2xl shadow-md hover:bg-yellow-500 transition">
          Order Now
        </button>
      </div>
    </div>
  );
}
