export default function ProjectMeta({ kpis }: { kpis:string[] }) {
  return (
    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
      {kpis.map(k => (
        <span key={k} style={{border:'1px solid var(--line)', color:'var(--text-2)', padding:'2px 8px', borderRadius:'999px', fontSize:'.85rem'}}>{k}</span>
      ))}
    </div>
  )
}
