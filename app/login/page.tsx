"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { AuthCard, AuthField, AuthLink } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { loginSchema } from "@/validators/auth.validator"

type FieldErrors = Partial<Record<"email" | "password", string>>

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      // flatten() regroupe les issues par champ, ce qui correspond déjà à la
      // forme attendue par AuthField.
      const { fieldErrors } = parsed.error.flatten()
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }
    setErrors({})

    setLoading(true)
    const { error } = await authClient.signIn.email(parsed.data)
    setLoading(false)

    if (error) {
      setError(error.message ?? "Unable to sign in.")
      return
    }
    router.push("/dashboard")
    // Le layout serveur a été rendu sans session : sans refresh il resterait
    // en cache et afficherait l'utilisateur déconnecté.
    router.refresh()
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your Cryptofolio account."
      footer={
        <>
          No account yet? <AuthLink href="/signup">Create one</AuthLink>
        </>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <AuthField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {error ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthCard>
  )
}
export default Login
