import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

export default function Header() {
  return (
    <header className={s.wrap} role="banner">
      <div className={s.brand} aria-label="TECHIC">TECHIC</div>
      <nav className={s.nav} aria-label="Principal">
        <NavLink className={({isActive}) => isActive ? `${s.link} ${s.active}` : s.link} to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? `${s.link} ${s.active}` : s.link} to="/projects">Projects</NavLink>
        <NavLink className={({isActive}) => isActive ? `${s.link} ${s.active}` : s.link} to="/contact">Contact</NavLink>
        <NavLink to="/call" className={({isActive}) => isActive ? `${s.link} ${s.active}` : s.link}>Convocatorias</NavLink>
      </nav>
      <span className={s.srOnly}>Navegación principal</span>
    </header>
  )
}
