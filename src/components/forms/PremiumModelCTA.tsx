import { useState } from 'react'
import PremiumModelForm  from './PremiumModelForm'
import styles from '../../styles/ContactForm.module.css'

export function PremiumModelCTA() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón que se ve en el MDX */}
      <button
        type="button"
        className={styles.apply}
        onClick={() => setOpen(true)}
      >
        Me interesa, quiero postularme 💎
      </button>

      {open && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setOpen(false)}
              aria-label="Cerrar formulario"
            >
              ✕
            </button>

            <h2 className={styles.modalTitle}>Postulación modelo premium</h2>
            <p className={styles.modalIntro}>
              Tómate unos minutos para responder. Está pensado para hacerlo
              desde el celular, sin presión.
            </p>

            <div className={styles.modalBody}>
              <PremiumModelForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
