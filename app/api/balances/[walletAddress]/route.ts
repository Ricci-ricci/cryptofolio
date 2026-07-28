import { NextResponse, NextRequest } from "next/server";
import Ethereum_balance from "@/services/wallets.services";
interface PageProps {
  params: Promise<{walletAddress : `0x${string}`}>
}

export async function GET(request: NextRequest, { params } : PageProps) {
  try {
    const { walletAddress } = await params
    const balances = await Ethereum_balance(walletAddress)
    if (!balances) return NextResponse.json({ message: "Failed to fetch the wallet address" }, {status:401})
    return NextResponse.json(balances, {status:200})
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
