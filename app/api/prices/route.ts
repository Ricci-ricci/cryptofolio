import { NextRequest , NextResponse } from "next/server";
export async function GET() {
  try {
    const prices = await fetch("/link");
    if (!prices) return NextResponse.json({ message: "failed to fetch Prices" });
    return NextResponse.json(prices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, {status:500})
  }
}
