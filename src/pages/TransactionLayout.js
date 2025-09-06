import React, { useState } from "react";
import AddressForm from "./AddressFormPage";
import PaymentPage from "./PaymentPage";
import { Link, useParams } from "react-router-dom";
import OrderSummary from "./OrderSummaryPage";

const TransactionLayout = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "Andhra Pradesh",
    house: "",
    road: "",
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            The product you are trying to purchase could not be found. Please
            ensure the URL is correct or return to the product listing.
          </p>
          <Link
            to="/"
            className="mt-2 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[95vh] bg-[#f1f2f4] overflow-y-auto">
      {/* 🔹 Step Progress Bar */}
      <div className="flex items-center justify-center my-4 h-[5vh]">
        {/* Step 1: Address */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              step >= 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <span
            className={`ml-2 ${
              step >= 0 ? "font-medium text-blue-600" : "text-gray-400"
            }`}
          >
            Address
          </span>
        </div>

        {/* Separator 1-2 */}
        <div
          className={`w-12 h-0.5 mx-2 ${
            step >= 1 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Step 2: Order Summary */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span
            className={`ml-2 ${
              step >= 1 ? "font-medium text-blue-600" : "text-gray-400"
            }`}
          >
            Order Summary
          </span>
        </div>

        {/* Separator 2-3 */}
        <div
          className={`w-12 h-0.5 mx-2 ${
            step >= 2 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Step 3: Payment */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <span
            className={`ml-2 ${
              step >= 2 ? "font-medium text-blue-600" : "text-gray-400"
            }`}
          >
            Payment
          </span>
        </div>
      </div>
      <div className="h-[82vh] w-screen">
        {step === 0 && (
          <AddressForm
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 1 && (
          <OrderSummary
            formData={formData}
            setStep={setStep}
            product={product}
          />
        )}
        {step === 2 && (
          <PaymentPage
            formData={formData}
            setStep={setStep}
            product={product}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionLayout;
