'use client'

import { useState } from 'react'

export default function ZeroShotDemo() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const submit = async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setResponse('')
    setHasRun(true)

    const res = await fetch('/api/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: input }]
      })
    })

    const data = await res.json()
    setResponse(data.content?.[0]?.text || 'No response received.')
    setLoading(false)
  }

  return (
    <div style={{
      borderTop: '0.5px solid var(--border)',
      paddingTop: '40px',
      marginBottom: '64px',
    }}>

      {/* Demo label */}
      <div style={{
        fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em',
        color: 'var(--ochre)', marginBottom: '16px'
      }}>
        Try it — Zero-shot
      </div>

      <p style={{
        fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.7,
        color: 'var(--gray)', marginBottom: '20px', maxWidth: '560px'
      }}>
        Ask anything. No examples, no instructions — just your question and the model.
        This is zero-shot prompting in its purest form.
      </p>

      {/* Input */}
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit() }}
        placeholder="Type a question or task..."
        rows={3}
        style={{
          width: '100%',
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          lineHeight: 1.7,
          color: 'var(--text)',
          background: 'transparent',
          border: '0.5px solid var(--border)',
          padding: '14px',
          resize: 'vertical',
          outline: 'none',
          marginBottom: '12px',
        }}
      />

      {/* Submit */}
      <button
        onClick={submit}
        disabled={loading || !input.trim()}
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: loading || !input.trim() ? 'var(--gray)' : 'var(--ochre)',
          background: 'none',
          border: `0.5px solid ${loading || !input.trim() ? 'var(--border)' : 'var(--ochre)'}`,
          padding: '7px 16px',
          cursor: loading || !input.trim() ? 'default' : 'pointer',
          transition: 'color 0.2s, border-color 0.2s',
          marginBottom: '32px',
        }}
      >
        {loading ? 'Thinking...' : 'Submit ⌘↵'}
      </button>

      {/* Response */}
      {hasRun && (
        <div style={{
          borderLeft: '1.5px solid var(--ochre)',
          paddingLeft: '20px',
        }}>
          <div style={{
            fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--gray)', marginBottom: '12px'
          }}>
            Response
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            lineHeight: 1.8,
            color: 'var(--text)',
            whiteSpace: 'pre-wrap',
            minHeight: '40px',
          }}>
            {loading ? (
              <span style={{ color: 'var(--gray)' }}>—</span>
            ) : response}
          </div>
        </div>
      )}
    </div>
  )
}