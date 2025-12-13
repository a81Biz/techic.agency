import styles from '../../styles/ContactForm.module.css'

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

  return (
    <>
      <div className={styles.field}>
        <p className={styles.label}>¿Qué tipo de contenido te gustaría hacer?</p>
        <p className={styles.help}>Puedes elegir más de una opción.</p>

        {CONTENT_TYPE_OPTIONS.map((opt) => (
          <label key={opt} className={styles.optionRow}>
            <input
              type="checkbox"
              value={opt}
              checked={contentTypes.includes(opt)}
              onChange={() => onToggleContentType(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>

      <div className={styles.field}>
        <p className={styles.label}>¿Cuáles serían tus límites?</p>

        {LIMIT_OPTIONS.map((opt) => (
          <label key={opt} className={styles.optionRow}>
            <input
              type="checkbox"
              value={opt}
              checked={limits.includes(opt)}
              onChange={() => onToggleLimit(opt)}
            />
            <span>{opt}</span>
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
    </>
  )
}
