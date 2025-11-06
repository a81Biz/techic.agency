import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import s from '../styles/Header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.link} ${s.active}` : s.link

  return (
    <header className={s.wrap} role="banner">
      {/* Marca: versión larga y corta */}
      <Link to="/" className={s.brand} aria-label="TECHIC" onClick={closeMenu}>
        <span className={s.brandFull}> TECHIC </span>
        <span className={s.brandShort}>T</span>
      </Link>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        type="button"
        className={`${s.menuToggle} ${isOpen ? s.menuToggleOpen : ''}`}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span />
        <span />
      </button>

      {/* Navegación principal */}
      <nav
        className={`${s.nav} ${isOpen ? s.navOpen : ''}`}
        aria-label="Principal"
      >
        <NavLink className={linkClass} to="/" onClick={closeMenu}>
          Inicio
        </NavLink>
        <NavLink className={linkClass} to="/services" onClick={closeMenu}>
          Servicios
        </NavLink>
        <NavLink className={linkClass} to="/work" onClick={closeMenu}>
          Portafolio
        </NavLink>
        <NavLink className={linkClass} to="/blog" onClick={closeMenu}>
          Blog
        </NavLink>
        <NavLink className={linkClass} to="/contact" onClick={closeMenu}>
          Contacto
        </NavLink>
        <NavLink className={linkClass} to="/calls" onClick={closeMenu}>
          Convocatorias
        </NavLink>
      </nav>

      <span className={s.srOnly}>Navegación principal</span>
    </header>
  )
}
