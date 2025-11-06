import s from '../styles/Hero.module.css'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className={`${s.wrap} fade-in`} aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title" className={s.h1}>Where skill becomes art.</h1>
        <p className={s.p}>Producción creativa y dirección visual para marcas, artistas y creadores.</p>
        <Link to="/calls" className={`${s.cta} btn btn-primary`} aria-label="Ir a convocatorias">Trabaja con nosotros</Link>
      </div>
    </section>
  )
}
