import s from './ProjectsGrid.module.css'
import ProjectCard from './ProjectCard'
import projects from '../data/projects.json'

export default function ProjectsGrid({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects
  return (
    <section className={`${s.section} fade-in`} aria-labelledby="projects-title">
      <h2 id="projects-title" className={s.h2}>Proyectos</h2>
      <div className={s.grid}>
        {items.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
