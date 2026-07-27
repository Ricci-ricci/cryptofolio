import { NextResponse, NextRequest } from "next/server";
interface PageProps {
  params: Promise<{walletAddress : string}>
}

export async function GET(request: NextRequest, { params } : PageProps) {
  try {
    const { walletAddress } = await params
    const balances = await fetch("https://eth-mainnet.g.alchemy.com/v2/")
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
