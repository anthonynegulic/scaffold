'use client'

import { useState } from 'react'

type Pair = { input: string; output: string }

export default function FewShotDemo() {
  const [pairs, setPairs] = useState<Pair[]>([{ input: '', output: '' }])
  const [newInput, setNewInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const updatePair = (index: number, field: 'input' | 'output', value: string) => {
    setPairs(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const addPair = () => {
    if (pairs.length < 3) setPairs(prev => [...prev, { input: '', output: '' }])
  }

  const removePair = (index: number) => {
    setPairs(prev => prev.filter((_, i) => i !== index))
  }

  const submit = async () => {
    if (!newInput.trim() || loading) return
    setLoading(true)
    setResponse('')
    setHasRun(true)

    const validPairs = pairs.filter(p => p.input.trim() && p.output.trim())

    const exampleText = validPairs.length > 0
      ? validPairs.map(p => `Input: ${p.input}\nOutput: ${p.output}`).join('\n\n') + '\n\n'
      : ''

    const prompt = `${exampleText}Input: ${newInput}\nOutput:`

    const res = await fetch('/api/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await res.json()
    setResponse(data.content?.[0]?.text || 'No response received.')
    setLoading(false)
  }

  const labelStyle = {
    fontFamily: 'var(--mono)',
    fontSize: '9px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--gray)',
    marginBottom: '6px',
  }

  const inputStyle = {
    width: '100%',
    fontFamily: 'var(--mono)',
    fontSize: '12px',
    lineHeight: 1.6,
    color: 'var(--text)',
    background: 'transparent',
    border: '0.5px solid var(--border)',
    padding: '10px 12px',
    outline: 'none',
  }

  return (
    <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '40px', marginBottom: '64px' }}>

      <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '16px' }}>
        Try it — Few-shot
      </div>

      <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.7, color: 'var(--gray)', marginBottom: '28px', maxWidth: '560px' }}>
        Add up to 3 example input/output pairs to show the model the pattern you want. Then submit a new input and watch it follow your examples.
      </p>

      {/* Example pairs */}
      {pairs.map((pair, i) => (
        <div key={i} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ochre)' }}>
              Example {i + 1}
            </div>
            {pairs.length > 1 && (
              <button onClick={() => removePair(i)} style={{
                fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--gray)', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0,
              }}>
                Remove
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <div style={labelStyle}>Input</div>
              <input
                value={pair.input}
                onChange={e => updatePair(i, 'input', e.target.value)}
                placeholder="e.g. Running shoes"
                style={inputStyle}
              />
            </div>
            <div>
              <div style={labelStyle}>Output</div>
              <input
                value={pair.output}
                onChange={e => updatePair(i, 'output', e.target.value)}
                placeholder="e.g. Swift Stride"
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add example */}
      {pairs.length < 3 && (
        <button onClick={addPair} style={{
          fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
          letterSpacing: '0.1em', color: 'var(--gray)', background: 'none',
          border: '0.5px solid var(--border)', padding: '6px 14px',
          cursor: 'pointer', marginBottom: '28px', marginTop: '4px',
        }}>
          + Add example
        </button>
      )}

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid var(--border)', margin: '24px 0' }} />

      {/* New input */}
      <div style={{ marginBottom: '12px' }}>
        <div style={labelStyle}>Now try a new input</div>
        <input
          value={newInput}
          onChange={e => setNewInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }}
          placeholder="e.g. Coffee maker"
          style={inputStyle}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading || !newInput.trim()}
        style={{
          fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: loading || !newInput.trim() ? 'var(--gray)' : 'var(--ochre)',
          background: 'none',
          border: `0.5px solid ${loading || !newInput.trim() ? 'var(--border)' : 'var(--ochre)'}`,
          padding: '7px 16px', cursor: loading || !newInput.trim() ? 'default' : 'pointer',
          transition: 'color 0.2s, border-color 0.2s', marginBottom: '32px',
        }}
      >
        {loading ? 'Thinking...' : 'Submit ↵'}
      </button>

      {/* Response */}
      {hasRun && (
        <div style={{ borderLeft: '1.5px solid var(--ochre)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)', marginBottom: '12px' }}>
            Response
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap', minHeight: '40px' }}>
            {loading ? <span style={{ color: 'var(--gray)' }}>—</span> : response}
          </div>
        </div>
      )}
    </div>
  )
}