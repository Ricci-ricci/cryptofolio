import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { AlertResponse, UpdateAlertDTO } from "@/types/alert";
interface PageProps{
  params: Promise<{id:string}>
}
export async function DELETE(request: NextRequest, { params }: PageProps) {

  try {
    const { id } = await params;
    const response = await prisma.alert.delete({
      where:
        { id }
    });
    if (!response) return NextResponse.json({ message: "error deleting Alert" }, { status: 401 });
    return NextResponse.json({ message: "Alert deleted Succesfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
export async function PATCH(request: NextRequest, { params }: PageProps) {

  try {
    const { id } = await params;
    const {  condition , targetPrice}: UpdateAlertDTO = await request.json()
    const response = await prisma.alert.update({
      where: {id},
      data: {
        condition: condition,
        targetPrice : targetPrice,
      }
    });
    if (!response) return NextResponse.json({ message: "error updating Alert" }, { status: 401 });
    return NextResponse.json({ message: "Alert updated Succesfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server Error" }, {status:500})
  }
}
