import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateWatchlistDTO } from "@/types/watchlist";
export async function GET() {
  try {
    const userId = ""
    const watchlist = await prisma.watchlist.findMany({ where: { userId } })
    if(watchlist) return NextResponse.json(watchlist)
  } catch (error) {
    return NextResponse.json(error , {status:501})
  }
}
export async function POST( request : NextRequest) {
  try {
    const userId = "";
    const { symbol }: CreateWatchlistDTO = await request.json();
    const watchlist = await prisma.watchlist.create({
      data: {
        symbol: symbol,
        user:{
             connect:{
               id:userId
             }
        }
    } })
    if(watchlist) return NextResponse.json(watchlist)
  } catch (error) {
    return NextResponse.json(error , {status:501})
  }
}
