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

export default function Dashboard() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newCategory, setNewCategory] = useState("general")

  useEffect(() => {
    fetch("/api/workflows")
      .then(r => r.json())
      .then(data => {
        setWorkflows(data.workflows || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function createWorkflow(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    try {
      const res = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, category: newCategory }),
      })
      const data = await res.json()
      if (data.workflow) {
        setWorkflows(prev => [data.workflow, ...prev])
        setNewName("")
        setShowCreate(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function upgrade(plan: string) {
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    }
  }

  const categories: Record<string, string> = {
    general: "⚙️",
    bookkeeping: "📊",
    hr: "👥",
    inventory: "📦",
    scheduling: "📅",
    invoicing: "🧾",
    support: "💬",
    email: "📧",
    compliance: "📋",
  }

  return (
    <div style={{ minHeight: "100vh", background: "#08080c", color: "#e0e0ef" }}>
      {/* Sidebar + Main */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: "240px", background: "#0f0f16", borderRight: "1px solid #1a1a28", padding: "24px 0", flexShrink: 0 }}>
          <div style={{ padding: "0 20px", marginBottom: "32px" }}>
            <Link href="/" style={{ fontSize: "20px", fontWeight: 900, color: "#fff", textDecoration: "none" }}>
              Auto<span style={{ color: "#6366f1" }}>Flow</span>
            </Link>
          </div>
          <nav>
            <a href="/dashboard" style={{ display: "block", padding: "10px 20px", color: "#6366f1", background: "rgba(99,102,241,0.1)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>📊 Dashboard</a>
            <a href="/dashboard/workflows" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>⚡ Workflows</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>📈 Analytics</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>🔗 Integrations</a>
            <a href="#" style={{ display: "block", padding: "10px 20px", color: "#5e5e78", fontSize: "14px", textDecoration: "none" }}>⚙️ Settings</a>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "32px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Dashboard</h1>
              <p style={{ color: "#5e5e78", fontSize: "14px" }}>Manage your automation workflows</p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => upgrade("pro")} style={{ padding: "10px 20px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                Upgrade to Pro →
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "#5e5e78", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Plan</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>Free</div>
              <div style={{ fontSize: "12px", color: "#5e5e78", marginTop: "4px" }}>500 tasks/mo</div>
            </div>
            <div style={{ background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "#5e5e78", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Workflows</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>{workflows.length}</div>
              <div style={{ fontSize: "12px", color: "#5e5e78", marginTop: "4px" }}>3 max on free</div>
            </div>
            <div style={{ background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "#5e5e78", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Tasks Run</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>{workflows.reduce((sum, w) => sum + w.tasksRun, 0)}</div>
              <div style={{ fontSize: "12px", color: "#5e5e78", marginTop: "4px" }}>This month</div>
            </div>
          </div>

          {/* Workflows Section */}
          <div style={{ background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "16px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>Workflows</h2>
              <button onClick={() => setShowCreate(!showCreate)} style={{ padding: "8px 16px", background: "rgba(99,102,241,0.15)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                + New Workflow
              </button>
            </div>

            {showCreate && (
              <form onSubmit={createWorkflow} style={{ background: "#08080c", border: "1px solid #1a1a28", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Workflow name" style={{ flex: 1, padding: "10px 14px", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }} />
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ padding: "10px 14px", background: "#0f0f16", border: "1px solid #1a1a28", borderRadius: "8px", color: "#fff", fontSize: "14px", outline: "none" }}>
                    <option value="general">General</option>
                    <option value="bookkeeping">Bookkeeping</option>
                    <option value="hr">HR</option>
                    <option value="inventory">Inventory</option>
                    <option value="scheduling">Scheduling</option>
                    <option value="invoicing">Invoicing</option>
                    <option value="support">Support</option>
                    <option value="email">Email</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>
                <button type="submit" style={{ padding: "8px 20px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Create</button>
              </form>
            )}

            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#5e5e78" }}>Loading...</div>
            ) : workflows.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#5e5e78" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚡</div>
                <p>No workflows yet. Create your first automation!</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {workflows.map(w => (
                  <div key={w.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#08080c", border: "1px solid #1a1a28", borderRadius: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "20px" }}>{categories[w.category] || "⚙️"}</span>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>{w.name}</div>
                        <div style={{ fontSize: "12px", color: "#5e5e78" }}>{w.category} · {w.tasksRun} tasks run</div>
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
    </div>
  )
}
