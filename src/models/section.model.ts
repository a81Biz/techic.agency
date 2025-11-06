// src/models/section.model.ts

import type { SectionKey } from './content.model'

/**
 * Forma del JSON que vive en content/<section>/section.json
 * (lo que edita la gente de contenido).
 */
export interface RawSectionConfig {
  id?: string          // opcional; si falta usamos el nombre de carpeta
  type: 'collection' | 'single'
  basePath: string
  listTitle: string
  pageTitle: string
  pageSubtitle?: string
  itemLabel: string
  enabled?: boolean
  showOnHome?: boolean
  homeLimit?: number
  place?: number
}

/**
 * Config normalizada que usa la app internamente.
 */
export interface SectionConfig extends RawSectionConfig {
  id: SectionKey
  enabled: boolean
  showOnHome: boolean
  homeLimit: number
  place: number
}
