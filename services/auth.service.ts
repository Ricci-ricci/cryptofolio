import { CreateUserDTO } from "@/types/user_type"
import { authClient } from "@/lib/auth-client"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
const singUp = async ({ name, email, password }: CreateUserDTO) => {
  const { data, error } = await authClient.signUp.email({
    name , email , password
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}
const login = async ({ email, password }: CreateUserDTO) => {
  const { data, error } = await authClient.signIn.email({
    email , password
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}
const get_logged_user = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("not authenticated")
  }
}
const logOut = async() => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
