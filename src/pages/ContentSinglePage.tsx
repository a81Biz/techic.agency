// src/pages/ContentSinglePage.tsx
import { Link } from 'react-router-dom'
import type { BaseMeta, WithComponent, SectionKey } from '../types/content'
import { Content } from '../lib/contentIndex'
import {
  SECTION_CONFIG,
  type SingleSectionId,
} from '../config/sections'
import { mdxComponents } from '../mdx-components'
import SEO from '../components/SEO'
import { buildSEOForEntry } from '../lib/seo'

type SingleEntry = WithComponent<BaseMeta> & {
  slug?: string
  title?: string
  date?: string
  tags?: string[]
  role?: string[]
}

interface ContentSinglePageProps {
  section: SingleSectionId
}

// Vista de “no hay contenido aún” reutilizable
function EmptySingleView({ section }: { section: SingleSectionId }) {
  const cfg = SECTION_CONFIG[section as SectionKey]

  return (
    <main
      className={`content-detail content-detail--${section}`}
      data-section={section}
    >
      <div className="container">
        <p className="content-detail__back">
          <Link to="/">← Volver al inicio</Link>
        </p>
        <h1>{cfg.listTitle}</h1>
        <p>Pronto publicaremos esta página.</p>
      </div>
    </main>
  )
}

export default function ContentSinglePage({ section }: ContentSinglePageProps) {
  const sectionKey = section as SectionKey
  const cfg = SECTION_CONFIG[sectionKey]

  const list = (Content[sectionKey] ?? []) as SingleEntry[]
  const entry = list[0] ?? null

  if (!entry) {
    return <EmptySingleView section={section} />
  }

  const seo = buildSEOForEntry(sectionKey, entry)

  const { Component } = entry
  const title = entry.title || cfg.listTitle
  const date = entry.date
  const tags: string[] = entry.tags ?? []
  const role: string[] = entry.role ?? []

  return (
       <main
      className={`content-detail content-detail--${section}`}
      data-section={section}
    >
      <div className="app-container content-detail__container">
        <p className="content-detail__back">
          <Link to={SECTION_CONFIG[section].basePath}>
            ← Volver a {SECTION_CONFIG[section].listTitle.toLowerCase()}
          </Link>
        </p>

        <SEO {...seo} />

        <div className="content-detail__header">
          <div className="content-detail__meta">
            {date && <span className="content-detail__date">{date}</span>}
            {role.length > 0 && (
              <ul className="content-detail__roles">
                {role.map((r: string) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </div>
          <h1 className="content-detail__title">{title}</h1>
        </div>

        <article className="content-detail__body">
          <Component components={mdxComponents} />
        </article>

        {tags.length > 0 && (
          <div className="content-detail__footer">
            <ul className="content-detail__tags">
              {tags.map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
