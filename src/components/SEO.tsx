// src/components/SEO.tsx
import { useEffect } from 'react'
import type { SEOConfig } from '../models/seo.model'

// Alias simple para las props (podrías usar SEOConfig directamente)
type SEOProps = SEOConfig

export default function SEO({
  title,
  description,
  canonical,
  image,
  noIndex,
}: SEOProps) {
  useEffect(() => {

    if (title) {
      document.title = title
    }

    const setMeta = (name: string, content?: string) => {
      if (!content) return
      let el = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`
      )
      if (!el) {
        el = document.createElement('meta')
        el.name = name
        document.head.appendChild(el)
      }
      el.content = content
    }

    const setProperty = (property: string, content?: string) => {
      if (!content) return
      let el = document.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.content = content
    }

    // básicos
    setMeta('description', description)

    if (noIndex) {
      setMeta('robots', 'noindex,nofollow')
    }

    // Open Graph
    setProperty('og:title', title)
    setProperty('og:description', description)
    if (image) setProperty('og:image', image)

    // canonical
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]'
      )
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }
  }, [title, description, canonical, image, noIndex])

  return null
}
