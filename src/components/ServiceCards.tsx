import s from './ServiceCards.module.css'

export default function ServiceCards() {
  return (
    <section className={`${s.section} fade-in`} aria-labelledby="services-title">
      <h2 id="services-title" className={s.h2}>Qué hacemos</h2>
      <div className={s.grid}>
        <article className={s.card} aria-label="Dirección Creativa">
          <div className={s.icon} aria-hidden>◊</div>
          <h3 className={s.title}>Dirección Creativa</h3>
          <p className={s.p}>Concepto, look & feel y encuadre narrativo para campañas editoriales.</p>
        </article>
        <article className={s.card} aria-label="Producción Audiovisual">
          <div className={s.icon} aria-hidden>◐</div>
          <h3 className={s.title}>Producción Audiovisual</h3>
          <p className={s.p}>De la historia a la imagen con técnica y oficio. Cada frame cuenta.</p>
        </article>
        <article className={s.card} aria-label="Estrategia de Contenido">
          <div className={s.icon} aria-hidden>◈</div>
          <h3 className={s.title}>Estrategia de Contenido</h3>
          <p className={s.p}>Plan editorial, pilares y métricas para escalar presencia y comunidad.</p>
        </article>
      </div>
    </section>
  )
}
