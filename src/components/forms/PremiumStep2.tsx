import type React from 'react'
import styles from '../../styles/ContactForm.module.css'

interface PremiumStep2Props {
  availability: string
  workModel: string
  goalMonthly: string
  goalCurrency: string
  onChangeAvailability: (value: string) => void
  onChangeWorkModel: (value: string) => void
  onChangeGoalMonthly: (value: string) => void
  onChangeGoalCurrency: (value: string) => void
}

export function PremiumStep2(props: PremiumStep2Props) {
  const {
    availability,
    workModel,
    goalMonthly,
    goalCurrency,
    onChangeAvailability,
    onChangeWorkModel,
    onChangeGoalMonthly,
    onChangeGoalCurrency,
  } = props

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChangeAvailability(e.target.value)
  }

  return (
    <>
      <div className={styles.field}>
        <p className={styles.label}>Disponibilidad</p>
        <p className={styles.help}>
          ¿Qué días te funcionan mejor para grabar/tomar fotos? ¿En qué horarios?
        </p>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="Ej. Entre semana por las tardes, fines de semana por la mañana…"
          value={availability}
          onChange={handleAvailabilityChange}
        />
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Forma de trabajo que prefieres</p>

        <label className={styles.optionCard}>
          <input
            type="radio"
            value="Tú creas tu contenido y yo te ayudo a crecer."
            checked={workModel === 'Tú creas tu contenido y yo te ayudo a crecer.'}
            onChange={(e) => onChangeWorkModel(e.target.value)}
          />
          <div>
            <strong>Tú creas tu contenido y yo te ayudo a crecer.</strong>
            <p className={styles.help}>Te apoyo con edición y estrategia.</p>
          </div>
        </label>

        <label className={styles.optionCard}>
          <input
            type="radio"
            value="Yo te llevo de la mano desde cero."
            checked={workModel === 'Yo te llevo de la mano desde cero.'}
            onChange={(e) => onChangeWorkModel(e.target.value)}
          />
          <div>
            <strong>Yo te llevo de la mano desde cero.</strong>
            <p className={styles.help}>Hago todo tu plan completo.</p>
          </div>
        </label>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Objetivo mensual</p>

        <div className={styles.inlineRow}>
          <span>$</span>
          <input
            className={styles.input}
            type="number"
            min={0}
            placeholder="Ej. 10,000"
            value={goalMonthly}
            onChange={(e) => onChangeGoalMonthly(e.target.value)}
          />

          <select
            className={styles.input}
            value={goalCurrency}
            onChange={(e) => onChangeGoalCurrency(e.target.value)}
          >
            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <p className={styles.help}>
          No es compromiso, solo para entender lo que te gustaría lograr si todo va bien.
        </p>
      </div>
    </>
  )
}
