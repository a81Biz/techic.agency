// src/components/ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // si no es un anchor interno, sube al inicio
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto', // puedes poner 'smooth' si lo quieres animado
      })
    }
  }, [pathname, hash])

  return null
}
