import { useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import SEO from '../components/SEO'
import ProjectHeader from '../components/ProjectHeader'
import ProjectMeta from '../components/ProjectMeta'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <>
        <SEO title="Proyecto no encontrado — TECHIC" noindex />
        <div style={{padding:'72px 24px'}}>Proyecto no encontrado.</div>
      </>
    )
  }

  const url = window.location.href
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.excerpt,
    "image": `./assets/${project.og}`,
    "url": url
  }

  return (
    <>
      <SEO
        title={`${project.title} — TECHIC`}
        description={project.excerpt}
        image={`./assets/${project.og}`}
        url={url}
        canonical={url}
        jsonLd={jsonLd}
      />
      <article style={{padding:'72px 24px', maxWidth: '900px', margin: '0 auto'}} className="fade-in">
        <ProjectHeader title={project.title} excerpt={project.excerpt} cover={project.cover} />
        <ProjectMeta kpis={project.kpis} />
        <section style={{marginTop:'24px'}}>
          {project.body.map((p, i) => <p key={i} style={{margin:'0 0 12px'}}>{p}</p>)}
        </section>
      </article>
    </>
  )
}
