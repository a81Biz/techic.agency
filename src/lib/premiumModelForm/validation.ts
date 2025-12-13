/**
 * Valida nombre y correo.
 * Devuelve:
 *  - null si todo está correcto
 *  - mensaje de error si algo falla
 */
export function validateNameAndEmail(
  name: string,
  email: string
): string | null {
  const n = name.trim()
  const e = email.trim()

  if (!n) return 'Por favor escribe tu nombre.'
  if (!e) return 'Por favor escribe tu correo de contacto.'

  // Validación de formato de correo suficientemente estricta para este contexto
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(e)) {
    return 'Revisa que tu correo tenga un formato válido.'
  }

  return null
}
