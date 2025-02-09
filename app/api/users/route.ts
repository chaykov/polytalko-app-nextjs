import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Zapis usera:", body);

  return NextResponse.json({ success: true });
}
