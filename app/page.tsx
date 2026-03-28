'use client'

import { useState } from 'react'
import Link from 'next/link'
import entries from '../content/entries.json'

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
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        borderBottom: '1.5px solid var(--black)', paddingBottom: '18px',
        marginTop: '48px', marginBottom: '28px'
      }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 400, letterSpacing: '-0.5px' }}>
          Scaffold
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <svg width="120" height="108" viewBox="0 0 120 108" style={{ display: 'block' }}>
            <rect x="5" y="4" width="96" height="70" rx="6" fill="#e8e4dc" stroke="#2a2a2a" strokeWidth="1.5"/>
            <rect x="12" y="11" width="82" height="56" rx="2" fill="#f0ede6"/>
            <line x1="12" y1="21" x2="94" y2="21" stroke="#d8d4cc" strokeWidth="0.5"/>
            <line x1="12" y1="31" x2="94" y2="31" stroke="#d8d4cc" strokeWidth="0.5"/>
            <line x1="12" y1="41" x2="94" y2="41" stroke="#d8d4cc" strokeWidth="0.5"/>
            <line x1="12" y1="51" x2="94" y2="51" stroke="#d8d4cc" strokeWidth="0.5"/>
            <line x1="12" y1="61" x2="94" y2="61" stroke="#d8d4cc" strokeWidth="0.5"/>
            <text x="17" y="26" fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="#888888">SCAFFOLD DB v1.0</text>
            <text x="17" y="36" fontFamily="IBM Plex Mono, monospace" fontSize="7" fill="#aaaaaa">————————————</text>
            <text x="17" y="47" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#1a1a1a" fontWeight="500">ENTRIES: {String(entries.length).padStart(3, '0')}</text>
            <text x="17" y="58" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#C49A2A">STATUS: ONLINE</text>
            <rect className="monitor-cursor" x="80" y="51" width="5" height="8" rx="0.5" fill="#C49A2A"/>
            <rect x="43" y="74" width="20" height="9" rx="1" fill="none" stroke="#2a2a2a" strokeWidth="1.5"/>
            <rect x="28" y="83" width="50" height="7" rx="3.5" fill="none" stroke="#2a2a2a" strokeWidth="1.5"/>
            <circle cx="88" cy="70" r="2" fill="#C49A2A" opacity="0.6"/>
            <rect x="72" y="67" width="12" height="2.5" rx="0.5" fill="none" stroke="#aaaaaa" strokeWidth="0.5"/>
          </svg>
          <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gray)' }}>
            Est. 2025 — {entries.length} entries
          </span>
        </div>
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
          <Link key={entry.id} href={`/${entry.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '22px 20px 22px 0',
              borderRight: (i % 3) === 2 ? 'none' : '0.5px solid var(--border)',
              borderBottom: '0.5px solid var(--border)',
              cursor: 'pointer',
              transition: 'background 0.1s'
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
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
          </Link>
        ))}
      </div>

    </main>
  )
}