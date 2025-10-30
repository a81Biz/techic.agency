import { useRef, useState } from 'react'
import SEO from '../components/SEO'

export default function Contact() {
  const honeypot = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle')
  const [message, setMessage] = useState<string>('')

  // A) Google Forms (activo por simplicidad)
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdDF3HounfIpDLBTYeBI3U5M--2X-1LkLqHB97vbtIq-kXjiw/viewform?usp=publish-editor'

  // B) EmailJS (desactivado de inicio). Si lo usas:
  // 1) npm i emailjs-com
  // 2) descomenta import y onSubmit
  // import emailjs from '@emailjs/browser'
  // async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   if (honeypot.current?.value) return
  //   try {
  //     setStatus('loading')
  //     await emailjs.sendForm('<service_id>', '<template_id>', e.currentTarget, '<public_key>')
  //     setStatus('ok'); setMessage('Gracias, te contactamos en breve.')
  //     e.currentTarget.reset()
  //   } catch (err) {
  //     setStatus('error'); setMessage('Ocurrió un error. Intenta de nuevo.')
  //   }
  // }

  const url = window.location.href

  return (
    <>
      <SEO title="Contact — TECHIC" description="Hablemos de tu proyecto." url={url} canonical={url} />
      <main style={{padding:'72px 24px', maxWidth: 1100, margin: '0 auto'}} className="fade-in">
        <h1 style={{letterSpacing:'2px'}}>Contacto</h1>
        <p style={{color:'var(--text-2)'}}>Cuéntanos sobre tu marca, objetivos y tiempos. Te responderemos muy pronto.</p>

        {/* A) Google Forms embebido */}
        <div style={{position:'relative', paddingTop:'56.25%', marginTop:'16px', border:'1px solid var(--line)'}}>
          <iframe
            title="Formulario de contacto TECHIC"
            src={googleFormUrl}
            style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', border:0}}
            loading="lazy"
          ></iframe>
        </div>

        {/* B) EmailJS — ejemplo accesible
        <form onSubmit={onSubmit} style={{marginTop:'24px', display:'grid', gap:12}} aria-label="Formulario de contacto">
          <label>Nombre<input required name="name" aria-label="Nombre" /></label>
          <label>Email<input required type="email" name="email" aria-label="Email" /></label>
          <label>Mensaje<textarea required name="message" rows={5} aria-label="Mensaje"></textarea></label>
          <input ref={honeypot} name="company" aria-hidden="true" tabIndex={-1} style={{position:'absolute', left:'-9999px'}} />
          <button disabled={status==='loading'}>Enviar</button>
          {status!=='idle' && <p role="status" aria-live="polite">{message}</p>}
        </form>
        */}
      </main>
    </>
  )
}
