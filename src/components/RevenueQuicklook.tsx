export default function RevenueQuicklook({
  price = 200, subs = 100, ppv = 120, ppvBuyRate = 0.25
}: { price?: number; subs?: number; ppv?: number; ppvBuyRate?: number }) {
  const mrr = subs * price
  const ppvRev = Math.round(subs * ppvBuyRate * ppv)
  const total = mrr + ppvRev
  return (
    <div style={{margin:'16px 0', padding:'12px', border:'1px solid var(--line)', borderRadius:'8px'}}>
      <strong>Proyección rápida:</strong> Suscriptores {subs} × ${price} ≈ ${mrr.toLocaleString()} + PPV ≈ ${ppvRev.toLocaleString()} → <strong>Total ≈ ${total.toLocaleString()} MXN/mes</strong>
    </div>
  )
}
