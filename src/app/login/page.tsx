"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const justRegistered = searchParams.get("registered") === "true"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    try {
      const result = await signIn("credentials", {
        email: form.email.value,
        password: form.password.value,
        redirect: false,
      })
      if (result?.error) throw new Error("Invalid email or password")
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080c", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "20px", padding: "40px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "8px", textAlign: "center" }}>Welcome back</h1>
        <p style={{ color: "#5e5e78", textAlign: "center", marginBottom: "32px", fontSize: "14px" }}>Sign in to your AutoFlow dashboard</p>
        {justRegistered && <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "10px", padding: "12px", marginBottom: "20px", color: "#10b981", fontSize: "14px" }}>✅ Account created! Please sign in.</div>}
        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "12px", marginBottom: "20px", color: "#ef4444", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Email</label>
            <input name="email" type="email" required placeholder="you@company.com" style={{ width: "100%", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Password</label>
            <input name="password" type="password" required placeholder="Your password" style={{ width: "100%", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#5e5e78" }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: "#6366f1" }}>Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080c", color: "#5e5e78" }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
