// src/lib/seo.ts
import type { SEOConfig } from '../models/seo.model'
import type { BaseMeta } from '../models/content.model'
import { SECTION_CONFIG } from '../config/sections'

export function buildSEOForEntry(
  section: string,
  meta?: BaseMeta
): SEOConfig {
  const cfg = SECTION_CONFIG[section]
  const baseTitle = cfg?.pageTitle ?? meta?.title ?? 'TECHIC'
  const baseDescription =
    meta?.excerpt ??
    cfg?.pageSubtitle ??
    'Producción Creativa y Dirección Visual.'

  return {
    title: meta?.seoTitle ?? baseTitle,
    description: meta?.seoDescription ?? baseDescription,
    image: meta?.seoImage ?? meta?.cover,
    noIndex: meta?.seoNoIndex ?? !cfg?.enabled,
    // canonical es opcional: podrías calcularla con base en window.location
  }
}

export function buildSEOForHome(): SEOConfig {
  return {
    title: 'TECHIC – Producción Creativa y Dirección Visual',
    description:
      'Agencia de contenido especializada en producción audiovisual, estrategia creativa y dirección visual para marcas, artistas y creadores.',
  }
}