import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ServiceCards from '../components/ServiceCards'
import ProjectsGrid from '../components/ProjectsGrid'
import CallTeasers from '../components/CallTeasers'

export default function Home() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TECHIC",
    "url": window.location.origin,
    "email": "hello@techic.agency",
    "sameAs": [
      "https://instagram.com",
      "https://tiktok.com",
      "https://youtube.com",
      "https://linkedin.com"
    ]
  }

  const url = window.location.href

  return (
    <>
      <SEO
        title="TECHIC — Where skill becomes art"
        description="Producción creativa y dirección visual para marcas, artistas y creadores."
        url={url}
        canonical={url}
        jsonLd={orgJsonLd}
      />
      <Hero />
      <ServiceCards />
      <ProjectsGrid limit={3} />
      <CallTeasers />
    </>
  )
}
