import { Link } from 'react-router-dom'
import s from './CallTeasers.module.css'

export default function CallTeasers() {
  return (
    <section className={`${s.section} fade-in`} aria-labelledby="callteasers-title">
      <h2 id="callteasers-title" className={s.h2}>Convocatorias abiertas</h2>
      <div className={s.grid}>
        {/* Convocatoria General / TECHIC */}
        <article className={s.card} aria-label="Convocatoria general TECHIC">
          <header className={s.header}>
            <div className={s.badge}>General • TECHIC</div>
            <h3 className={s.title}>Colabora con la agencia</h3>
            <p className={s.excerpt}>
              Dirección creativa, producción audiovisual y storytelling con IA para proyectos artísticos y comerciales.
            </p>
          </header>
          <footer className={s.footer}>
            {/* Nota: con HashRouter el URL final será #/call#convocatoria-general (ver Call.tsx para el scroll) */}
            <Link to="/call?convocatoria-general" className={s.cta} aria-label="Ir a Convocatoria General">
              Ver detalles
            </Link>
          </footer>
        </article>

        {/* Convocatoria Modelos / Contenido Premium */}
        <article className={s.card} aria-label="Convocatoria modelos y creadores premium">
          <header className={s.header}>
            <div className={s.badge}>Premium • Modelos</div>
            <h3 className={s.title}>Modelos y creadores premium</h3>
            <p className={s.excerpt}>
            Para modelos y creadores — nuevos o activos — con dirección creativa, producción editorial/cine y estrategia para OnlyFans, Patreon, Fansly.
            </p>
          </header>
          <footer className={s.footer}>
            <Link to="/call?convocatoria-modelos" className={s.cta} aria-label="Ir a Convocatoria de Modelos">
              Ver detalles
            </Link>
          </footer>
        </article>
      </div>
    </section>
  )
}
