import { auth } from "@/lib/auth"
import { headers } from "next/headers"
const Middleware = async() => {
  const session = await auth.api.getSession(
    {
      headers: await headers()
    }
  )
  if (!session) {
    return
  }
  return
}
export default Middleware
