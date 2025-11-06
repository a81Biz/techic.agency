// src/pages/ContentDetailPage.tsx
import { Link, useParams } from 'react-router-dom'
import type { BaseMeta, WithComponent } from '../types/content'
import { Content } from '../lib/contentIndex'
import {
  SECTION_CONFIG,
  type CollectionSectionId,
} from '../config/sections'
import { mdxComponents } from '../mdx-components'
import SEO from '../components/SEO'
import { buildSEOForEntry } from '../lib/seo'

interface ContentDetailPageProps {
  section: CollectionSectionId
}

// Entrada completa que esperamos encontrar en Content[section]
type DetailEntry = WithComponent<BaseMeta> & {
  slug: string
  title?: string
  date?: string
  tags?: string[]
  role?: string[]
}

// Vista reutilizable de “no encontrado / sin contenido”
function NotFoundView({ section }: { section: CollectionSectionId }) {
  const cfg = SECTION_CONFIG[section]

  return (
    <main
      className={`content-detail content-detail--${section}`}
      data-section={section}
    >
      <div className="container">
        <p className="content-detail__back">
          <Link to={cfg.basePath}>
            ← Volver a {cfg.listTitle.toLowerCase()}
          </Link>
        </p>
        <h1>Pronto publicaremos este contenido.</h1>
        <p>La ruta ya existe, pero todavía no hay nada publicado.</p>
      </div>
    </main>
  )
}

// Busca una entrada dentro de la colección correspondiente
function getEntry(
  section: CollectionSectionId,
  slug: string,
): DetailEntry | null {
  // Forzamos a TS a entender que section es una key válida de Content
  const sectionKey = section as keyof typeof Content
  const list = (Content[sectionKey] ?? []) as DetailEntry[]
  return list.find((item) => item.slug === slug) ?? null
}

export default function ContentDetailPage({
  section,
}: ContentDetailPageProps) {
  const { slug } = useParams<{ slug: string }>()

  // Si no hay slug en la URL, mostramos la vista de “no encontrado”
  if (!slug) {
    return <NotFoundView section={section} />
  }

  const entry = getEntry(section, slug)

  // Si la ruta existe pero no hay contenido publicado todavía
  if (!entry) {
    return <NotFoundView section={section} />
  }

  const { Component } = entry
  const title = entry.title || slug
  const date = entry.date
  const tags: string[] = entry.tags ?? []
  const role: string[] = entry.role ?? []
  const seo = buildSEOForEntry(section, entry)

  return (
    <main
      className={`content-detail content-detail--${section}`}
      data-section={section}
    >
      <SEO {...seo} />
      
      <div className="app-container content-detail__container">
        <p className="content-detail__back">
          <Link to={SECTION_CONFIG[section].basePath}>
            ← Volver a {SECTION_CONFIG[section].listTitle.toLowerCase()}
          </Link>
        </p>

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
