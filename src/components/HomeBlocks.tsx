// src/components/HomeBlocks.tsx
import { Link } from 'react-router-dom'
import { getTeasers } from '../lib/contentIndex'
import type { Teaser, SectionKey } from '../types/content'
import {
  SECTION_CONFIG,
  HOME_SECTIONS,
} from '../config/sections'

export default function HomeBlocks() {
  return (
    <>
      {HOME_SECTIONS.map((id) => {
        // Forzamos el tipo correcto para que TS reconozca la sección como SectionKey
        const section = id as SectionKey

        const cfg = SECTION_CONFIG[section]
        const limit = cfg.homeLimit ?? 3
        const items: Teaser[] = getTeasers(section, limit)

        if (!items.length) return null

        return (
          <section
            key={section}
            className={`home-blocks__section home-blocks__section--${section}`}
            data-section={section}
          >
            <div className="app-container">
              <header className="home-blocks__header">
                <Link
                  key={`${cfg.listTitle}`}
                  to={`${cfg.basePath}`}
                >
                  <h2 className="home-blocks__title">{cfg.listTitle}</h2>
                </Link>


                {cfg.pageSubtitle && (
                  <p className="content-subtitle">{cfg.pageSubtitle}</p>
                )}
              </header>

              <div className="home-blocks__grid">
                {items.map((item) => (
                  <Link
                    key={`${section}-${item.slug}`}
                    to={`${cfg.basePath}/${item.slug}`}
                    className="content-card"
                  >
                    <div className="content-card-meta">
                      {item.date && <span className="content-card-date">{item.date}</span>}
                    </div>
                    {item.cover && (
                      <div className="content-card-media">
                        <img
                          src={item.cover}
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h3 className="content-card-title">{item.title}</h3>
                    {item.excerpt && (
                      <p className="content-card-excerpt">{item.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>

        )
      })}
    </>
  )
}
