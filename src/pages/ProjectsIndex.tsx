import SEO from '../components/SEO'
import ProjectsGrid from '../components/ProjectsGrid'

export default function ProjectsIndex() {
  const url = window.location.href
  return (
    <>
      <SEO title="Projects — TECHIC" description="Trabajos y casos de estudio seleccionados." url={url} canonical={url} />
      <ProjectsGrid />
    </>
  )
}
