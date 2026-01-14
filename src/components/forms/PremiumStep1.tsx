import styles from '../../styles/ContactForm.module.css'
import { useMemo, useState } from 'react'
import { PREMIUM_SAMPLES } from '../../lib/premiumModelForm/samplesCatalog'
import { SamplesModal } from './SamplesModal'

interface PremiumStep1Props {
  contentTypes: string[]
  limits: string[]
  limitsOther: string
  onToggleContentType: (value: string) => void
  onToggleLimit: (value: string) => void
  onChangeLimitsOther: (value: string) => void
}

const CONTENT_TYPE_OPTIONS = [
  'Fitness',
  'Elegante',
  'Sensual suave',
  'Lencería',
  'Lifestyle natural',
  'Artístico',
  'Cosplay',
  'Mezcla',
]

const LIMIT_OPTIONS = [
  'Solo fotos normales',
  'Sensual suave',
  'Lencería',
  'Implícito',
  'Nada explícito',
]

export function PremiumStep1(props: PremiumStep1Props) {
  const {
    contentTypes,
    limits,
    limitsOther,
    onToggleContentType,
    onToggleLimit,
    onChangeLimitsOther,
  } = props

  const [samplesKey, setSamplesKey] = useState<string | null>(null)
  const samplesEntry = useMemo(
    () => (samplesKey ? PREMIUM_SAMPLES[samplesKey] ?? null : null),
    [samplesKey]
  )

  return (
    <>
      <div className={styles.field}>
        <p className={styles.label}>¿Qué tipo de contenido te gustaría hacer?</p>
        <p className={styles.help}>Puedes elegir más de una opción.</p>

        {CONTENT_TYPE_OPTIONS.map((opt) => (
          <label key={opt} className={styles.optionRow}>
            <span className={styles.optionRowMain}>
              <input
                type="checkbox"
                value={opt}
                checked={contentTypes.includes(opt)}
                onChange={() => onToggleContentType(opt)}
              />
              <span>{opt}</span>
            </span>

            {PREMIUM_SAMPLES[opt] ? (
              <button
                type="button"
                className={styles.samplesBtn}
                onClick={(e) => {
                  // Evita togglear el checkbox por el click dentro del <label>
                  e.preventDefault()
                  e.stopPropagation()
                  setSamplesKey(opt)
                }}
              >
                ?
              </button>
            ) : null}
          </label>
        ))}
      </div>

      <div className={styles.field}>
        <p className={styles.label}>¿Cuáles serían tus límites?</p>

        {LIMIT_OPTIONS.map((opt) => (
          <label key={opt} className={styles.optionRow}>
            <span className={styles.optionRowMain}>
              <input
                type="checkbox"
                value={opt}
                checked={limits.includes(opt)}
                onChange={() => onToggleLimit(opt)}
              />
              <span>{opt}</span>
            </span>

            {PREMIUM_SAMPLES[opt] ? (
              <button
                type="button"
                className={styles.samplesBtn}
                onClick={(e) => {
                  // Evita togglear el checkbox por el click dentro del <label>
                  e.preventDefault()
                  e.stopPropagation()
                  setSamplesKey(opt)
                }}
              >
                ?
              </button>
            ) : null}

          </label>
        ))}

        <label className={styles.label}>
          Otro límite que quieras agregar
          <input
            className={styles.input}
            type="text"
            placeholder="Ej. No mostrar rostro…"
            value={limitsOther}
            onChange={(e) => onChangeLimitsOther(e.target.value)}
          />
        </label>
      </div>

      <SamplesModal
        open={!!samplesKey}
        onClose={() => setSamplesKey(null)}
        entry={samplesEntry}
      />
    </>
  )
}
