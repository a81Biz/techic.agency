import type { SectionKey } from './types/content'

export interface HomeBlock {
  section: SectionKey
  limit: 1 | 2 | 3
  title?: string
}

export const homeBlocks: HomeBlock[] = [
  { section: 'projects', limit: 3, title: 'Proyectos' },
  { section: 'blog',     limit: 3, title: 'Blog' },
  // { section: 'calls',    limit: 3, title: 'Convocatorias' },
  // { section: 'about',    limit: 1, title: 'Qué hacemos' },
]
