import { Link } from 'react-router-dom'
import s from './ProjectCard.module.css'

type Project = {
  slug: string
  title: string
  excerpt: string
  kpis: string[]
  cover: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className={s.card} to={`/projects/${project.slug}`} aria-label={`Ver proyecto ${project.title}`}>
      <img
        className={s.img}
        src={`./assets/${project.cover}`}
        alt={`Cover del proyecto ${project.title}`}
        loading="lazy"
      />
      <div className={s.body}>
        <h3 className={s.title}>{project.title}</h3>
        <p className={s.excerpt}>{project.excerpt}</p>
        <div className={s.kpis} aria-label="Indicadores del proyecto">
          {project.kpis.map(k => <span className={s.pill} key={k}>{k}</span>)}
        </div>
      </div>
    </Link>
  )
}
