'use client'

import { useState } from 'react'

const roles = [
  { key: 'senior-ux', label: 'Senior UX designer', prompt: 'You are a senior UX designer with 15 years of experience. You think in systems, prioritise user needs above all else, and give direct, opinionated feedback.' },
  { key: 'plain-editor', label: 'Plain-language editor', prompt: 'You are a plain-language editor. Your job is to make writing clearer, shorter, and easier to understand. You cut jargon ruthlessly.' },
  { key: 'code-reviewer', label: 'Sceptical code reviewer', prompt: 'You are a sceptical but fair code reviewer. You look for edge cases, potential bugs, and places where the logic could be cleaner. You do not sugarcoat.' },
  { key: 'brand-strategist', label: 'Brand strategist', prompt: 'You are a brand strategist. You think about positioning, tone, and how everything connects back to what a brand stands for.' },
  { key: 'junior-intern', label: 'Junior intern', prompt: 'You are a junior intern on your first week. You are eager, enthusiastic, and a little uncertain. You ask clarifying questions and hedge your answers.' },
]

export default function RolePromptingDemo() {
  const [selectedRole, setSelectedRole] = useState(roles[0].key)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [lastRole, setLastRole] = useState('')

  const submit = async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setResponse('')
    setHasRun(true)

    const role = roles.find(r => r.key === selectedRole)!
    setLastRole(role.label)

    const res = await fetch('/api/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: role.prompt,
        messages: [{ role: 'user', content: input }]
      })
    })

    const data = await res.json()
    setResponse(data.content?.[0]?.text || 'No response received.')
    setLoading(false)
  }

  return (
    <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '40px', marginBottom: '64px' }}>

      <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '16px' }}>
        Try it — Role prompting
      </div>

      <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.7, color: 'var(--gray)', marginBottom: '28px', maxWidth: '560px' }}>
        Pick a role, ask something. Then ask the same question with a different role selected and compare how the response changes character.
      </p>

      {/* Role selector */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)', marginBottom: '8px' }}>
          Role
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
          {roles.map(role => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              style={{
                fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: selectedRole === role.key ? 'var(--ochre)' : 'var(--gray)',
                background: 'none',
                border: `0.5px solid ${selectedRole === role.key ? 'var(--ochre)' : 'var(--border)'}`,
                padding: '6px 12px', cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)', marginBottom: '6px' }}>
          Your question
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }}
          placeholder="e.g. Review this button label: 'Click here to proceed'"
          rows={3}
          style={{
            width: '100%', fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.7,
            color: 'var(--text)', background: 'transparent',
            border: '0.5px solid var(--border)', padding: '14px',
            resize: 'vertical', outline: 'none',
          }}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading || !input.trim()}
        style={{
          fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: loading || !input.trim() ? 'var(--gray)' : 'var(--ochre)',
          background: 'none',
          border: `0.5px solid ${loading || !input.trim() ? 'var(--border)' : 'var(--ochre)'}`,
          padding: '7px 16px', cursor: loading || !input.trim() ? 'default' : 'pointer',
          transition: 'color 0.2s, border-color 0.2s', marginBottom: '32px',
        }}
      >
        {loading ? 'Thinking...' : 'Submit ⌘↵'}
      </button>

      {/* Response */}
      {hasRun && (
        <div style={{ borderLeft: '1.5px solid var(--ochre)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)', marginBottom: '12px' }}>
            Response — as {lastRole}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap', minHeight: '40px' }}>
            {loading ? <span style={{ color: 'var(--gray)' }}>—</span> : response}
          </div>
        </div>
      )}
    </div>
  )
}