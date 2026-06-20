"use client"

import Link from "next/link"

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--bg:#08080c;--surface:#0f0f16;--border:#1a1a28;--text:#e0e0ef;--muted:#5e5e78;--accent:#6366f1;--accent2:#8b5cf6;--glow:rgba(99,102,241,.12);--green:#10b981}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
        .wrap{max-width:1200px;margin:0 auto;padding:0 24px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;cursor:pointer;border:none;transition:all .2s}
        .btn-p{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;box-shadow:0 4px 28px rgba(99,102,241,.25)}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(99,102,241,.35)}
        .btn-o{background:transparent;border:1px solid var(--border);color:var(--text)}
        .btn-o:hover{border-color:var(--accent);background:var(--glow)}
        nav{display:flex;align-items:center;justify-content:space-between;padding:18px 0;position:sticky;top:0;z-index:100;background:rgba(8,8,12,.8);backdrop-filter:blur(12px);border-bottom:1px solid transparent}
        nav.scrolled{border-bottom-color:var(--border)}
        .logo{font-size:22px;font-weight:900;color:#fff;text-decoration:none;letter-spacing:-.02em}
        .logo em{color:var(--accent);font-style:normal}
        .nav-r{display:flex;align-items:center;gap:24px}
        .nav-r a{color:var(--muted);text-decoration:none;font-size:14px;font-weight:500;transition:.2s}
        .nav-r a:hover{color:#fff}
        .nav-r .btn{padding:9px 20px;font-size:13px}
        .hero{padding:80px 0 100px;text-align:center;position:relative}
        .hero::before{content:'';position:absolute;top:-300px;left:50%;transform:translateX(-50%);width:900px;height:900px;background:radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 65%);pointer-events:none;z-index:0}
        .hero>*{position:relative;z-index:1}
        .pill{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;background:var(--glow);border:1px solid rgba(99,102,241,.25);border-radius:100px;font-size:13px;font-weight:600;color:var(--accent);margin-bottom:28px}
        h1{font-size:clamp(42px,6.5vw,76px);font-weight:900;line-height:1.05;letter-spacing:-.04em;margin-bottom:24px;background:linear-gradient(135deg,#fff 0%,#c4b5fd 50%,#a5b4fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-p{font-size:clamp(16px,2vw,20px);color:var(--muted);max-width:620px;margin:0 auto 44px;line-height:1.75}
        .hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
        .hero-proof{display:flex;justify-content:center;gap:56px;flex-wrap:wrap}
        .proof-n{font-size:32px;font-weight:900;color:#fff;letter-spacing:-.02em}
        .proof-l{font-size:12px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
        .sec{padding:100px 0}
        .sec-label{text-align:center;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:var(--accent);margin-bottom:14px}
        .sec-title{font-size:clamp(32px,4.5vw,50px);font-weight:900;text-align:center;margin-bottom:14px;letter-spacing:-.03em}
        .sec-sub{font-size:17px;color:var(--muted);text-align:center;max-width:580px;margin:0 auto 64px;line-height:1.7}
        .steps-g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .step{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:36px;transition:.25s}
        .step:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
        .step-n{width:44px;height:44px;background:var(--glow);border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:var(--accent);margin-bottom:20px}
        .step h3{font-size:20px;font-weight:700;margin-bottom:10px;letter-spacing:-.01em}
        .step p{color:var(--muted);font-size:14px;line-height:1.75}
        .feat-sec{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .feat-g{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .feat{background:var(--bg);border:1px solid var(--border);border-radius:16px;padding:28px;transition:.2s}
        .feat:hover{border-color:rgba(99,102,241,.4)}
        .feat-ico{font-size:32px;margin-bottom:14px}
        .feat h3{font-size:17px;font-weight:700;margin-bottom:8px}
        .feat p{color:var(--muted);font-size:13px;line-height:1.7}
        .price-g{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:1000px;margin:0 auto}
        .price{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:40px 36px;position:relative;transition:.25s}
        .price:hover{border-color:var(--accent)}
        .price.pop{border-color:var(--accent);box-shadow:0 0 60px rgba(99,102,241,.12)}
        .pop-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;padding:5px 18px;border-radius:100px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
        .price h3{font-size:18px;font-weight:700;margin-bottom:6px}
        .price .amt{font-size:52px;font-weight:900;color:#fff;margin:16px 0 2px;letter-spacing:-.03em}
        .price .amt span{font-size:15px;font-weight:500;color:var(--muted)}
        .price .billed{font-size:13px;color:var(--muted);margin-bottom:24px}
        .feat-list{list-style:none;margin:0 0 32px;padding:0}
        .feat-list li{padding:7px 0;font-size:14px;color:var(--muted);display:flex;align-items:center;gap:10px}
        .feat-list li::before{content:'✓';color:var(--green);font-weight:700;font-size:13px}
        .price .btn{width:100%;justify-content:center}
        .faq-sec{background:var(--surface);border-top:1px solid var(--border)}
        .faq-l{max-width:700px;margin:0 auto}
        .faq-i{border-bottom:1px solid var(--border);padding:22px 0}
        .faq-q{font-size:16px;font-weight:600;cursor:pointer}
        .faq-a{color:var(--muted);font-size:14px;line-height:1.75;margin-top:12px}
        .final{padding:100px 0;text-align:center}
        .final h2{font-size:clamp(32px,4.5vw,50px);font-weight:900;margin-bottom:14px;letter-spacing:-.03em}
        .final p{color:var(--muted);font-size:18px;margin-bottom:40px}
        footer{border-top:1px solid var(--border);padding:56px 0 28px}
        .fg2{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-bottom:40px}
        .fcol h4{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:14px}
        .fcol a{display:block;color:var(--muted);text-decoration:none;font-size:13px;padding:3px 0;transition:.2s}
        .fcol a:hover{color:#fff}
        .fbot{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--border);font-size:12px;color:var(--muted)}
        @media(max-width:900px){.steps-g,.feat-g,.price-g{grid-template-columns:1fr}.fg2{grid-template-columns:repeat(2,1fr)}.hero{padding:60px 0 80px}}
        @media(max-width:600px){.nav-r a{display:none}.hero-btns{flex-direction:column;align-items:center}}
      `}} />

      <nav id="nav">
        <div className="wrap" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="#" className="logo">Auto<em>Flow</em></a>
          <div className="nav-r">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="/login" className="btn btn-o" style={{padding:"9px 20px",fontSize:"13px"}}>Sign In</a>
            <a href="/register" className="btn btn-p" style={{padding:"9px 20px",fontSize:"13px"}}>Start Free →</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap">
          <div className="pill">⚡ Now in Public Beta — 2,400+ businesses onboarded</div>
          <h1>Automate Every<br/>Business Process</h1>
          <p className="hero-p">AI-powered workflows that handle bookkeeping, HR, inventory, scheduling, invoicing and more. Set up in 5 minutes. No code required.</p>
          <div className="hero-btns">
            <a href="/register" className="btn btn-p">Start Free Trial →</a>
            <a href="#features" className="btn btn-o">See How It Works</a>
          </div>
          <div className="hero-proof">
            <div><div className="proof-n">2,400+</div><div className="proof-l">Businesses</div></div>
            <div><div className="proof-n">14M+</div><div className="proof-l">Tasks Automated</div></div>
            <div><div className="proof-n">99.2%</div><div className="proof-l">Uptime</div></div>
            <div><div className="proof-n">4.9★</div><div className="proof-l">Rating</div></div>
          </div>
        </div>
      </section>

      <section className="sec" id="how">
        <div className="wrap">
          <div className="sec-label">How It Works</div>
          <h2 className="sec-title">Three steps to full automation</h2>
          <p className="sec-sub">No developers. No complex setup. Just connect your tools and let AI handle the rest.</p>
          <div className="steps-g">
            <div className="step"><div className="step-n">1</div><h3>Connect Your Tools</h3><p>Link your existing software — QuickBooks, Slack, Gmail, Sheets, Airtable, and 200+ more. One-click integrations.</p></div>
            <div className="step"><div className="step-n">2</div><h3>Describe Your Workflow</h3><p>Tell AutoFlow what you want automated in plain English. Our AI builds the workflow instantly.</p></div>
            <div className="step"><div className="step-n">3</div><h3>Run & Scale</h3><p>Your workflows run 24/7. Monitor from one dashboard. Scale from 10 to 10,000 tasks without lifting a finger.</p></div>
          </div>
        </div>
      </section>

      <section className="sec feat-sec" id="features">
        <div className="wrap">
          <div className="sec-label">Features</div>
          <h2 className="sec-title">Everything you need to automate</h2>
          <div className="feat-g">
            <div className="feat"><div className="feat-ico">📊</div><h3>Bookkeeping & Finance</h3><p>Auto-categorize expenses, reconcile accounts, generate P&L reports.</p></div>
            <div className="feat"><div className="feat-ico">👥</div><h3>HR & Payroll</h3><p>Automate onboarding, time tracking, payroll calculations, and compliance.</p></div>
            <div className="feat"><div className="feat-ico">📦</div><h3>Inventory Management</h3><p>Track stock levels, auto-reorder, sync across channels.</p></div>
            <div className="feat"><div className="feat-ico">📅</div><h3>Scheduling & Calendar</h3><p>Smart scheduling that avoids conflicts and sends reminders.</p></div>
            <div className="feat"><div className="feat-ico">🧾</div><h3>Invoicing & Billing</h3><p>Generate invoices, send payment reminders, track receivables.</p></div>
            <div className="feat"><div className="feat-ico">💬</div><h3>Customer Support</h3><p>AI-powered ticket routing, auto-responses, and escalation.</p></div>
            <div className="feat"><div className="feat-ico">📧</div><h3>Email Automation</h3><p>Auto-sort, respond, follow up, and nurture leads.</p></div>
            <div className="feat"><div className="feat-ico">📋</div><h3>Compliance & Reporting</h3><p>Auto-generate compliance reports and audit trails.</p></div>
            <div className="feat"><div className="feat-ico">🔗</div><h3>200+ Integrations</h3><p>Connect everything. QuickBooks, Slack, Stripe, Shopify, and more.</p></div>
          </div>
        </div>
      </section>

      <section className="sec" id="pricing">
        <div className="wrap">
          <div className="sec-label">Pricing</div>
          <h2 className="sec-title">Simple, transparent pricing</h2>
          <p className="sec-sub">Start free. Scale as you grow. No hidden fees. Cancel anytime.</p>
          <div className="price-g">
            <div className="price">
              <h3>Starter</h3>
              <div className="amt">$0<span>/mo</span></div>
              <div className="billed">Free forever</div>
              <ul className="feat-list">
                <li>3 active workflows</li><li>500 tasks/month</li><li>5 integrations</li><li>Email support</li>
              </ul>
              <a href="/register" className="btn btn-o">Get Started</a>
            </div>
            <div className="price pop">
              <div className="pop-tag">Most Popular</div>
              <h3>Professional</h3>
              <div className="amt">$49<span>/mo</span></div>
              <div className="billed">Billed monthly</div>
              <ul className="feat-list">
                <li>Unlimited workflows</li><li>25,000 tasks/month</li><li>50+ integrations</li><li>Priority support</li><li>Custom AI models</li><li>Team collaboration</li>
              </ul>
              <a href="/register" className="btn btn-p">Start Free Trial →</a>
            </div>
            <div className="price">
              <h3>Enterprise</h3>
              <div className="amt">$199<span>/mo</span></div>
              <div className="billed">Billed monthly</div>
              <ul className="feat-list">
                <li>Everything in Pro</li><li>Unlimited tasks</li><li>Unlimited integrations</li><li>Dedicated account manager</li><li>Custom SLA</li><li>SSO & advanced security</li>
              </ul>
              <a href="/register" className="btn btn-o">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec faq-sec" id="faq">
        <div className="wrap">
          <div className="sec-label">FAQ</div>
          <h2 className="sec-title">Frequently asked questions</h2>
          <div className="faq-l">
            <div className="faq-i"><div className="faq-q">How does the free trial work?</div><div className="faq-a">You get full access to Professional features for 14 days. No credit card required.</div></div>
            <div className="faq-i"><div className="faq-q">What integrations do you support?</div><div className="faq-a">200+ integrations including QuickBooks, Xero, Slack, Gmail, Stripe, Shopify, Airtable, Notion, HubSpot, and more.</div></div>
            <div className="faq-i"><div className="faq-q">Is my data secure?</div><div className="faq-a">Yes. We use bank-level encryption (AES-256), SOC 2 Type II compliance, and never train AI models on your data.</div></div>
            <div className="faq-i"><div className="faq-q">Can I cancel anytime?</div><div className="faq-a">Absolutely. No contracts, no cancellation fees. Your data is always exportable.</div></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <h2>Ready to automate your business?</h2>
          <p>Join 2,400+ businesses saving 30+ hours per week with AutoFlow.</p>
          <div>
            <a href="/register" className="btn btn-p">Start Free Trial →</a>
            <a href="/login" className="btn btn-o">Sign In</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="fg2">
            <div className="fcol"><h4>Product</h4><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#">Integrations</a><a href="#">API Docs</a></div>
            <div className="fcol"><h4>Resources</h4><a href="#">Blog</a><a href="#">Templates</a><a href="#">Case Studies</a><a href="#">Webinars</a></div>
            <div className="fcol"><h4>Company</h4><a href="#">About</a><a href="#">Careers</a><a href="#">Contact</a><a href="#">Partners</a></div>
            <div className="fcol"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">GDPR</a></div>
          </div>
          <div className="fbot"><div>© 2026 AutoFlow. All rights reserved.</div></div>
        </div>
      </footer>
    </>
  )
}
