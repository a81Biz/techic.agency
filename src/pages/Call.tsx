import SEO from '../components/SEO'
import '../styles/Call.css'
import RevenueQuicklook from '../components/RevenueQuicklook'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Call() {
    const { search } = useLocation()
    const url = window.location.href

    useEffect(() => {
    const params = new URLSearchParams(search)
    const section = params.get('section')
    if (section) {
        const el = document.getElementById(section)
        if (el) {
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 200)
        }
    }
    }, [search])

  return (
    <>
      <SEO
        title="Convocatorias — TECHIC"
        description="Convocatorias abiertas de la agencia TECHIC: colaboración creativa y modelos para contenido premium."
        url={url}
        canonical={url}
      />

      <main className="call-page fade-in">
        {/* 1️⃣ Convocatoria general/premium TECHIC */}
        <section className="call-block" id="convocatoria-general">
          <h1>🎬 Convocatoria General — Agencia TECHIC</h1>
          <p className="call-intro">
            TECHIC busca creadores de contenido, directores visuales, fotógrafos, editores y estrategas para colaborar en la producción de proyectos artísticos, comerciales y narrativos.
            Nuestro enfoque combina <strong>diseño, producción audiovisual</strong> e <strong>inteligencia artificial</strong> para desarrollar campañas de alto nivel.
          </p>

          <h2>Buscamos</h2>
          <ul>
            <li>Creadores que deseen colaborar en proyectos editoriales o audiovisuales.</li>
            <li>Fotógrafos, videógrafos, coloristas o diseñadores con visión estética.</li>
            <li>Guionistas y estrategas de contenido que dominen storytelling y redes.</li>
            <li>Artistas o marcas interesadas en dirección creativa profesional.</li>
          </ul>

          <h2>Proyectos en curso</h2>
          <ul>
            <li><strong>El Castillo Vagabundo</strong> — Podcast, cápsulas y storytelling cultural.</li>
            <li>Producciones piloto para creadores independientes y campañas editoriales.</li>
          </ul>

          <h2>Ofrecemos</h2>
          <ul>
            <li>Participación en proyectos reales con dirección creativa y asesoría IA.</li>
            <li>Créditos profesionales en publicaciones y portfolio compartido.</li>
            <li>Acceso a espacios de producción y red de colaboradores A81.</li>
          </ul>

          <p>
            📧 Envía tu perfil o portfolio a <a href="mailto:hello@techic.agency">hello@techic.agency</a>  
            <br/>📆 Recepción hasta <strong>15 de diciembre de 2025</strong>
          </p>

          <blockquote>🎥 «Donde la técnica se vuelve arte, nace TECHIC.»</blockquote>
        </section>

        {/* 2️⃣ Convocatoria para modelos y creadores de contenido premium */}
        <section className="call-block" id="convocatoria-modelos">
  <h1>💎 Convocatoria — Modelos y Creadores de Contenido Premium</h1>
  <p className="call-intro">
    TECHIC abre convocatoria para modelos, performers y artistas —tanto <strong>nuevos</strong> como
    <strong> con experiencia</strong>— que deseen construir o profesionalizar su presencia en plataformas como
    <strong> OnlyFans, Patreon, Fansly o Ko-fi</strong>, con dirección creativa, producción editorial/cinematográfica y estrategia de marca personal.
  </p>

  <h2>Buscamos</h2>
  <ul>
    <li>Personas sin experiencia previa que quieran lanzar su perfil con guía profesional.</li>
    <li>Creadores activos que deseen mejorar calidad, narrativa y monetización.</li>
    <li>Artistas interesados en identidad visual coherente (branding personal) y storytelling.</li>
  </ul>

  <h2>Ofrecemos</h2>
  <ul>
    <li>Dirección creativa personalizada (look, paleta, concepto, línea editorial).</li>
    <li>Producción de foto y video de estilo editorial/cine (plan de sesiones y calendarización).</li>
    <li>Estrategia de <strong>membresías y pay-per-view</strong>, cadencia de publicación y retención.</li>
    <li>Acompañamiento en canales seguros de cobro y cumplimiento de lineamientos de plataforma.</li>
  </ul>

  <h2>Anonimato y seguridad (opcional)</h2>
  <ul>
    <li>Diseño de <strong>anonimato visual</strong>: encuadres sin rostro, contraluz, cortes y composición.</li>
    <li>Accesorios: <strong>máscaras, antifaces</strong>, pelucas y estilismo para proteger identidad.</li>
    <li>Controles técnicos: <strong>desenfoque selectivo</strong> y bloqueo de <strong>metadatos EXIF</strong> en entrega.</li>
  </ul>

  <h2>Precios sugeridos y proyección de ingresos</h2>
  <p className="call-intro">
    Estos rangos son orientativos; definimos el precio final según tu perfil, contenido y objetivos.
  </p>

  <div style={{overflowX:'auto'}}>
    <table style={{width:'100%', borderCollapse:'collapse', border:'1px solid var(--line)'}}>
      <thead>
        <tr>
          <th style={{textAlign:'left', padding:'8px', borderBottom:'1px solid var(--line)'}}>Tipo de contenido</th>
          <th style={{textAlign:'left', padding:'8px', borderBottom:'1px solid var(--line)'}}>Tier membresía (MXN/mes)</th>
          <th style={{textAlign:'left', padding:'8px', borderBottom:'1px solid var(--line)'}}>Ticket PPV típico (MXN)</th>
          <th style={{textAlign:'left', padding:'8px', borderBottom:'1px solid var(--line)'}}>Ej. ingresos mensuales*</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>Soft (editorial/sensual)</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>120–220</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>80–150</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>100 suscrip. x $160 ≈ $16k + PPV</td>
        </tr>
        <tr>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>Fetiche (temático)</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>180–300</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>120–250</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>120 suscrip. x $240 ≈ $28.8k + PPV</td>
        </tr>
        <tr>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>Hard (adulto explícito)</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>240–420</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>180–400</td>
          <td style={{padding:'8px', borderBottom:'1px solid var(--line)'}}>150 suscrip. x $320 ≈ $48k + PPV</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/* Proyección base ejemplo: Fetiche medio */}
