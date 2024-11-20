import React from "react";
import Image from "next/image";

export default function WelcomeImage(): JSX.Element {
  return (
    <div className="welcomeImage">
      <Image
        className="pestMan"
        src={"/assets/images/welcome-image.jpg"}
        alt="Welcome_Image"
        fill
      />
    </div>
  );
}
