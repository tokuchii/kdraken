import { NextResponse } from "next/server";
import { fetchRepos } from "@/lib/github";

export async function GET() {
  const repos = await fetchRepos();
  return NextResponse.json(repos);
}
