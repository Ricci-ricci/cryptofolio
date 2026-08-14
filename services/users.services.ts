import { prisma } from "@/lib/prisma";
import { CreateUserDTO } from "@/types/user_type";
const createUser = async ({ email , password}: CreateUserDTO) => {
  try {
    const user = await prisma.user.create({
      data:
      {
        email: email,
        password:password
      }  })
    if(!user){
    throw new Error("failed to create user")
    }
    return email
  } catch (error) {
    console.error(error)
  }
}
const getUser = async ( { email , password}: CreateUserDTO) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password:password
      }
    })
    if (!user) {
      throw new Error("failed to fetch user")
    }
    
  } catch (error) {
    console.error(error)
  }
  return
}
