"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ForgotPasswordPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset link sent. Check your email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
