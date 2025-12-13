export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function readOkAndError(data: unknown): { ok: boolean; error?: string } {
  if (!isRecord(data)) return { ok: false }
  const ok = data['ok'] === true
  const error = typeof data['error'] === 'string' ? data['error'] : undefined
  return { ok, error }
}
