import { NextResponse , NextRequest } from "next/server";
import { CreateUserDTO} from "@/types/user_type";
import { createUser , getUser } from "@/services/users.services";
export async function POST(request: NextRequest) {
  try {
    const { email , password }:CreateUserDTO = await request.json()
    const users = await createUser({email , password})
    return NextResponse.json(users, { status:200})
  } catch (error) {
    return NextResponse.json(error, {status : 501})
  }
}
export async function GET(request:NextRequest) {
  try {
    const { email, password }: CreateUserDTO = await request.json()
    const users = await getUser({email, password})
    if (!users) {
      throw new Error ("Email or Password incorrect")
    }
    return NextResponse.json(users, { status: 201 })
  } catch(error) {
    return NextResponse.json(error , {status:501})
  }
}
