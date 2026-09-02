import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse , NextRequest } from "next/server"
const proxy = async(req:NextRequest) => {
  const session = await auth.api.getSession(
    {
      headers: await headers()
    }
  )
  if (!session) {
    console.log("session not matched")
    return
  }
  console.log("session matched by the proxy")
  return NextResponse.next()
}
export default proxy
