import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateUserDTO, UserResponse } from "@/types/user_type";
interface PageProps {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const wallet = await prisma.wallet.findUnique({ where: { id } })
    if (wallet) return NextResponse.json(wallet);
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
export async function DELETE(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const wallet = await prisma.wallet.delete({ where: { id } })
    if (wallet) return NextResponse.json({ message: "wallet deleted" });
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
export async function PATCH(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const wallet = await prisma.wallet.update({
      where: { id: id }, data: {

      }
    })
    if (wallet) return NextResponse.json({ message: "wallet update" });
  }
  catch (error) {
    return NextResponse.json(error , {status: 501})
  }

}
