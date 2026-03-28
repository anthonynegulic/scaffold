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
    c