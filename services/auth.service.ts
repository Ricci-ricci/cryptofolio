import { authClient } from "@/lib/auth-client"
import type { LoginInput, SignupInput } from "@/validators/auth.validator"

const SignUp = async ({ name, email, password }: SignupInput) => {
  const { data, error } = await authClient.signUp.email({
    name , email , password
  })
  return { data, error }
}
const Login = async ({ email, password }: LoginInput) => {
  const { data, error } = await authClient.signIn.email({
    email , password
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}
const LogOut = async() => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
export { Login , LogOut , SignUp}
