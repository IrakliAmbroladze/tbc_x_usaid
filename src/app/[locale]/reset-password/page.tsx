"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!accessToken) {
      setError("Invalid or missing reset token.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => router.push(`/${locale}/sign-in`), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
