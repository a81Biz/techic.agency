import { useEffect, useMemo, useState } from 'react'
import styles from '../../styles/ContactForm.module.css'
import type { SamplesEntry } from '../../lib/premiumModelForm/samplesCatalog'

type Props = {
  open: boolean
  onClose: () => void
  entry: SamplesEntry | null
}

export function SamplesModal({ open, onClose, entry }: Props) {
  const [active, setActive] = useState(0)

  // Reset índice cuando cambia el contenido
  useEffect(() => {
    if (open) setActive(0)
  }, [open, entry?.title])

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const images = entry?.images ?? []

  const safeActive = useMemo(() => {
    if (!images.length) return 0
    return Math.max(0, Math.min(active, images.length - 1))
  }, [active, images.length])

  if (!open || !entry) return null

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label={`Ejemplos: ${entry.title}`}>
      <div className={styles.modalContainer}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Cerrar ejemplos"
        >
          ✕
        </button>

        <h3 className={styles.modalTitle}>Ejemplos — {entry.title}</h3>
        {entry.description ? <p className={styles.modalIntro}>{entry.description}</p> : null}

        <div className={styles.modalBody}>
          {images.length ? (
            <>
              <img
                className={styles.samplesHero}
                src={images[safeActive].src}
                alt={images[safeActive].alt}
                loading="eager"
              />

              {images.length > 1 ? (
                <div className={styles.samplesThumbs}>
                  {images.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      className={idx === safeActive ? styles.samplesThumbActive : styles.samplesThumb}
                      onClick={() => setActive(idx)}
                      aria-label={`Ver ejemplo ${idx + 1}`}
                    >
                      <img src={img.src} alt={img.alt} loading="lazy" />
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className={styles.modalIntro}>Aún no hay imágenes cargadas para esta categoría.</p>
          )}
        </div>
      </div>
    </div>
  )
}
