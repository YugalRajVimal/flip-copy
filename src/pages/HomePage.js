import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductGrid from "../Components/Products";

const categories = [
  { name: "Minutes", img: "/TopBar/0.webp" },
  { name: "Mobiles & Tablets", img: "/TopBar/1.webp" },
  { name: "Fashion", img: "/TopBar/2.webp", hasDropdown: true },
  { name: "Electronics", img: "/TopBar/3.webp", hasDropdown: true },
  { name: "Home & Furniture", img: "/TopBar/4.webp", hasDropdown: true },
  { name: "TVs & Appliances", img: "/TopBar/5.webp" },
  { name: "Flight Bookings", img: "/TopBar/6.webp" },
  { name: "Beauty, Food..", img: "/TopBar/7.webp", hasDropdown: true },
  { name: "Grocery", img: "/TopBar/8.webp" },
];

const banners = [
  { img: "/Banner/0.webp", alt: "Save on international flights" },
  { img: "/Banner/1.webp", alt: "Electronics Fest" },
  { img: "/Banner/2.webp", alt: "Save on international flights" },
  { img: "/Banner/3.webp", alt: "Electronics Fest" },
];

export default function FlipkHeader({ products }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Parse "6min 20sec" → total seconds
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
    parseTimeStringToSeconds("3min 00sec")
  );

  // Format time
  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return "0min 00sec";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds < 10 ? "0" : ""}${seconds}sec`;
  };

  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const timerId = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [remainingSeconds]);

  return (
    <div className="w-full">
      {/* 🔹 Categories */}
      <div className="w-full bg-white shadow px-4 sm:px-6 py-3 overflow-x-auto">
        <div className="flex items-center justify-between sm:justify-around gap-6 sm:gap-8 min-w-max sm:min-w-0">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center cursor-pointer flex-shrink-0"
            >
              <div className="relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-12 sm:h-14 object-contain"
                />
              </div>
              <div className="flex items-center text-xs sm:text-sm font-medium mt-1 whitespace-nowrap">
                {cat.name}
                {cat.hasDropdown && <ChevronDown className="w-3 h-3 ml-1" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Carousel Banner */}
      <div className="relative mt-2">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation, Autoplay]}
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <img
                src={banner.img}
                alt={banner.alt}
                className="w-full h-[180px] md:h-[280px] object-cover rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* 🔹 Offer Timer */}
      <div className="text-black font-semibold text-base sm:text-lg my-4 text-center">
        Live Sale :{" "}
        <span className="text-orange-500">
          {" "}
          {formatTime(remainingSeconds)}{" "}
        </span>
      </div>

      {/* 🔹 Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
