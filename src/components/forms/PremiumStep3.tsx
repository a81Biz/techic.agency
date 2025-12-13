import styles from '../../styles/ContactForm.module.css'

interface PremiumStep3Props {
  visualStyle: string[]
  onToggleVisualStyle: (value: string) => void
}

const VISUAL_STYLE_OPTIONS = [
  'Naturales',
  'Elegantes',
  'Oscuras con sombras',
  'Tonos claros y suaves',
  'Deportivas',
  'Sensuales',
]

export function PremiumStep3(props: PremiumStep3Props) {
  const { visualStyle, onToggleVisualStyle } = props

  return (
    <div className={styles.field}>
      <p className={styles.label}>Preferencia visual</p>

      {VISUAL_STYLE_OPTIONS.map((opt) => (
        <label key={opt} className={styles.optionRow}>
          <input
            type="checkbox"
            value={opt}
            checked={visualStyle.includes(opt)}
            onChange={() => onToggleVisualStyle(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  )
}
