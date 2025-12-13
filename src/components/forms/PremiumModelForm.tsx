// src/components/forms/PremiumModelForm.tsx
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/ContactForm.module.css'
import { readOkAndError } from '../../lib/http'
import {
  buildPremiumSummary,
  type PremiumProfileData,
} from '../../lib/premiumModelForm/summary'
import {
  mergeFiles,
  validateFilesCount,
  appendFilesToFormData,
} from '../../lib/premiumModelForm/files'

import { validateNameAndEmail } from '../../lib/premiumModelForm/validation'

import { PremiumStep1 } from './PremiumStep1'
import { PremiumStep2 } from './PremiumStep2'
import { PremiumStep3 } from './PremiumStep3'
import { PremiumStep4 } from './PremiumStep4'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Step = 1 | 2 | 3 | 4

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; theme?: string }
      ) => string
      reset?: (widgetId?: string) => void
    }
  }
}

export default function PremiumModelForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [step, setStep] = useState<Step>(1)
  const [turnstileReady, setTurnstileReady] = useState(false)

  // Estado del formulario (datos de negocio)
  const [contentTypes, setContentTypes] = useState<string[]>([])
  const [limits, setLimits] = useState<string[]>([])
  const [limitsOther, setLimitsOther] = useState<string>('')
  const [availability, setAvailability] = useState<string>('')
  const [workModel, setWorkModel] = useState<string>('')
  const [goalMonthly, setGoalMonthly] = useState<string>('')
  const [goalCurrency, setGoalCurrency] = useState<'MXN' | 'USD'>('MXN')
  const [visualStyle, setVisualStyle] = useState<string[]>([])

  // WhatsApp / Tel
  const [whatsapp, setWhatsapp] = useState<string>('')

  // Fotos subidas (mínimo 3, máximo 5)
  const [files, setFiles] = useState<File[]>([])

  // Resumen
  const [summary, setSummary] = useState<string>('')

  const formRef = useRef<HTMLFormElement | null>(null)

  // === TURNSTILE ===
  useEffect(() => {
    let cancelled = false

    const renderTurnstile = () => {
      if (cancelled) return

      if (!window.turnstile) {
        setTimeout(renderTurnstile, 300)
        return
      }

      const container = document.getElementById('premium-turnstile')
      if (!container) {
        setTimeout(renderTurnstile, 300)
        return
      }

      window.turnstile.render(container, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        theme: 'dark',
      })

      setTurnstileReady(true)
    }

    renderTurnstile()

    return () => {
      cancelled = true
    }
  }, [])

  // === HELPERS ===
  const toggleInArray = (
    value: string,
    current: string[],
    setter: (next: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    )
  }

  const getProfileData = (): PremiumProfileData => ({
    contentTypes,
    limits,
    limitsOther,
    availability,
    workModel,
    goalMonthly,
    goalCurrency,
    visualStyle,
    whatsapp,
  })

  const buildSummaryFromState = () => {
    const data = getProfileData()
    const resumen = buildPremiumSummary(data)
    setSummary(resumen)
  }

  // Recalcular resumen al entrar al paso 4
  useEffect(() => {
    if (step === 4) {
      buildSummaryFromState()
    }
  }, [step])

  // === MANEJO DE FOTOS ===
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    if (!selected.length) return

    setFiles((prev) => mergeFiles(prev, selected))
    e.target.value = ''
  }

  const removeFileAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // === NAVEGACIÓN ===
  const goNext = () => {
    setErrorMessage(null)
    setStatus('idle')
    setStep((prev) => Math.min(prev + 1, 4) as Step)
  }

  const goPrev = () => {
    setErrorMessage(null)
    setStatus('idle')
    setStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  // === SUBMIT ===
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Honeypot
    const website = formData.get('website')
    if (website) {
      setStatus('error')
      setErrorMessage('Algo salió mal.')
      return
    }

    // Validar nombre/correo
    const name = formData.get('name')?.toString() || ''
    const email = formData.get('email')?.toString() || ''
    const nameEmailError = validateNameAndEmail(name, email)
    if (nameEmailError) {
      setStatus('error')
      setErrorMessage(nameEmailError)
      return
    }

    // Validar fotos
    const filesError = validateFilesCount(files)
    if (filesError) {
      setStatus('error')
      setErrorMessage(filesError)
      return
    }

    // Datos adicionales
    if (whatsapp.trim()) formData.set('whatsapp', whatsapp.trim())

    formData.set('projectType', 'Modelo premium')
    formData.set('pageUrl', window.location.href)
    formData.set('message', summary)
    formData.set("formKind", "premium_model");
    formData.set("whatsapp", whatsapp);
    formData.set("availability", availability);
    formData.set("workModel", workModel);
    formData.set("goalMonthly", goalMonthly);
    formData.set("goalCurrency", goalCurrency);
    formData.set("limits", limits.join(", "));
    formData.set("contentType", JSON.stringify(contentTypes));
    formData.set("visualStyle", visualStyle.join(", "));


    // Reemplazar files
    appendFilesToFormData(formData, files)

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      const data: unknown = await res.json().catch(() => null)

      const { ok, error } = readOkAndError(data)
      if (!res.ok || !ok) throw new Error(error || 'Error al enviar el formulario.')

      setStatus('success')
      form.reset()
      setStep(1)
      setFiles([])
      setSummary('')
      setWhatsapp('')
      setContentTypes([])
      setLimits([])
      setLimitsOther('')
      setAvailability('')
      setWorkModel('')
      setGoalMonthly('')
      setGoalCurrency('MXN')
      setVisualStyle([])

      if (window.turnstile?.reset) window.turnstile.reset()
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error desconocido al enviar el formulario.'

      setStatus('error')
      setErrorMessage(message)
    }
  }

  // === RENDER ===
  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot */}
      <div className={styles.honeypot}>
        <label>
          No llenar este campo
          <input type="text" name="website" autoComplete="off" />
        </label>
      </div>

      <p className={styles.label}>
        Paso {step} de 4 — Formulario para modelos premium 💎
      </p>

      {/* ==================== PASO 1 ==================== */}
      {step === 1 && (
        <PremiumStep1
          contentTypes={contentTypes}
          limits={limits}
          limitsOther={limitsOther}
          onToggleContentType={(opt) =>
            toggleInArray(opt, contentTypes, setContentTypes)
          }
          onToggleLimit={(opt) => toggleInArray(opt, limits, setLimits)}
          onChangeLimitsOther={setLimitsOther}
        />
      )}

      {/* ==================== PASO 2 ==================== */}
      {step === 2 && (
        <PremiumStep2
          availability={availability}
          workModel={workModel}
          goalMonthly={goalMonthly}
          goalCurrency={goalCurrency}
          onChangeAvailability={setAvailability}
          onChangeWorkModel={setWorkModel}
          onChangeGoalMonthly={setGoalMonthly}
          onChangeGoalCurrency={(val) =>
            setGoalCurrency(val === 'USD' ? 'USD' : 'MXN')
          }
        />
      )}

      {/* ==================== PASO 3 ==================== */}
      {step === 3 && (
        <PremiumStep3
          visualStyle={visualStyle}
          onToggleVisualStyle={(opt) =>
            toggleInArray(opt, visualStyle, setVisualStyle)
          }
        />
      )}

      {/* ==================== PASO 4 ==================== */}
      {step === 4 && (
        <PremiumStep4
          summary={summary}
          whatsapp={whatsapp}
          files={files}
          turnstileReady={turnstileReady}
          onChangeWhatsapp={setWhatsapp}
          onFilesChange={handleFilesChange}
          onRemoveFile={removeFileAt}
        />
      )}

      {/* Navegación */}
      <div className={styles.actionsRow}>
        {step > 1 && (
          <button
            type="button"
            className={styles.secondary}
            onClick={goPrev}
            disabled={status === 'loading'}
          >
            Atrás
          </button>
        )}

        {step < 4 && (
          <button
            type="button"
            className={styles.next}
            onClick={goNext}
            disabled={status === 'loading'}
          >
            Siguiente
          </button>
        )}

        {step === 4 && (
          <button
            type="submit"
            className={styles.submit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Enviando…' : 'Enviar formulario'}
          </button>
        )}
      </div>

      {status === 'success' && (
        <p className={`${styles.status} ${styles.statusOk}`}>
          Gracias 💛 Recibimos tu info. Te escribo pronto con tu plan.
        </p>
      )}

      {status === 'error' && (
        <p className={`${styles.status} ${styles.statusError}`}>
          {errorMessage || 'Ocurrió un error.'}
        </p>
      )}
    </form>
  )
}
