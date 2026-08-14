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
      }
    })
    if (!user) {
      throw new Error("Password or Email incorrect")
    }
    if (password !== user?.password) {
      throw new Error("Password or Email incorrect")
    }
    return user
  } catch (error) {
    console.error(error)
    throw Error
  }
}

const deleteUser = async(id: string) => {
  try {
    const user = await prisma.user.delete({
      where :{
        id:id
    }
    })
    if (!user) {
      throw new Error("Failed to delete user")
    }
    return {
      success: true,
      message:"user deleted succesfully"
    }
  }catch (error) {
    console.error(error)
    throw error
  }
  return
}
export { createUser , getUser , deleteUser}
