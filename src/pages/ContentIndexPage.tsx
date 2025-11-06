// src/pages/ContentIndexPage.tsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTeasers } from '../lib/contentIndex'
import type { Teaser, SectionKey } from '../types/content'
import {
  SECTION_CONFIG,
  type CollectionSectionId,
} from '../config/sections'
import SEO from '../components/SEO'
import { buildSEOForEntry } from '../lib/seo'


interface ContentIndexPageProps {
  section: CollectionSectionId
}

export default function ContentIndexPage({ section }: ContentIndexPageProps) {
  // Hacemos explícito que esta sección es un SectionKey válido
  const sectionKey = section as SectionKey

  const cfg = SECTION_CONFIG[sectionKey]
  const items: Teaser[] = getTeasers(sectionKey)

  const seo = buildSEOForEntry(section)

  useEffect(() => {
    document.title = cfg.pageTitle
  }, [cfg.pageTitle])

  return (
    <main
      className={`content-index content-index--${sectionKey}`}
      data-section={sectionKey}
    >
      <SEO {...seo} />
      <div className="content-container">
        <header className="content-header">
          <h1 className="content-title">{cfg.listTitle}</h1>
          {cfg.pageSubtitle && (
            <p className="content-subtitle">{cfg.pageSubtitle}</p>
          )}
        </header>

        {items.length === 0 ? (
          <p>Pronto publicaremos contenido en esta sección.</p>
        ) : (
          <section className="content-list">
            {items.map((item) => (
              <Link
                key={`${sectionKey}-${item.slug}`}
                to={`${cfg.basePath}/${item.slug}`}
                className="content-card"
              >
                {/* Bloque de imagen lateral */}
                {item.cover && (
                <div className="content-card-media">
                  
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading="lazy"
                    />
                </div>
                )}

                {/* Bloque de contenido */}
                <div className="content-card-body">
                  {item.date && (
                    <span className="content-card-date">{item.date}</span>
                  )}
                  <h2 className="content-card-title">{item.title}</h2>
                  {item.excerpt && (
                    <p className="content-card-excerpt">{item.excerpt}</p>
                  )}
                  <span className="content-card-cta">
                    Ver {cfg.itemLabel.toLowerCase()} completo →
                  </span>
                </div>
              </Link>
            ))}
          </section>

        )}
      </div>
    </main>
  )
}
