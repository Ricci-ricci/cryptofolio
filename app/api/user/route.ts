import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST() {
  const { } = NextRequest.json()
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
