import { CreateUserDTO } from "@/types/user_type"
import { authClient } from "@/lib/auth-client"

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
  const { data:session , isPending} =  authClient.useSession()
  if (isPending) {
    return
  }
  if (!session) {
    throw new Error("not authenticated")
  }
  if (session) {
    console.log(session.user.id);
    console.log(session.user.email);
  }
}
const logOut = async() => {
  const { error } = await authClient.signOut()
  if (error) {
    throw new Error(error.message)
  }
}
