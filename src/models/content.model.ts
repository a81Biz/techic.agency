// src/models/content.model.ts
import type { ComponentType } from 'react'
import type { SEOOverrides } from './seo.model'

/**
 * Identificador dinámico de sección.
 * Cualquier carpeta dentro de /content/<section>/ funciona
 * sin tener que actualizar el tipo.
 */
export type SectionKey = string

export interface BaseMeta extends SEOOverrides {
  slug: string
  title: string
  date?: string
  excerpt?: string
  cover?: string
  tags?: string[]
}

/**
 * Meta específica para proyectos (opcional).
 * Si no la necesitas, puedes ignorarla; el sistema trata todo como BaseMeta.
 */
export interface ProjectMeta extends BaseMeta {
  client?: string
  role?: string[]
  year?: string
}

/** Entrada de contenido con su componente React asociado */
export type WithComponent<M extends object = BaseMeta> = M & {
  Component: ComponentType<Record<string, unknown>>
}

/** Teaser estándar para Home e índices */
export interface Teaser {
  section: SectionKey
  slug: string
  title: string
  date?: string
  excerpt?: string
  cover?: string
}
