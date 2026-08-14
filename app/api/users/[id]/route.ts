import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateUserDTO, UserResponse } from "@/types/user_type";
import { deleteUser } from "@/services/users.services";
interface PageProps {
  params: Promise<{ id: string }>;
}
export async function DELETE(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const user = await deleteUser(id)
    if (!user) {
      throw new Error("error deleting the user")
    }
    return NextResponse.json({ message: "user deleted successfully" }, {status:200})
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
