'use client'

import { useState } from 'react'
import styles from './page.module.css'

const entries = [
  { id: '001', type: 'Concept', title: 'Affordance', desc: 'A signal that tells the user what action is possible — without needing instruction.', tags: ['ux-ui'] },
  { id: '002', type: 'Term', title: 'Cognitive load', desc: 'The mental effort required to process and use an interface. Less is almost always better.', tags: ['ux-ui'] },
  { id: '003', type: 'Method', title: 'Mental model', desc: 'The internal picture a user builds of how a system works — not how it actually works.', tags: ['ux-ui'] },
  { id: '004', type: 'Prompt pattern', title: 'Role prompting', desc: 'Priming the AI with a persona to shape its tone and level of expertise.', tags: ['ai-prompting'] },
  { id: '005', type: 'Prompt pattern', title: 'Chain of thought', desc: 'Asking the model to reason step by step before giving a final answer.', tags: ['ai-prompting'] },
  { id: '006', type: 'Term', title: 'Information hierarchy', desc: 'The visual order in which content is presented to guide the user\'s eye.', tags: ['ux-ui', 'web-dev'] },
  { id: '007', type: 'Concept', title: 'Context window', desc: 'The amount of text an AI can hold in working memory at once — your conversation has a limit.', tags: ['ai-prompting', 'agents'] },
  { id: '008', type: 'Term', title: 'Semantic HTML', desc: 'Using the right HTML element for what it represents, not just how it looks.', tags: ['web-dev'] },
  { id: '009', type: 'Method', title: '5-second test', desc: 'Show a UI for 5 seconds, ask what they remember. Reveals what is actually prominent.', tags: ['ux-ui'] },
  { id: '010', type: 'Concept', title: 'MCP / tool use', desc: 'A protocol that lets AI agents connect to external services and take real-world actions.', tags: ['agents', 'ai-prompting'] },
  { id: '011', type: 'Prompt pattern', title: 'Negative constraints', desc: 'Telling the AI what not to do can be as powerful as telling it what to do.', tags: ['ai-prompting'] },
  { id: '012', type: 'Term', title: 'Affordance', desc: 'The visual or physical property of an object that suggests how it should be used.', tags: ['ux-ui'] },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'ux-ui', label: 'UX / UI' },
  { key: 'ai-prompting', label: 'AI prompting' },
  { key: 'web-dev', label: 'Web dev' },
  { key: 'agents', label: 'Agents' },
]

export default function Home() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? entries
    : entries.filter(e => e.tags.includes(active))

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px 80px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: '1.5px solid var(--black)', paddingBottom: '18px', marginTop: '48px', marginBottom: '28px'
      }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 400, letterSpacing: '-0.5px' }}>
          Scaffold
        </span>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)' }}>
          Est. 2025 — {entries.length} entries
        </span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', borderBottom: '0.5px solid var(--border)', marginBottom: '24px' }}>
        {filters.map(f => (
          <button key={f.key} onClick={() => setActive(f.key)} style={{
            fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase',
            letterSpacing: '0.08em', padding: '7px 18px 7px 0',
            color: active === f.key ? 'var(--black)' : 'var(--gray)',
            borderBottom: active === f.key ? '1.5px solid var(--black)' : '1.5px solid transparent',
            marginBottom: '-0.5px', border: 'none', background: 'none', cursor: 'pointer'
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Entry count */}
      <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray)', marginBottom: '16px' }}>
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '0.5px solid var(--border)' }}>
        {filtered.map((entry, i) => (
          <div key={entry.id} style={{
            padding: '22px 20px 22px 0',
            borderRight: (i + 1) % 3 === 0 ? 'none' : '0.5px solid var(--border)',
            borderBottom: '0.5px solid var(--border)',
            cursor: 'pointer'
          }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '8px' }}>
              {entry.type}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 400, lineHeight: 1.15, marginBottom: '10px' }}>
              {entry.title}
            </div>
            <div style={{ fontSize: '11px', lineHeight: 1.6, color: 'var(--gray)', marginBottom: '14px' }}>
              {entry.desc}
            </div>
            <span style={{
              fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em',
              color: 'var(--gray)', border: '0.5px solid var(--border)', padding: '3px 9px'
            }}>
              {entry.tags[0].replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>

    </main>
  )
}