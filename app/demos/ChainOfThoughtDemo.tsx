'use client'

import { useState } from 'react'

export default function ChainOfThoughtDemo() {
  const [input, setInput] = useState('')
  const [directResponse, setDirectResponse] = useState('')
  const [cotResponse, setCotResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const submit = async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setDirectResponse('')
    setCotResponse('')
    setHasRun(true)

    const [directRes, cotRes] = await Promise.all([
      fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }]
        })
      }),
      fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `${input}\n\nThink through this step by step before giving your final answer.` }]
        })
      })
    ])

    const [directData, cotData] = await Promise.all([directRes.json(), cotRes.json()])

    setDirectResponse(directData.content?.[0]?.text || 'No response received.')
    setCotResponse(cotData.content?.[0]?.text || 'No response received.')
    setLoading(false)
  }

  return (
    <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '40px', marginBottom: '64px' }}>

      <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '16px' }}>
        Try it — Chain-of-thought
      </div>

      <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.7, color: 'var(--gray)', marginBottom: '28px', maxWidth: '560px' }}>
        Ask a question that involves reasoning — a logic puzzle, a multi-step problem, a decision with tradeoffs. Both prompts run simultaneously: one asks directly, one asks the model to think step by step.
      </p>

      {/* Input */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)', marginBottom: '6px' }}>
          Your question
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }}
          placeholder="e.g. A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?"
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
        {loading ? 'Running both...' : 'Submit ⌘↵'}
      </button>

      {/* Side by side responses */}
      {hasRun && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Direct */}
          <div style={{ borderLeft: '1.5px solid var(--border)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)', marginBottom: '12px' }}>
              Direct answer
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap', minHeight: '40px' }}>
              {loading ? <span style={{ color: 'var(--gray)' }}>—</span> : directResponse}
            </div>
          </div>

          {/* Chain of thought */}
          <div style={{ borderLeft: '1.5px solid var(--ochre)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '12px' }}>
              Step by step
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap', minHeight: '40px' }}>
              {loading ? <span style={{ color: 'var(--gray)' }}>—</span> : cotResponse}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}