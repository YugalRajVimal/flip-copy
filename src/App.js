import "./App.css";
import NavBar from "./Components/NavBar";
import FlipkHeader from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailsPage";
import { useState } from "react";
import AddressForm from "./pages/AddressFormPage";
import TransactionLayout from "./pages/TransactionLayout";

import productsList from "./products.json";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import Footer from "./Components/Footer";


function App() {
  const products = productsList;

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<FlipkHeader products={products} />} />

          <Route
            path="/product/:id"
            element={<ProductDetailPage products={products} />}
          />
          <Route
            path="/order/:id"
            element={<TransactionLayout products={products} />}
          />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmation />}
          />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer />
        {/* <SabPaisa /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
