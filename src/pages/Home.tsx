import SEO from '../components/SEO'
import Hero from '../components/Hero'
import HomeBlocks from '../components/HomeBlocks'
import { buildSEOForHome } from '../lib/seo'
import heroStyles from '../styles/Hero.module.css'

export default function Home() {
  const seo = buildSEOForHome()


  return (
    <main className="home">
      <SEO {...seo} />
      <section className={heroStyles.hero}>
        <Hero />
      </section>
      <section className="home-blocks">
          <HomeBlocks />
      </section>
    </main>
  )
}
