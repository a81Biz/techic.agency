// src/router.tsx
import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  SECTION_CONFIG,
  COLLECTION_SECTIONS,
  SINGLE_SECTIONS,
  type CollectionSectionId,
  type SingleSectionId,
} from './config/sections'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ContentIndexPage = lazy(() => import('./pages/ContentIndexPage'))
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage'))
const ContentSinglePage = lazy(() => import('./pages/ContentSinglePage'))

export function Router() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Colecciones: /projects, /projects/:slug, /blog, /blog/:slug, etc. */}
      {COLLECTION_SECTIONS.map((sectionId) => {
        const section = sectionId as CollectionSectionId
        const cfg = SECTION_CONFIG[section]

        return (
          <Route key={section}>
            <Route
              path={cfg.basePath}
              element={<ContentIndexPage section={section} />}
            />
            <Route
              path={`${cfg.basePath}/:slug`}
              element={<ContentDetailPage section={section} />}
            />
          </Route>
        )
      })}

      {/* Páginas únicas: /about, /single-page, lo que defina content/<section>/section.json */}
      {SINGLE_SECTIONS.map((sectionId) => {
        const section = sectionId as SingleSectionId
        const cfg = SECTION_CONFIG[section]

        return (
          <Route
            key={section}
            path={cfg.basePath}
            element={<ContentSinglePage section={section} />}
          />
        )
      })}
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}