"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      password: (form.elements.namedItem("password") as HTMLInputElement)?.value || "",
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Registration failed")
      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080c", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "20px", padding: "40px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "8px", textAlign: "center" }}>Create your account</h1>
        <p style={{ color: "#5e5e78", textAlign: "center", marginBottom: "32px", fontSize: "14px" }}>Start automating your business today</p>
        {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "12px", marginBottom: "20px", color: "#ef4444", fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Full Name</label>
            <input name="name" type="text" required placeholder="John Smith" style={{ width: "100%", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Email</label>
            <input name="email" type="email" required placeholder="you@company.com" style={{ width: "100%", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#888", marginBottom: "6px" }}>Password</label>
            <input name="password" type="password" required minLength={8} placeholder="Min 8 characters" style={{ width: "100%", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "#5e5e78" }}>
          Already have an account? <Link href="/login" style={{ color: "#6366f1" }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
