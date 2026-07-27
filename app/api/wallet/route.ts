import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateWalletDTO } from "@/types/wallet";

export async function POST(request: NextRequest) {

  try {
    const { address, network, name  , userid}: CreateWalletDTO = await request.json()
    const wallet = await prisma.wallet.create({
      data: {
        address: address,
        network: network,
        name: name,
        userId:userid
      }
    })
    if (wallet) return NextResponse.json({ message: "wallet created" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({message:"error creating the wallet"} , {status:501})
  }

}
export async function GET(request:NextRequest) {
  try {
    const { userid }:CreateWalletDTO = await request.json()
    const wallet = await prisma.wallet.findMany({
      where: {
        userId:userid
    }})
    if (wallet) return NextResponse.json(wallet , { status: 200 })
  } catch (error) {
    return NextResponse.json({message:"error creating the wallet"} , {status:501})
  }
}
