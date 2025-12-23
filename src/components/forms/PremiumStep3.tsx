import styles from '../../styles/ContactForm.module.css'
import { useMemo, useState } from 'react'
import { PREMIUM_SAMPLES } from '../../lib/premiumModelForm/samplesCatalog'
import { SamplesModal } from './SamplesModal'
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

  const [samplesKey, setSamplesKey] = useState<string | null>(null)
  const samplesEntry = useMemo(
    () => (samplesKey ? PREMIUM_SAMPLES[samplesKey] ?? null : null),
    [samplesKey]
  )

  return (
    <div className={styles.field}>
      <p className={styles.label}>Preferencia visual</p>

      {VISUAL_STYLE_OPTIONS.map((opt) => (
        <label key={opt} className={styles.optionRow}>
          <span className={styles.optionRowMain}>
            <input
              type="checkbox"
              value={opt}
              checked={visualStyle.includes(opt)}
              onChange={() => onToggleVisualStyle(opt)}
            />
            <span>{opt}</span>
          </span>

          {PREMIUM_SAMPLES[opt] ? (
            <button
              type="button"
              className={styles.samplesBtn}
              onClick={(e) => {
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

      <SamplesModal
        open={!!samplesKey}
        onClose={() => setSamplesKey(null)}
        entry={samplesEntry}
      />
    </div>
  )
}
