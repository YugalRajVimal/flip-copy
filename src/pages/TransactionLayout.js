import React, { useEffect, useState } from "react";
import AddressForm from "./AddressFormPage";
import PaymentPage from "./PaymentPage";
import { Link, useParams } from "react-router-dom";
import OrderSummary from "./OrderSummaryPage";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";

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

  const [cashfree, setCashfree] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const initializeSDK = async () => {
      const sdk = await load({
        mode: "sandbox",
      });
      setCashfree(sdk);
    };
    initializeSDK();
  }, []);

  const getSessionId = async (name, email, phone,amount) => {
    console.log("getSessionId called with:", { name, email, phone });
    if (phone && !phone.startsWith("+91")) {
      phone = `+91${phone}`;
    }
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/generate-sessionid`;
      const requestBody = { name, email, phone,amount };
      console.log("Making API call to:", apiUrl);
      console.log("Request body:", requestBody);

      const response = await axios.post(apiUrl, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API response received:", response);

      if (response.status === 200) {
        const data = response.data;
        console.log("Response data (status 200):", data);
        const orderInfo = {
          createdAt: data.created_at,
          orderId: data.order_id,
          orderAmount: data.order_amount,
          customerName: data.customer_details.customer_name,
          customerEmail: data.customer_details.customer_email,
          customerPhone: data.customer_details.customer_phone,
        };
        console.log("Constructed orderInfo:", orderInfo);
        setOrderDetails(orderInfo); // still sets the state for UI
        console.log("Setting orderDetails state to:", orderInfo);
        setSessionId(data.payment_session_id);
        console.log("Setting sessionId state to:", data.payment_session_id);
        // Note: sessionId and orderDetails might not reflect updated state immediately here due to async nature of setState
        console.log("Current sessionId state (may be stale):", sessionId);
        console.log("Current orderDetails state (may be stale):", orderDetails);
        console.log("Returning orderInfo:", orderInfo);
        return orderInfo; // return this instead of relying on state
      } else {
        console.error(
          "Error generating sessionId: Unexpected status code",
          response.status,
          response.data
        );
        return null;
      }
    } catch (error) {
      console.error("Error generating sessionId during API call:", error);
      return null;
    }
  };

  const handlePayment = async () => {
    try {
      if (!cashfree) {
        console.error("Cashfree SDK not initialized.");
        return;
      }

      if (!sessionId) {
        console.error("Session Id not found.");
        return;
      }

      let checkoutOptions = {
        paymentSessionId: sessionId,
        returnUrl: `${window.location.origin}/payment-confirmation`,
        notifyUrl: `${process.env.REACT_APP_API_URL}/cashfreeWebhook`,
      };

      await cashfree
        .checkout(checkoutOptions)
        .then(function (data) {
          console.log(data, "Payment Initiate");
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex items-center justify-center my-4 h-[5vh] px-2 sm:px-4"> {/* Added horizontal padding for smaller screens */}
        {/* Step 1: Address */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${ // Added flex-shrink-0 to prevent circle from shrinking
              step >= 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <span
            className={`ml-1 sm:ml-2 text-xs sm:text-sm whitespace-nowrap ${ // Adjusted margin and text size for responsiveness, added whitespace-nowrap
              step >= 0 ? "font-medium text-blue-600" : "text-gray-400"
            }`}
          >
            Address
          </span>
        </div>

        {/* Separator 1-2 */}
        <div
          className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 flex-shrink ${ // Adjusted width and margin for responsiveness, added flex-shrink
            step >= 1 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Step 2: Order Summary */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${ // Added flex-shrink-0
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span
            className={`ml-1 sm:ml-2 text-xs sm:text-sm whitespace-nowrap ${ // Adjusted margin and text size for responsiveness, added whitespace-nowrap
              step >= 1 ? "font-medium text-blue-600" : "text-gray-400"
            }`}
          >
            Order Summary
          </span>
        </div>

        {/* Separator 2-3 */}
        <div
          className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 flex-shrink ${ // Adjusted width and margin for responsiveness, added flex-shrink
            step >= 2 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>

        {/* Step 3: Payment */}
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 ${ // Added flex-shrink-0
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <span
            className={`ml-1 sm:ml-2 text-xs sm:text-sm whitespace-nowrap ${ // Adjusted margin and text size for responsiveness, added whitespace-nowrap
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
            getSessionId={getSessionId}
          />
        )}
        {step === 2 && (
          <PaymentPage
            formData={formData}
            setStep={setStep}
            product={product}
            handlePayment={handlePayment}
            orderDetails={orderDetails}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionLayout;
