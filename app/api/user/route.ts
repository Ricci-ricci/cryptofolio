import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateUserDTO , UserResponse } from "@/types/user_type";
export async function POST(request: NextRequest) {
  try {
    const { email , password }:CreateUserDTO = await request.json()
    const users = await prisma.user.create({
      data:
      {
        email: email,
        password : password
      }
    });
    return NextResponse.json(users, { status:200})

  } catch (error) {
    return NextResponse.json(error, {status : 501})
  }
}
export async function GET(request:NextRequest) {
  try {
    const { id, email }: UserResponse = await request.json()
    const users = await prisma.user.findUnique({
      where:{id : id}
    })
    if(users) return NextResponse.json(users , {status:201})
  } catch(error) {
    return NextResponse.json(error , {status:501})
  }
}
