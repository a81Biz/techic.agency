// functions/api/contact.ts

/**
 * Endpoint temporal de prueba para el formulario TECHIC.
 * Permite validar el flujo POST desde Postman o desde el frontend.
 * Más adelante agregaremos verificación, Turnstile y envío de correos.
 */

export const onRequestPost: PagesFunction = async (context) => {
  const { request } = context;

  let data: any = null;

  // 1. Intentar leer el cuerpo de la petición como JSON
  try {
    data = await request.json();
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "El cuerpo debe estar en formato JSON válido",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 2. Responder con eco de los datos recibidos y metadatos básicos
  const responseBody = {
    ok: true,
    message: "Contacto recibido (modo prueba)",
    received: data,
    meta: {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get("user-agent"),
      timestamp: new Date().toISOString(),
    },
  };

  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
