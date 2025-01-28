"use client";

import { useTranslations } from "next-intl";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing.");
}

interface Subscription {
  name: string;
  priceId: string;
  quantity: number;
}

interface PlanCardProps {
  title: string;
  body: string;
  options: string[];
  buttonText: string;
  onClick?: () => void;
  isButtonDisabled?: boolean;
}

const Pricing: React.FC = () => {
  const t = useTranslations("Pricing");
  const [freePlanLoading, setFreePlanLoading] = useState(false);
  const [basicPlanLoading, setBasicPlanLoading] = useState(false);

  const subscription: Subscription = {
    name: "Product 1",
    priceId: "price_1Qh48zLiYgWQWDVcEOexsUMj",
    quantity: 1,
  };

  const basicPlanFormAction = async () => {
    setBasicPlanLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const fetchUrl = "/api/create-checkout-session";

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [subscription] }),
      });

      const session = await response.json();

      if (session.error) {
        console.error(session.error);
        throw new Error(session.error);
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setBasicPlanLoading(false);
    }
  };

  const freePlanFormAction = async () => {
    setFreePlanLoading(true);
    alert(`${t("alert")}`);
    setFreePlanLoading(false);
  };

  const PlanCard: React.FC<PlanCardProps> = ({
    title,
    body,
    options,
    buttonText,
    onClick,
    isButtonDisabled,
  }) => (
    <div className="bg-white dark:bg-gray-500 border dark:border-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-gray-600 dark:text-white">{body}</p>

      <ul className="mt-6 space-y-4 text-gray-600 dark:text-white mb-6">
        {options.map((option, index) => (
          <li key={index}>✔ {option}</li>
        ))}
      </ul>

      <button
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`mt-8 w-full bg-gray-800 text-white py-2 px-4 rounded-lg ${
          isButtonDisabled
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-700"
        } focus:outline-none`}
      >
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="flex items-center flex-col justify-center max-w-[1110px] mx-auto p-6">
      <h1 className="text-4xl font-bold text-center dark:text-white mb-6">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PlanCard
          title={t("free")}
          body={t("freeBody")}
          options={[t("freeOption1"), t("freeOption2")]}
          buttonText={`${t("select")} ${t("free")}`}
          onClick={freePlanFormAction}
          isButtonDisabled={freePlanLoading}
        />
        <PlanCard
          title={t("basic")}
          body={t("basicBody")}
          options={[t("basicOption1"), t("basicOption2")]}
          buttonText={
            basicPlanLoading ? t("processing") : `${t("select")} ${t("basic")}`
          }
          onClick={basicPlanFormAction}
          isButtonDisabled={basicPlanLoading}
        />
      </div>
    </div>
  );
};

export default Pricing;
