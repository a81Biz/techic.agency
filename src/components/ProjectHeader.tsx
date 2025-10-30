export default function ProjectHeader({ title, excerpt, cover }: { title:string; excerpt:string; cover:string }) {
  return (
    <header>
      <h1 style={{letterSpacing:'2px'}}>{title}</h1>
      <p style={{color:'var(--text-2)'}}>{excerpt}</p>
      <img
        src={`./assets/${cover}`}
        alt={`Imagen de cabecera del proyecto ${title}`}
        loading="lazy"
        style={{width:'100%', borderRadius:'12px', margin:'16px 0'}}
      />
    </header>
  )
}
