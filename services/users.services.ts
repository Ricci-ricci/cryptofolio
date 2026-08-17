import { prisma } from "@/lib/prisma";

// Sign-up / sign-in are handled by better-auth
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
}
export { deleteUser }
