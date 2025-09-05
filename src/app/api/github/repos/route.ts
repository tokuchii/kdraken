import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Use your GitHub Personal Access Token here
    const token = process.env.GITHUB_TOKEN; // store in .env file

const res = await fetch("https://api.github.com/user/repos?per_page=100", {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

    if (!res.ok) throw new Error("GitHub API error");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch GitHub repos" }, { status: 500 });
  }
}
