// src/models/seo.model.ts

export interface SEOConfig {
  title: string               // <title>
  description?: string        // meta description
  canonical?: string          // canonical URL absoluta (opcional)
  image?: string              // para og:image / twitter:image
  noIndex?: boolean           // true => noindex,nofollow
}

/**
 * Campos opcionales que puede añadir cada MDX en meta
 * para ajustar su SEO específico.
 */
export interface SEOOverrides {
  seoTitle?: string
  seoDescription?: string
  seoImage?: string
  seoNoIndex?: boolean
}
