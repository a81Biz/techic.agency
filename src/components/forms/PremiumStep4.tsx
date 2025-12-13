import type React from 'react'
import styles from '../../styles/ContactForm.module.css'

interface PremiumStep4Props {
  summary: string
  whatsapp: string
  files: File[]
  turnstileReady: boolean
  // callbacks
  onChangeWhatsapp: (value: string) => void
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: (index: number) => void
}

export function PremiumStep4(props: PremiumStep4Props) {
  const {
    summary,
    whatsapp,
    files,
    turnstileReady,
    onChangeWhatsapp,
    onFilesChange,
    onRemoveFile,
  } = props

  return (
    <>
      <div className={styles.field}>
        <p className={styles.label}>Plan inicial de trabajo</p>
        <pre className={styles.summaryBox}>{summary}</pre>
        <textarea name="message" value={summary} hidden readOnly />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Nombre
          <input className={styles.input} type="text" name="name" />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Correo
          <input className={styles.input} type="email" name="email" />
        </label>
      </div>
      {/* WhatsApp */}
      <div className={styles.field}>
        <label className={styles.label}>
          WhatsApp o teléfono (opcional)
          <input
            className={styles.input}
            type="tel"
            placeholder="+52 55 1234 5678"
            value={whatsapp}
            onChange={(e) => onChangeWhatsapp(e.target.value)}
          />
        </label>
        <p className={styles.help}>
          A veces no llegan los correos. Si dejas tu WhatsApp, te aviso por ahí también.
        </p>
      </div>

      {/* Fotos 3–5 */}
      <div className={styles.field}>
        <label className={styles.label}>
          Fotos de referencia (3 a 5)
          <input
            className={styles.input}
            type="file"
            accept="image/*"
            multiple
            onChange={onFilesChange}
          />
        </label>

        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((file, i) => (
              <li key={i} className={styles.fileItem}>
                <span className={styles.fileName}>{file.name}</span>
                <button
                  type="button"
                  className={styles.fileRemove}
                  onClick={() => onRemoveFile(i)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.help}>
          {files.length === 0 && 'Sube entre 3 y 5 fotos.'}
          {files.length > 0 && files.length < 3 && `Llevas ${files.length}. Necesitas 3.`}
          {files.length >= 3 &&
            files.length <= 5 &&
            `Perfecto: ${files.length} fotos.`}
        </p>
      </div>

      {/* Turnstile */}
      <div className={styles.field}>
        <p className={styles.label}>Verificación</p>
        <div id="premium-turnstile" className={styles.turnstileBox}>
          {!turnstileReady && <p className={styles.help}>Cargando verificación…</p>}
        </div>
        <p className={styles.help}>
          Esto es solo para evitar spam, no afecta en nada tu información.
        </p>
      </div>
    </>
  )
}
