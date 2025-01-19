"use client";
import Image from "next/image";
import { createClient } from "../../../../utils/supabase/client";

export default function SignInWithGithub() {
  const signInWithGithub = async () => {
    const appUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${appUrl}/api/auth/callback`,
      },
    });
    if (error) {
      console.error("Error during sign-in:", error.message);
    } else {
      console.log("Sign-in successful:");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signInWithGithub();
      }}
      className="w-full flex justify-center"
    >
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <Image
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          className="w-5 h-5"
          width={20}
          height={20}
        />
        Sign in with GitHub
      </button>
    </form>
  );
}
