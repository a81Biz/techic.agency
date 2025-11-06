// functions/api/contact.ts

// Helper seguro para convertir ArrayBuffer -> Base64 sin reventar el stack
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

    // 📦 Convertir archivos a Base64 (sin instanceof File)
    const files: Array<{ filename: string; type: string; base64: string }> = [];
    const fileEntries = formData.getAll("files");

    for (const entry of fileEntries) {
      // En el runtime de Cloudflare, basta con verificar que el objeto tenga arrayBuffer()
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
