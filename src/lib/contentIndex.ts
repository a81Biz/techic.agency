import type { MDXMeta } from '../models/mdx.model'
import type {
  SectionKey,
  BaseMeta,
  WithComponent,
  Teaser,
} from '../models/content.model'

/**
 * Carga TODOS los MDX dentro de content/<section>/*.mdx
 * sin necesidad de declarar las secciones una por una.
 *
 * Ejemplos de rutas:
 *  - ../../content/blog/2025-11-01-algo.mdx
 *  - ../../content/projects/2025-10-28-proyecto-a.mdx
 */
const mdxModules = import.meta.glob('../../content/*/*.{md,mdx}', {
  eager: true,
}) as Record<
  string,
  { default: WithComponent<BaseMeta>['Component']; meta: MDXMeta }
>

/**
 * Mapa de secciones -> lista de entradas con Component + meta.
 * Las claves son los nombres de carpeta bajo /content:
 *
 *  content/blog/...      -> "blog"
 *  content/projects/...  -> "projects"
 *  content/calls/...     -> "calls"
 *  content/services/...  -> "services"
 *  content/contact/...   -> "contact"
 *  etc.
 */
export const Content: Record<SectionKey, Array<WithComponent<BaseMeta>>> = {}

/**
 * Construimos Content agrupando por nombre de carpeta.
 */
for (const [path, mod] of Object.entries(mdxModules)) {
  // path típico: ../../content/blog/2025-11-01-algo.mdx
  const parts = path.split('/')
  // penúltimo segmento = nombre de carpeta: blog, projects, calls, etc.
  const section = parts[parts.length - 2] as SectionKey

  const entry: WithComponent<BaseMeta> = {
    ...(mod.meta as MDXMeta),
    Component: mod.default,
  }

  if (!Content[section]) {
    Content[section] = []
  }
  Content[section].push(entry)
}

/**
 * Ordenamos cada sección por fecha DESC si existe `date`
 */
for (const section of Object.keys(Content)) {
  Content[section].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

/**
 * Teasers (para Home / listados).
 *
 * Ahora `section` es simplemente un string (SectionKey dinámico),
 * y no necesitas modificar este archivo al agregar nuevas carpetas
 * dentro de /content.
 */
export function getTeasers(section: SectionKey, limit?: number): Teaser[] {
  const src = Content[section] ?? []
  const list = typeof limit === 'number' ? src.slice(0, limit) : src

  return list.map(item => ({
    section,
    slug: item.slug,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    cover: item.cover,
  }))
}
