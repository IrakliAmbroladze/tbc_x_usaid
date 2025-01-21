import { NextRequest } from "next/server";

export const getBaseUrl = (req?: NextRequest): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (req) {
    const host = req.headers.get("host");
    if (
      process.env.NEXT_PUBLIC_URL &&
      `https://${host}` === process.env.NEXT_PUBLIC_URL
    ) {
      return process.env.NEXT_PUBLIC_URL;
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "http://localhost:3000";
  }

  throw new Error("getBaseUrl: req object is required on the server-side.");
};
