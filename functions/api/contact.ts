export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const data = await request.json();

    // 1. Preparar payload con token
    const payload = {
      ...data,
      token: env.EMAIL_WEBHOOK_TOKEN,
      ip:
        request.headers.get("CF-Connecting-IP") ||
        request.headers.get("x-forwarded-for") ||
        "",
    };

    // 2. Llamar al Apps Script
    const res = await fetch(env.EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.ok) {
      throw new Error(out.error || "Error en webhook de correo");
    }

    return new Response(JSON.stringify({ ok: true, message: "Correo enviado" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Error interno" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
