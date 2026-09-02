import { authClient } from "@/lib/auth-client"
import type { LoginInput, SignupInput } from "@/validators/auth.validator"

const SignUpServices = async ({ name, email, password }: SignupInput) => {
  const { data, error } = await authClient.signUp.email({
    name , email , password
  })
  return { data, error }
}
const LoginServices = async ({ email, password }: LoginInput) => {
  const { data, error } = await authClient.signIn.email({
    email , password
  })
  return {data , error}
}
const LogOutServices = async() => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
export { LoginServices , LogOutServices , SignUpServices}
