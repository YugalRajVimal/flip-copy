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
  // const products = [
  //   {
  //     id: 1,
  //     name: "atomberg Renesa Enzel 1200mm BLDC Ceiling Fan with Remote Control",
  //     img: "/TopBar/0.webp",
  //     gallery: ["", "", "", ""],
  //     discount: "84% Off",
  //     originalPrice: "₹2,699.00",
  //     price: 419.00,
  //     rating: 4.2,
  //     reviews: 4143,
  //     assured: true,
  //     timer: "5min 5sec",
  //     delivery: "Free Delivery in Two Days",

  //     brand: "BAYBEE",
  //     colour: "Blue",
  //     material: "Breathable Fabric",
  //     dimensions: "60D x 68W x 129H Centimeters",
  //     size: "Single Seat",
  //     backStyle: "Wing Back",
  //     specialFeature:
  //       "Adjustable Lumbar, Adjustable Height, Ergonomic, Breathable",

  //     itemWeight: "15 Kilograms",
  //     frameMaterial: "Alloy Steel",
  //     maxWeight: "158 Kilograms",
  //     style: "Ergo Plus",

  //     about: [
  //       "Ergonomic Design for Ultimate Comfort: Our Drogo Gaming Chair features a highly cushioned seat and breathable fabric material, making it the perfect computer chair for long gaming sessions or office work.",
  //       "Versatile Adjustment Options: Equipped with a height-adjustable SGS Gas Lift Mechanism and a back recline capability of up to 155°, this office chair adapts to your preferred sitting position effortlessly.",
  //       "Built for Endurance and Mobility: The high-quality sturdy base is designed to withstand weights of up to 110kg, ensuring long-lasting durability.",
  //       "Retractable Footrest for Relaxation: Featuring a retractable footrest, the chair allows you to kick back and relax, making it an ideal choice for both gaming and work.",
  //       "Sleek, Professional Design with Comprehensive Support: With its breathable fabric, adjustable features, and sturdy construction, it’s perfect for gamers and professionals alike.",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Green Soul Kiev Orthopedic Boss Chair | Breathable Leatherette",
  //     img: "/TopBar/1.webp",
  //     gallery: ["", "", "", ""],
  //     discount: "96% Off",
  //     originalPrice: "₹14,999.00",
  //     price: 467.00,
  //     rating: 4.3,
  //     reviews: 3999,
  //     assured: true,
  //     timer: "10min 5sec",
  //     delivery: "Free Delivery in Two Days",

  //     brand: "BAYBEE",
  //     colour: "Blue",
  //     material: "Breathable Fabric",
  //     dimensions: "60D x 68W x 129H Centimeters",
  //     size: "Single Seat",
  //     backStyle: "Wing Back",
  //     specialFeature:
  //       "Adjustable Lumbar, Adjustable Height, Ergonomic, Breathable",

  //     itemWeight: "15 Kilograms",
  //     frameMaterial: "Alloy Steel",
  //     maxWeight: "158 Kilograms",
  //     style: "Ergo Plus",

  //     about: [
  //       "Ergonomic Design for Ultimate Comfort: Our Drogo Gaming Chair features a highly cushioned seat and breathable fabric material, making it the perfect computer chair for long gaming sessions or office work.",
  //       "Versatile Adjustment Options: Equipped with a height-adjustable SGS Gas Lift Mechanism and a back recline capability of up to 155°, this office chair adapts to your preferred sitting position effortlessly.",
  //       "Built for Endurance and Mobility: The high-quality sturdy base is designed to withstand weights of up to 110kg, ensuring long-lasting durability.",
  //       "Retractable Footrest for Relaxation: Featuring a retractable footrest, the chair allows you to kick back and relax, making it an ideal choice for both gaming and work.",
  //       "Sleek, Professional Design with Comprehensive Support: With its breathable fabric, adjustable features, and sturdy construction, it’s perfect for gamers and professionals alike.",
  //     ],
  //   },

  // ];

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
      </BrowserRouter>
    </div>
  );
}

export default App;
