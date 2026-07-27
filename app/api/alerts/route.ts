import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateAlertDTO } from "@/types/alert";
export async function GET() {
  try {
    const userId = "687f4c6d8e2b9d1234567890"
    const Alerts = await prisma.alert.findMany({
      where:
      {
        userId:userId
      }
    })
    if (!Alerts) return NextResponse.json({ message: "Alerts Not found" }, { status: 401 })
    return NextResponse.json(Alerts , {status:200})
  } catch (error) {
    return NextResponse.json({message:"Internal server Error"} , {status:500})
  }
}
export async function POST(request: NextRequest) {
  try {
    const userId = ""
    const {symbol , targetPrice , condition }:CreateAlertDTO = await request.json()
    const Alerts = await prisma.alert.create({
      data: {
        symbol: symbol,
        targetPrice: targetPrice,
        condition: condition,
        user: {
          connect: {
            id: userId
          }
        }

      }
    })
    if (!Alerts) return NextResponse.json({ message: "Error creating Alerts" }, { status: 401 })
    return NextResponse.json({message:"Alerts created"} , {status:200})
  } catch (error) {
    return NextResponse.json({message:"Internal server Error"} , {status:500})
  }
}
