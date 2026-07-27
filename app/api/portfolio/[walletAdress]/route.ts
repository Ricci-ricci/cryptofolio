import { NextResponse, NextRequest } from "next/server";
interface PageProps {
  params: Promise<{walletAddress : string}>
}

export async function GET(request: NextRequest, { params } : PageProps) {
  try {
    const { walletAddress } = await params
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
