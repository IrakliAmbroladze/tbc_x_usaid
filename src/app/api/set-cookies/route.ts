import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { name, value, options } = await req.json();

  cookies().set(name, value, options);

  return NextResponse.json({ success: true });
}

/*
for setting cookies from server action, we need to use the following:

await fetch("/api/set-cookies", {
  method: "POST",
  body: JSON.stringify({
    name: "authToken",
    value: "your-token",
    options: { httpOnly: true, secure: true },
  }),
  headers: { "Content-Type": "application/json" },
});

*/
