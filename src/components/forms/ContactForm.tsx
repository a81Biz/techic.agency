// src/components/forms/ContactForm.tsx
import type { FC } from 'react'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdDF3HounfIpDLBTYeBI3U5M--2X-1LkLqHB97vbtIq-kXjiw/viewform?usp=publish-editor'

export const ContactForm: FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '56.25%',
        marginTop: '16px',
        border: '1px solid var(--line)',
      }}
    >
      <iframe
        title="Formulario de contacto TECHIC"
        src={GOOGLE_FORM_URL}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        loading="lazy"
      />
    </div>
  )
}
