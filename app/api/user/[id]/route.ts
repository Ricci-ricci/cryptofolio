import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateUserDTO, UserResponse } from "@/types/user_type";
interface PageProps {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const users = await prisma.user.findUnique({ where: { id } })
    if (users) return NextResponse.json(users);
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
export async function DELETE(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const users = await prisma.user.delete({ where: { id } })
    if (users) return NextResponse.json({ message: "users deleted" });
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
export async function UPDATE(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const users = await prisma.user.update({
      where: { id }, data: {

      }
    })
    if (users) return NextResponse.json({ message: "users update" });
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
