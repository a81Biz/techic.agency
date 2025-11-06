// functions/api/contact.ts
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const formData = await request.formData();

    // 📌 Extraer campos comunes
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const projectType = formData.get("projectType")?.toString() || "";
    const budget = formData.get("budget")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const refCode = formData.get("refCode")?.toString() || "";
    const pageUrl = formData.get("pageUrl")?.toString() || "";
    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    // 📦 Convertir archivos a Base64
    const files: Array<{ filename: string; type: string; base64: string }> = [];
    const fileEntries = formData.getAll("files");

    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        const arrayBuffer = await entry.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        files.push({ filename: entry.name, type: entry.type, base64 });
      }
    }

    // 🧠 Payload completo para el webhook
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

    // 📬 Enviar a Apps Script
    const res = await fetch(env.EMAIL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const out = await res.json().catch(() => ({}));
    if (!res.ok || !out.ok) throw new Error(out.error || "Error en webhook de correo");

    return new Response(
      JSON.stringify({ ok: true, message: "Correo con adjuntos enviado" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message || "Error interno" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
