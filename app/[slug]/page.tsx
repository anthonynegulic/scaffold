import Link from 'next/link'
import { notFound } from 'next/navigation'
import entries from '../../content/entries.json'
import registry from '../demos/registry'

export function generateStaticParams() {
  return entries.map(entry => ({ slug: entry.slug }))
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = entries.find(e => e.slug === slug)

  if (!entry) notFound()

  const related = entries.filter(e =>
    e.slug !== entry.slug &&
    e.tags.some(t => entry.tags.includes(t))
  ).slice(0, 3)

  const Demo = registry[entry.slug] || null

  return (
    <main style={{ maxWidth: '740px', margin: '0 auto', padding: '0 32px 80px' }}>

      {/* Back link */}
      <div style={{ marginTop: '48px', marginBottom: '48px' }}>
        <Link href="/" style={{
          fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase',
          letterSpacing: '0.1em', color: 'var(--gray)', textDecoration: 'none'
        }}>
          ← Scaffold
        </Link>
      </div>

      {/* Entry header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em',
          color: 'var(--ochre)', marginBottom: '16px'
        }}>
          {entry.type}
        </div>
        <h1 style={{
          fontFamily: 'var(--serif)', fontSize: '48px', fontWeight: 400,
          lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: '20px'
        }}>
          {entry.title}
        </h1>
        <p style={{
          fontFamily: 'var(--mono)', fontSize: '14px', lineHeight: 1.7,
          color: 'var(--gray)', maxWidth: '560px'
        }}>
          {entry.desc}
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid var(--border)', marginBottom: '40px' }} />

      {/* Body */}
      <div style={{ marginBottom: '64px' }}>
        {entry.body.split('\n\n').map((block, i) => {
          if (block.startsWith('**') && block.endsWith('**')) {
            return (
              <h2 key={i} style={{
                fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'var(--text)', marginBottom: '12px', marginTop: '32px'
              }}>
                {block.replace(/\*\*/g, '')}
              </h2>
            )
          }
          if (block.startsWith('- ')) {
            const items = block.split('\n').filter(l => l.startsWith('- '))
            return (
              <ul key={i} style={{ paddingLeft: '0', listStyle: 'none', marginBottom: '24px' }}>
                {items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: 'var(--mono)', fontSize: '13px', lineHeight: 1.7,
                    color: 'var(--gray)', paddingLeft: '16px', position: 'relative',
                    marginBottom: '6px'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--ochre)' }}>—</span>
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <p key={i} style={{
              fontFamily: 'var(--mono)', fontSize: '13px', lineHeight: 1.8,
              color: 'var(--gray)', marginBottom: '24px'
            }}>
              {block.replace(/\*\*(.*?)\*\*/g, '$1')}
            </p>
          )
        })}
      </div>

      {/* Demo — renders only if one exists for this slug */}
      {Demo && <Demo />}

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '64px' }}>
        {entry.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--mono)', fontSize: '9px', textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--gray)',
            border: '0.5px solid var(--border)', padding: '4px 10px'
          }}>
            {tag.replace('-', ' ')}
          </span>
        ))}
      </div>

      {/* Related entries */}
      {related.length > 0 && (
        <div>
          <div style={{
            fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--gray)', marginBottom: '16px', borderTop: '0.5px solid var(--border)',
            paddingTop: '32px'
          }}>
            Related
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '0.5px solid var(--border)' }}>
            {related.map((r, i) => (
              <Link key={r.id} href={`/${r.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  padding: '18px 16px 18px 0',
                  borderRight: i < related.length - 1 ? '0.5px solid var(--border)' : 'none',
                  borderBottom: '0.5px solid var(--border)'
                }}>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ochre)', marginBottom: '6px' }}>
                    {r.type}
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400, lineHeight: 1.2, marginBottom: '6px' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '10px', lineHeight: 1.55, color: 'var(--gray)' }}>
                    {r.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </main>
  )
}