"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Workflow {
  id: string
  name: string
  category: string
  status: string
  tasksRun: number
  createdAt: string
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/workflows")
      .then(r => r.json())
      .then(data => {
        setWorkflows(data.workflows || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categories: Record<string, string> = {
    general: "⚙️", bookkeeping: "📊", hr: "👥", inventory: "📦",
    scheduling: "📅", invoicing: "🧾", support: "💬", email: "📧", compliance: "📋",
  }

  return (
    <div style={{ minHeight: "100vh", background: "#08080c", color: "#e0e0ef" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "240px", background: "#0f0f16", borderRight: "1px solid #1a1a28", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 20px", marginBottom: "32px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 900, color: "#fff", textDecoration: "none" }}>
              Auto<span style={{ color: "#6366f1" }}>Flow</span>
            </Link>
          </div>
          <nav>
            <a href="/dashboard" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>📊 Dashboard</a>
            <a href="/dashboard/workflows" style={{ display: "block", padding: "10px 20px", color: "#6366f1", background: "rgba(99,102,241,0.1)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>⚡ Workflows</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>📈 Analytics</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>🔗 Integrations</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>⚙️ Settings</a>
          </nav>
        </div>
        <div style={{ flex: 1, padding: "32px 40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>Workflows</h1>
          <p style={{ color: "#5e5e78", fontSize: "14px", marginBottom: "32px" }}>Manage your automation workflows</p>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#5e5e78" }}>Loading...</div>
          ) : workflows.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#5e5e78", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "16px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚡</div>
              <p style={{ fontSize: "16px", marginBottom: "8px" }}>No workflows yet</p>
              <p style={{ fontSize: "13px" }}>Create your first automation workflow to get started</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {workflows.map(w => (
                <div key={w.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontSize: "24px" }}>{categories[w.category] || "⚙️"}</span>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{w.name}</div>
                      <div style={{ fontSize: "12px", color: "#5e5e78" }}>{w.category} · {w.tasksRun} tasks run · {new Date(w.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <span style={{ padding: "4px 12px", background: w.status === "active" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: w.status === "active" ? "#10b981" : "#f59e0b", borderRadius: "100px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>{w.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
