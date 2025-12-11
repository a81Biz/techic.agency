import { Link } from 'react-router-dom'
import { Instagram, Youtube, Linkedin, Music2 } from 'lucide-react'
import s from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.wrap}>
      {/* Redes sociales */}
      <div className={s.social} role="list" aria-label="Redes sociales">
        <a role="listitem"
          className={s.iconLink}
          href="https://www.instagram.com/techic.agency/"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram className={s.icon} />
        </a>
        <a role="listitem"
          className={s.iconLink}
          href="https://www.tiktok.com/@techic.agency"
          aria-label="TikTok"
          target="_blank"
          rel="noreferrer"
        >
          <Music2 className={s.icon} />
        </a>
        <a role="listitem"
          className={s.iconLink}
          href="https://www.youtube.com/@Techic.Agency"
          aria-label="YouTube"
          target="_blank"
          rel="noreferrer"
        >
          <Youtube className={s.icon} />
        </a>
        <a role="listitem"
          className={s.iconLink}
          href="https://www.linkedin.com/company/techic-agency/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className={s.icon} />
        </a>
      </div>

      {/* Enlaces legales */}
      <nav className={s.legal} aria-label="Enlaces legales">
        <Link to="/legal/terminos-condiciones" className={s.legalLink}>
          Términos y condiciones
        </Link>
        <Link to="/legal/aviso-privacidad" className={s.legalLink}>
          Aviso de privacidad
        </Link>
        <Link to="/legal/aviso-cookies" className={s.legalLink}>
          Aviso de cookies
        </Link>
      </nav>

      <a className={s.mail} href="mailto:hello@techic.agency">
        hello@techic.agency
      </a>

      <div className={s.copy}>
        © {new Date().getFullYear()} TECHIC — All rights reserved.
      </div>
    </footer>
  )
}
