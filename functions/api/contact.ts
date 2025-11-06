// functions/api/contact.ts
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    // DEBUG: revisar si las variables existen
    if (!env.EMAIL_WEBHOOK_URL || !env.EMAIL_WEBHOOK_TOKEN) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Variables de entorno faltantes",
          EMAIL_WEBHOOK_URL: env.EMAIL_WEBHOOK_URL || null,
          EMAIL_WEBHOOK_TOKEN: env.EMAIL_WEBHOOK_TOKEN ? "***definido***" : null
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await request.json();

    const payload = {
      ...data,
      token: env.EMAIL_WEBHOOK_TOKEN,
      ip:
        request.headers.get("CF-Connecting-IP") ||
        request.headers.get("x-forwarded-for") ||
        "",
    };

    const res = await fetch(env.EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const out = await res.json().catch(() => ({}));

    if (!res.ok || !out.ok) {
      throw new Error(out.error || "Error en webhook de correo");
    }

    return new Response(
      JSON.stringify({ ok: true, message: "Correo enviado" ,
          EMAIL_WEBHOOK_URL: env.EMAIL_WEBHOOK_URL || null,
          EMAIL_WEBHOOK_TOKEN: env.EMAIL_WEBHOOK_TOKEN ? "***definido***" : null}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Error interno" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
