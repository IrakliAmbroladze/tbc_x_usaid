"use client";
import { useState } from "react";
import Image from "next/image";

export default function ReportsPage(): JSX.Element {
  const images = ["/assets/images/tbc.png", "/assets/images/guga.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  const toggleImage = () => {
    setCurrentImage((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="flex flex-col items-center transition-transform duration-500 ease-in-out">
      <button
        onClick={toggleImage}
        className="px-10 py-5 bg-blue-500 text-white rounded-lg text-3xl hover:scale-105 transition-transform duration-150 active:scale-95 ease-in-out"
      >
        მადლობა
      </button>
      <Image
        src={images[currentImage]}
        height={450}
        width={450}
        alt="logo"
        priority
        className="my-5 md:my-10 rounded-lg"
      />
    </div>
  );
}
