"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { AuthCard, AuthField, AuthLink } from "@/components/auth/auth-card"
import { Button } from "@/components/ui/button"
import { signupSchema } from "@/validators/auth.validator"
import { SignUpServices } from "@/services/auth.service"
type FieldErrors = Partial<Record<"name" | "email" | "password", string>>

const Signup = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const parsed = signupSchema.safeParse({ name, email, password })
    if (!parsed.success) {
      const { fieldErrors } = parsed.error.flatten()
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })
      return
    }
    setErrors({})

    setLoading(true)
    const { data , error } = await SignUpServices(parsed.data)
    setLoading(false)
    if (error) {
        setError(error.message ?? "Unable to sign in.")
        return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthCard
      title="Create your account"
      description="Track your wallets and tokens in one place."
      footer={
        <>
          Already registered? <AuthLink href="/login">Sign in</AuthLink>
        </>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <AuthField
          id="name"
          label="Name"
          autoComplete="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
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
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  )
}
export default Signup
