# TECHIC.AGENCY

### Aplicación web + formulario premium con backend serverless

---

## 📌 Descripción general

**techic.agency** es una aplicación web desarrollada con **Vite + React + TypeScript**, desplegada en **Cloudflare Pages**, que incluye:

* Un **sitio informativo**.
* Un **formulario de contacto tradicional**.
* Un **formulario avanzado para modelos premium**, diseñado para usarse principalmente desde **dispositivos móviles**.
* Un **backend serverless** que procesa formularios, valida seguridad y envía correos con adjuntos mediante **Google Apps Script**.
* Protección anti-spam con **Cloudflare Turnstile**.

El sistema está diseñado para **no depender de base de datos**, priorizando:

* simplicidad,
* bajo costo,
* control total del flujo,
* y facilidad de mantenimiento.

---

## 🧠 Filosofía del proyecto

* **Frontend modular** (componentes por pasos).
* **Backend mínimo** (solo lo necesario).
* **Nada de scraping ni hacks frágiles**.
* **UX clara en móvil**, incluso en formularios largos.
* **Todo documentado y replicable**.

---

## 🧱 Stack tecnológico

### Frontend

* **Vite**
* **React**
* **TypeScript**
* CSS Modules

### Backend / Infraestructura

* **Cloudflare Pages**
* **Cloudflare Pages Functions**
* **Cloudflare Turnstile** (anti-bots)
* **Google Apps Script** (envío de correo)
* **Gmail** como canal de recepción

---

## 📁 Estructura del proyecto

```txt
src/
├── components/
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── PremiumModelForm.tsx
│   │   ├── PremiumStep1.tsx
│   │   ├── PremiumStep2.tsx
│   │   ├── PremiumStep3.tsx
│   │   └── PremiumStep4.tsx
│
├── lib/
│   ├── http.ts
│   └── premiumModelForm/
│       ├── files.ts
│       ├── summary.ts
│       └── validation.ts
│
├── styles/
│   └── ContactForm.module.css
│
└── models/
    └── (modelos compartidos del sitio)
```

```txt
functions/
└── api/
    └── contact.ts
```

---

## 📝 Formularios

### 1️⃣ Formulario de contacto tradicional

* Campos básicos:

  * Nombre
  * Correo
  * Tipo de proyecto
  * Presupuesto
  * Mensaje
* Soporta adjuntos.
* Protegido con Turnstile.
* Envío directo por correo.

### 2️⃣ Formulario para modelos premium

Formulario **multi-paso**, optimizado para móvil:

#### Paso 1 — Perfil creativo

* Tipo de contenido
* Límites
* Límites personalizados

#### Paso 2 — Operación

* Disponibilidad
* Modelo de trabajo preferido
* Objetivo mensual
* Moneda

#### Paso 3 — Estilo visual

* Selección múltiple de estilos

#### Paso 4 — Revisión y envío

* Resumen automático del plan
* Captura de WhatsApp
* Subida de 3 a 5 imágenes
* Turnstile
* Envío final

---

## 🎯 UX y comportamiento clave

### Scroll controlado (móvil)

* Cada cambio de paso **regresa al inicio del formulario**.
* Se evita que el usuario “pierda” preguntas.
* Se elimina foco activo para evitar saltos por teclado móvil.

### Estados de envío

El formulario NO redirige ni recarga.

Estados dentro de la misma modal:

* **Enviando…**
* **Éxito**
* **Error**

La “modal” de estado:

* Usa `position: fixed`
* Bloquea scroll del body
* Siempre visible, sin importar la posición previa

---

## 🔐 Seguridad

### Anti-spam

* **Cloudflare Turnstile**
* Honeypot invisible
* Validaciones en frontend y backend

### Backend

* Token compartido entre Cloudflare y Apps Script
* Sin exposición de credenciales
* Variables sensibles en **Cloudflare Secrets**

---

## 🔁 Flujo de envío de datos

```txt
Formulario (React)
   ↓
Cloudflare Pages Function (/api/contact)
   ↓
Validación + normalización
   ↓
Google Apps Script (Webhook)
   ↓
Correo con:
  - datos estructurados
  - resumen
  - adjuntos
```

---

## ⚙️ Backend: `/api/contact`

### Responsabilidades

* Recibir `FormData`
* Validar Turnstile
* Procesar adjuntos (Base64)
* Enviar payload a Apps Script
* Soportar **dos tipos de formulario** sin romper compatibilidad

### Campos soportados (opcionales)

* `formKind`
* `whatsapp`
* `availability`
* `workModel`
* `goalMonthly`
* `goalCurrency`
* `limits`
* `contentType`
* `visualStyle`

---

## ✉️ Google Apps Script

* Recibe JSON
* Valida token
* Reconstruye adjuntos
* Arma correo según tipo de formulario
* Envía vía Gmail

No guarda datos, no persiste nada.

---

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

Para probar funciones:

```bash
npm run build
npx wrangler pages dev ./dist
```

---

## 🌍 Deploy

* Push a `main`
* Cloudflare Pages construye y publica automáticamente
* Secrets configurados en el dashboard de Cloudflare

---

## 🧪 Consideraciones importantes

* No se usa base de datos **por decisión de diseño**.
* Instagram se eliminó temporalmente del flujo:

  * Evita scraping
  * Se planea integrar **API oficial** en el futuro.
* El proyecto prioriza **claridad y control**, no “automatización ciega”.

---

## 📚 Documentación y contenido

Este proyecto sirve como base para:

* Tutoriales técnicos
* Videos de frontend / serverless
* Casos reales de UX móvil
* Ejemplos de arquitectura sin backend tradicional

---

## 👤 Autor / Proyecto

**TECHIC Agency**
Desarrollo y arquitectura: Ecosistema A81
