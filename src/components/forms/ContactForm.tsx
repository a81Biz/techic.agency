import { useState } from 'react'
import styles from '../../styles/ContactForm.module.css'

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // extra: página desde donde se manda
    formData.append("pageUrl", window.location.href);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Error al enviar el mensaje.");
      }

      setStatus("success");
      form.reset();
    } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido.";
    setStatus("error");
    setErrorMessage(message);
  }
  }

   return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot: bots tontos lo llenan, humanos no lo ven */}
      <div className={styles.honeypot}>
        <label>
          No llenar este campo
          <input type="text" name="website" autoComplete="off" />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Nombre
          <input className={styles.input} name="name" type="text" required />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Correo
          <input
            className={styles.input}
            name="email"
            type="email"
            required
          />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Tipo de proyecto
          <select
            className={styles.select}
            name="projectType"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="contenido">Proyecto de contenido</option>
            <option value="colaboracion">Colaboración / casting</option>
            <option value="asesoria">Asesoría técnica</option>
            <option value="otro">Otro</option>
          </select>
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Presupuesto (opcional)
          <input className={styles.input} name="budget" type="text" />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Mensaje
          <textarea
            className={styles.textarea}
            name="message"
            rows={5}
            required
          />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Código de convocatoria (opcional)
          <input className={styles.input} name="refCode" type="text" />
        </label>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          Adjuntar archivos (máx. 3)
          <input
            className={styles.input}
            name="files"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp"
          />
        </label>
      </div>

      {/* Turnstile: genera cf-turnstile-response dentro del form */}
      <div
        className={`cf-turnstile ${styles.turnstile}`}
        data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
        data-theme="dark"
      ></div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={styles.submit}
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      {status === 'success' && (
        <p className={`${styles.status} ${styles.statusOk}`}>
          Gracias, revisaremos tu mensaje y te contactaremos pronto.
        </p>
      )}
      {status === 'error' && (
        <p className={`${styles.status} ${styles.statusError}`}>
          {errorMessage || 'Ocurrió un error, inténtalo más tarde.'}
        </p>
      )}
    </form>
  )
}
