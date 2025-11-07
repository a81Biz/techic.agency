// functions/api/contact.ts

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const origin = request.headers.get("Origin") || "";
    const referer = request.headers.get("Referer") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";

    // 1) Validar origen (barrera básica)
    if (
      allowedOrigin &&
      !origin.startsWith(allowedOrigin) &&
      !referer.startsWith(allowedOrigin)
    ) {
      return new Response(
        JSON.stringify({ ok: false, error: "Origen no permitido" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const formData = await request.formData();

    // 2) Honeypot: si 'website' viene con algo, asumimos bot y fingimos éxito
    const website = formData.get("website")?.toString().trim() || "";
    if (website !== "") {
      return new Response(
        JSON.stringify({ ok: true, message: "Recibido" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3) Validar Turnstile
    const turnstileToken =
      formData.get("cf-turnstile-response")?.toString().trim() || "";

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ ok: false, error: "Falta verificación humana" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip,
        }),
      }
    );

    const verifyData = await verifyRes.json<any>();
    if (!verifyData.success) {
      return new Response(
        JSON.stringify({ ok: false, error: "Verificación Turnstile fallida" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4) Extraer campos del formulario (igual que antes)
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const projectType = formData.get("projectType")?.toString() || "";
    const budget = formData.get("budget")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const refCode = formData.get("refCode")?.toString() || "";
    const pageUrl = formData.get("pageUrl")?.toString() || "";

    // 5) Archivos → Base64
    const files: Array<{ filename: string; type: string; base64: string }> = [];
    const fileEntries = formData.getAll("files");

    for (const entry of fileEntries) {
      if (entry && typeof (entry as any).arrayBuffer === "function") {
        const file = entry as unknown as File;
        if (file.size > 0) {
          const arrayBuffer = await file.arrayBuffer();
          const base64 = arrayBufferToBase64(arrayBuffer);

          files.push({
            filename: file.name,
            type: file.type || "application/octet-stream",
            base64,
          });
        }
      }
    }

    const payload = {
      name,
      email,
      projectType,
      budget,
      message,
      refCode,
      pageUrl,
      ip,
      files,
      token: env.EMAIL_WEBHOOK_TOKEN,
    };

    // 6) Enviar al webhook (Apps Script)
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
      JSON.stringify({
        ok: true,
        message: "Correo con adjuntos enviado",
        filesCount: files.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err.message || "Error interno",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
