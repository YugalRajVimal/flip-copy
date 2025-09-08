import React from "react";
import PaymentForm from "sabpaisa-pg-dev";

const SabPaisaPaymentForm = ({ formData, onResponse }) => {
  return (
    <PaymentForm
      {...formData}
      callbackFunction={onResponse}
      env="stag" // Set to 'prod' for production
    />
  );
};
export default SabPaisaPaymentForm;
