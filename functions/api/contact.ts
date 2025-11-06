// functions/api/contact.ts

// Helper seguro para convertir ArrayBuffer -> Base64 sin reventar el stack
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  // Opcional: si quieres ser más prudente, limita el tamaño del archivo
  // if (bytes.length > 5 * 1024 * 1024) { // 5 MB
  //   throw new Error("Archivo demasiado grande");
  // }

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

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

    // 📦 Convertir archivos a Base64 sin usar spread (...)
    const files: Array<{ filename: string; type: string; base64: string }> = [];
    const fileEntries = formData.getAll("files");

    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        // Si quieres, puedes limitar tamaño aquí también:
        // if (entry.size > 5 * 1024 * 1024) throw new Error("Archivo demasiado grande");

        const arrayBuffer = await entry.arrayBuffer();
        const base64 = arrayBufferToBase64(arrayBuffer);

        files.push({
          filename: entry.name,
          type: entry.type || "application/octet-stream",
          base64,
        });
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
      JSON.stringify({ ok: true, message: "Correo con adjuntos enviado" }),
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
