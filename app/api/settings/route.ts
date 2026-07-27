import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { SettingsResponse , UpdateSettingsDTO } from "@/types/settings";


export async function GET() {
  try {
    const userID = ""
    const settings = await prisma.settings.findUnique({
      where: {
        userId:userID
      }
    })
    if (!settings) return NextResponse.json({ message: "Setting not found" }, { status: 401 })
    return NextResponse.json(settings)

  } catch (error) {
    return NextResponse.json({message:"Internal Server error"} , {status:500})
  }
}
export async function PATCH(
  request:NextRequest
){
  try{
    const userID = "USER_ID";
    const {
      theme,
      currency
    }:UpdateSettingsDTO = await request.json();
    const settings = await prisma.settings.update({
      where:{
        userId:userID
      },
      data:{
        theme,
        currency
      }
    });
    return NextResponse.json(settings);
  }catch(error){
    return NextResponse.json(
      {
        message:"Internal Server error"
      },
      {
        status:500
      }
    );
  }
}
