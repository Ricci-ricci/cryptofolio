import { NextResponse, NextRequest } from "next/server";
import Solde from "@/services/portfolio.service";
interface PageProps {
  params: Promise<{walletAddress : `0x${string}`}>
}
export async function GET(request: NextRequest, { params } : PageProps){
  try {
    const { walletAddress } = await params;
    const solde = await Solde(walletAddress);
    return NextResponse.json(solde, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
