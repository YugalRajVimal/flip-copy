import React, { useState } from "react";
import SabPaisaPaymentForm from "./SabPaisaPaymentForm";
const SabPaisa = () => {
  const [paymentData, setPaymentData] = useState({
    clientCode: "TM001",
    transUserName: "spuser_2013",
    transUserPassword: "RIADA_SP336",
    authKey: "kaY9AIhuJZNvKGp2",
    authIV: "YN2v8qQcU3rGfA1y",
    callbackUrl: "http://localhost:3000/payment-confirmation", // Your callback URL
    clientTxnId: "123345555557",
    payerName: "John Doe",
    payerEmail: "john@example.com",
    payerMobile: "9876543210",
    amount: "100.00", // Payment amount
    channelId: "npm",
    url: "https://secure.sabpaisa.in/SabPaisa/sabPaisaInit?v=1", // SabPaisa Init URL
  });
  const handlePaymentResponse = (response) => {
    console.log("Payment Gateway Response:", response);
    // Handle the response (e.g., confirm payment status, update UI)
  };
 return (
    <div>
      <h1>React SabPaisa Payment Integration</h1>
      <SabPaisaPaymentForm formData={paymentData} onResponse={handlePaymentResponse} />
    </div>
  );
};
export default SabPaisa;