export type InstagramStatus = 'idle' | 'checking' | 'ok' | 'error'

/**
 * Extrae/normaliza un username desde:
 * - "@usuario"
 * - "usuario"
 * - "instagram.com/usuario"
 * - "https://www.instagram.com/usuario/?hl=es"
 */
export function normalizeInstagram(raw: string): string {
  const input = raw.trim()
  if (!input) return ''

  // Si es URL o contiene dominio, intenta parsear
  const lowered = input.toLowerCase()

  // Caso: "instagram.com/usuario" sin protocolo
  const maybeUrl =
    lowered.startsWith('instagram.com/') || lowered.includes('instagram.com/')
      ? `https://${lowered.replace(/^https?:\/\//, '')}`
      : input

  try {
    const url = new URL(maybeUrl)
    // si es instagram.com, toma el primer segmento del path
    if (url.hostname.includes('instagram.com')) {
      const seg = url.pathname.split('/').filter(Boolean)[0] || ''
      return sanitizeUsername(seg)
    }
  } catch {
    // no era URL válida, seguimos
  }

  // Caso: @usuario o usuario
  return sanitizeUsername(input)
}

/**
 * Sanitiza a formato IG: solo [a-z0-9._], sin espacios, sin @, sin slashes.
 */
function sanitizeUsername(value: string): string {
  let u = value.trim().toLowerCase()

  // quitar @ iniciales
  u = u.replace(/^@+/, '')

  // cortar si pegaron "usuario/..." o "usuario?..."
  u = u.split('/')[0] || ''
  u = u.split('?')[0] || ''

  // solo caracteres permitidos (lo demás lo elimina)
  u = u.replace(/[^a-z0-9._]/g, '')

  // reglas básicas de longitud
  if (u.length < 1 || u.length > 30) return ''

  return u
}


/**
 * Llama al backend para validar si existe.
 * Backend devuelve: { ok: boolean, username?: string, status?: number, error?: string }
 */
export async function checkInstagramUsername(username: string): Promise<{ ok: boolean; reason?: string }> {
  if (!username) return { ok: false, reason: 'invalid' }

  const res = await fetch(`/api/check-instagram?username=${encodeURIComponent(username)}`)
  const data: unknown = await res.json().catch(() => null)

  if (!res.ok || typeof data !== 'object' || data === null) return { ok: false, reason: 'bad_response' }

  const record = data as Record<string, unknown>
  return {
    ok: record['ok'] === true,
    reason: typeof record['reason'] === 'string' ? record['reason'] : undefined,
  }
}
