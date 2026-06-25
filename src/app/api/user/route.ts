import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.github.com/users/tokuchii", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const user = await res.json();
  return NextResponse.json(user);
}
