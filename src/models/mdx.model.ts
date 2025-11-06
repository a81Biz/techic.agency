// src/models/mdx.model.ts

/**
 * Metadatos que exporta cada archivo MDX como `export const meta = {...}`
 */
export interface MDXMeta {
  slug: string
  title: string
  date?: string
  excerpt?: string
  cover?: string
  tags?: string[]
  [key: string]: unknown
}
