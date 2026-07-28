import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Fetch_CoinGecko from "@/services/prices.service";
export async function GET() {
  try {
    const data = await Fetch_CoinGecko([
     "ethereum",
     "bitcoin",
     "chainlink"
    ])
    if (!data) return NextResponse.json({ message: "failed to fetch Prices" });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, {status:500})
  }
}
