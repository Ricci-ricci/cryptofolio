import { NextResponse , NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
interface PageProps {
  params: Promise<{ id: string }>;
}
export async function GET(request: NextRequest, { params }: PageProps) {
  try {
    const { id } = await params;
    const settings = await prisma.settings.findMany({ where: { userId: id } });
    if (settings) return NextResponse.json(settings, { status: 201 });

  } catch (error) {
    return NextResponse.json(error, { status: 501 });
  }
}
