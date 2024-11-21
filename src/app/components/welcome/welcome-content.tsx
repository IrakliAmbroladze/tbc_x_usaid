import React from "react";
import WelcomeMessage from "./welcome-message";
import WelcomeImage from "./welcome-image";

export default function WelcomeContent(): JSX.Element {
  return (
    <div className="welcomeContent">
      <WelcomeMessage />
      <WelcomeImage />
    </div>
  );
}
