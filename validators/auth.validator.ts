import { z } from "zod"

// Les règles côté client ne remplacent pas celles de better-auth : elles
// évitent juste un aller-retour réseau pour une saisie manifestement invalide.
export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim(),
  password: z.string().min(1, { error: "Enter your password." }),
})

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." }),
  email: z.email({ error: "Enter a valid email address." }).trim(),
  // better-auth refuse les mots de passe de moins de 8 caractères par défaut,
  // on aligne la contrainte pour que l'erreur s'affiche sous le champ.
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
