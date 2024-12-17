"use client";

import type Stripe from "stripe";

import React, { useState } from "react";

// import CustomDonationInput from "@/components/CustomDonationInput";

// import { formatAmountForDisplay } from "../../../utils/get-stripejs";
import * as config from "../../../config";
import { createCheckoutSession } from "../../../actions/stripe";
import getStripe from "../../../utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
// import StripeTestCards from "./StripeTestCards";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const t = useTranslations("Pricing");

  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode"
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data);

    if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        {/* <CustomDonationInput
          className="checkout-style"
          name="customDonation"
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
          value={input.customDonation}
        /> */}
        {/* <StripeTestCards /> */}
        <button
          type="submit"
          className="mt-8 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
        >
          {t("subscribe")} {t("basic")}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
