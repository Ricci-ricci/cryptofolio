import { NextResponse, NextRequest } from "next/server";
import { fetch_transaction } from "@/services/transactions.services";
interface PageProps {
  params: Promise<{walletAddress : `0x${string}`}>
}

export async function GET(request: NextRequest, { params } : PageProps) {
  try {
    const { walletAddress } = await params
    const balances = await fetch_transaction(walletAddress)
    if (!balances) {
     return NextResponse.json({ message: "error somewhere" }, {status:400})
    }
    return NextResponse.json(balances, {status:200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
