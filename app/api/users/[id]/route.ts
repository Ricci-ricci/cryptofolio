import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import type { UserResponse } from "@/types/user_type";
import { deleteUser } from "@/services/users.services";

// Mongo ids are 24 hex chars. Checking here turns a Prisma P2023 crash (500)
// into a plain 400 for a malformed id in the URL.
const OBJECT_ID = /^[0-9a-f]{24}$/i;

// Mirrors UpdateUserDTO — name and image are the only user-editable columns.
// Email goes through better-auth's /change-email, password through
// /change-password, and emailVerified is written by better-auth itself.
const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    image: z.url().nullable(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "provide at least one of: name, image",
  });

// `satisfies` ties the select to UserResponse: adding a field to the type
// without selecting it here becomes a compile error.
const userSelect = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  createdAt: true,
  updatedAt: true,
} satisfies Record<keyof UserResponse, true>;

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext<"/api/users/[id]">
) {
  // TODO(auth): once the better-auth handler is mounted, load the session and
  // reject unless it belongs to `id`. Right now anyone can edit any user.
  const { id } = await params;
  if (!OBJECT_ID.test(id)) {
    return NextResponse.json({ message: "invalid user id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "invalid JSON body" }, { status: 400 });
  }

  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "invalid body", issues: z.treeifyError(parsed.error) },
      { status: 400 }
    );
  }

  try {
    const user: UserResponse = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: userSelect,
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // Log the real cause, return a generic message — the raw error can carry
    // query internals.
    console.error("[users:PATCH]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext<"/api/users/[id]">
) {
  // TODO(auth): same ownership check as PATCH.
  const { id } = await params;
  if (!OBJECT_ID.test(id)) {
    return NextResponse.json({ message: "invalid user id" }, { status: 400 });
  }

  try {
    await deleteUser(id);
    return NextResponse.json(
      { message: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    console.error("[users:DELETE]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
