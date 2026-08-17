import { prisma } from "@/lib/prisma";
import { UpdateSettingsDTO } from "@/types/settings";

const createSettings = async (userId: string, { currency ,  theme}:UpdateSettingsDTO) => {
  const settings = await prisma.settings.create({
    data: {
      currency: currency,
      theme: theme,
      user: {
            connect: {
              id: userId ,
            }
          }
    }
  })
  if (!settings) {
    throw new Error("failed to create settings")
  }
  return settings
}
const updateSettings = async (userId: string, { currency, theme }: UpdateSettingsDTO) => {

  const settings = await prisma.settings.update({
    where: {
      userId:userId
    } ,
    data: {
      currency: currency,
      theme : theme
    }
  })
  if (!settings) {
    throw new Error ("failed to update the settings")
  }
  return settings
}
export default { updateSettings , createSettings}
