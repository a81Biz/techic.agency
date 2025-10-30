import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  const url = window.location.href
  return (
    <>
      <SEO title="404 — TECHIC" noindex url={url} />
      <main style={{display:'grid',placeItems:'center', minHeight:'60vh', padding:'24px'}} className="fade-in">
        <div style={{textAlign:'center'}}>
          <h1>404 — Página no encontrada</h1>
          <p style={{color:'var(--text-2)'}}>La ruta que buscas no existe.</p>
          <Link to="/" aria-label="Volver al inicio" style={{color:'var(--accent)'}}>Volver a Home</Link>
        </div>
      </main>
    </>
  )
}