<RevenueQuicklook price={240} subs={120} ppv={180} ppvBuyRate={0.3} />
  <p style={{color:'var(--text-2)', fontSize:'.9rem', marginTop:'8px'}}>
    *Ejemplos ilustrativos. Ajustamos metas con base en tu nicho, frecuencia, bundles y promociones.
  </p>

  <h2>FAQ rápido</h2>
  <ul>
    <li><strong>¿Aceptan perfiles nuevos?</strong> Sí. Te guiamos desde naming, look & feel y primeras sesiones.</li>
    <li><strong>¿Puedo mantener anonimato?</strong> Sí. Definimos un plan de anonimato visual/técnico y entregas sin EXIF.</li>
    <li><strong>¿Quién define los precios?</strong> Proponemos un rango según tu propuesta; la decisión final es tuya.</li>
    <li><strong>¿Qué pasa con derechos y exclusividad?</strong> Negociamos caso a caso; por defecto, derechos de imagen tuyos.</li>
  </ul>

  <p>
    📧 Envía tu presentación o portfolio a <a href="mailto:premium@techic.agency">premium@techic.agency</a><br/>
    Indica si eres <strong>nuevo</strong> o <strong>activo</strong>, tu interés (soft/fetiche/hard) y disponibilidad.<br/>
    📆 Recepción abierta hasta <strong>15 de diciembre de 2025</strong>
  </p>

  <blockquote>💡 «Elevamos la imagen sin sacrificar tu autenticidad.»</blockquote>
</section>

      </main>
    </>
  )
}
