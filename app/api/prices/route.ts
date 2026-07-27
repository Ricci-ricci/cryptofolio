import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const api_key = process.env.COIN_GECKO_API_KEY || ""
    //curl --request GET \
    //--url 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&names=Bitcoin&symbols=btc' \
    //--header 'x-cg-demo-api-key: <api-key>'
    const prices = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", {
      method: "GET",
      headers: {
        'x-cg-demo-api-key':api_key
      }
    });
    const data = await prices.json()
    if (!data) return NextResponse.json({ message: "failed to fetch Prices" });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, {status:500})
  }
}
