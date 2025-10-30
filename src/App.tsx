import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Router } from './router'

export default function App() {
  return (
    <HashRouter basename="/">
      <Header />
      <Suspense fallback={<div style={{padding:'6rem 1.5rem'}}>Cargando…</div>}>
        <Router />
      </Suspense>
      <Footer />
    </HashRouter>
  )
}
