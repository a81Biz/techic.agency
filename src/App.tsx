import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Router } from './router'
import { ScrollToTop } from './components/ScrollToTop'

export default function App() {
  return (
    <HashRouter basename='/'>
      <ScrollToTop />
      <div className="app-shell">
        <Header />

        <main className="app-main">
          <Suspense fallback={null}>
            <Router />
          </Suspense>
        </main>

        <Footer />
      </div>
    </HashRouter>
  )
}
