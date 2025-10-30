import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.wrap}>
      <div className={s.social} role="list" aria-label="Redes sociales">
        <a className={s.a} href="https://www.instagram.com/techic.agency/" aria-label="Instagram" target="_blank" rel="noreferrer">Instagram</a>
        <a className={s.a} href="https://www.tiktok.com/@techic.agency" aria-label="TikTok" target="_blank" rel="noreferrer">TikTok</a>
        <a className={s.a} href="https://www.youtube.com/@Techic.Agency" aria-label="YouTube" target="_blank" rel="noreferrer">YouTube</a>
        <a className={s.a} href="https://www.linkedin.com/company/techic-agency/" aria-label="LinkedIn" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <a className={s.mail} href="mailto:hello@techic.agency">hello@techic.agency</a>
      <div className={s.copy}>© {new Date().getFullYear()} TECHIC — All rights reserved.</div>
    </footer>
  )
}
