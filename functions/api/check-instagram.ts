interface Env {
  ALLOWED_ORIGIN?: string
}

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

function corsHeaders(origin: string | null, allowedOrigin?: string) {
  const okOrigin =
    !allowedOrigin || (origin && origin === allowedOrigin) ? origin : allowedOrigin

  const allow = okOrigin || origin || '*'

  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  } as const
}

function sanitizeUsername(value: string): string {
  let u = value.trim().toLowerCase()
  u = u.replace(/^@+/, '')
  u = u.split('/')[0] || ''
  u = u.split('?')[0] || ''
  u = u.replace(/[^a-z0-9._]/g, '')
  if (u.length < 1 || u.length > 30) return ''
  return u
}

/**
 * Heurística basada en HTML.
 * Instagram puede devolver 200 para:
 * - usuario inexistente (mensaje “page isn’t available”)
 * - login wall
 * - usuario existente
 */
function detectInstagramPage(html: string): { ok: boolean; reason: string } {
  const h = html.toLowerCase()

  // 1) Señales de "página no disponible" (texto)
  const notFoundSignals = [
    "sorry, this page isn't available",
    'the link you followed may be broken',
    'page not found',
    'página no disponible',
    'esta página no está disponible',
    'puede que el enlace que has seguido esté roto',
    'no se ha encontrado la página',
  ]

  if (notFoundSignals.some((s) => h.includes(s))) {
    return { ok: false, reason: 'not_found_text' }
  }

  // 2) Señal fuerte por SVG / iconografía de error
  // Buscamos combinaciones típicas:
  // - aria-label="Error"
  // - <title>Error</title> o title="Error"
  // Nota: normalizamos a lower-case arriba.
  const hasErrorAria = h.includes('aria-label="error"') || h.includes("aria-label='error'")
  const hasErrorTitle =
    h.includes('<title>error</title>') ||
    h.includes('title="error"') ||
    h.includes("title='error'")

  // Además, amarramos a que sea un <svg ...> para evitar falsos positivos.
  const hasSvgNearError =
    h.includes('<svg') && (hasErrorAria || hasErrorTitle)

  if (hasSvgNearError && hasErrorAria && hasErrorTitle) {
      console.log(hasSvgNearError , hasErrorAria , hasErrorTitle);
    return { ok: false, reason: 'not_found_svg_error' }
  }

  // 3) Login wall (muy común)
  const likelyLoginWall =
    h.includes('accounts/login') ||
    (h.includes('log in') && h.includes('instagram')) ||
    (h.includes('inicia sesión') && h.includes('instagram'))

  if (likelyLoginWall) {
    // Aquí es donde quieres asumir existencia si no vimos error:
    // lo devolvemos como ok: true pero con reason explícito.
    return { ok: true, reason: 'assumed_exists_login_wall' }
  }

  // 4) Señales típicas de perfil “real”
  const profileSignals = [
    'profilepage_',
    'og:type" content="profile"',
  ]

  if (profileSignals.some((s) => h.includes(s))) {
    console.log('detec')
    return { ok: true, reason: 'profile_detected' }
  }

  return { ok: false, reason: 'unknown' }
}


export const onRequestOptions: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get('Origin')
  return json({ ok: true }, 204, corsHeaders(origin, context.env.ALLOWED_ORIGIN))
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get('Origin')

  if (context.env.ALLOWED_ORIGIN && origin !== context.env.ALLOWED_ORIGIN) {
    return json(
      { ok: false, error: 'Origin no permitido' },
      403,
      corsHeaders(origin, context.env.ALLOWED_ORIGIN)
    )
  }

  const url = new URL(context.request.url)
  const raw = url.searchParams.get('username') || ''
  const username = sanitizeUsername(raw)

  if (!username) {
    return json(
      { ok: false, error: 'Username inválido' },
      400,
      corsHeaders(origin, context.env.ALLOWED_ORIGIN)
    )
  }

  try {
    const igUrl = `https://www.instagram.com/${username}/`

    const res = await fetch(igUrl, {
      method: 'GET',
      headers: {
        // ayuda vs bloqueos básicos
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8',
        // evita que intente negociar cosas raras
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    })

    const html = await res.text()
    const verdict = detectInstagramPage(html)

    // Cache corto para no spammear IG
    const headers = {
      ...corsHeaders(origin, context.env.ALLOWED_ORIGIN),
      'Cache-Control': 'public, max-age=300',
    }

    return json(
      {
        ok: verdict.ok,
        username,
        reason: verdict.reason,
      },
      200,
      headers
    )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    return json(
      { ok: false, username, error: msg, reason: 'exception' },
      500,
      corsHeaders(origin, context.env.ALLOWED_ORIGIN)
    )
  }
}
