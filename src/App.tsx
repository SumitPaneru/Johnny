import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Hero from './sections/Hero'
import Reality from './sections/Reality'
import PainPoints from './sections/PainPoints'
import About from './sections/About'
import Expectations from './sections/Expectations'
import CTABanner from './sections/CTABanner'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import Login from './pages/Login'

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={
        <>
          <Header scrollRef={scrollRef} />
          <main>
            <Hero />
            <Reality />
            <PainPoints />
            <About />
            <Expectations />
            <CTABanner />
            <FAQ />
          </main>
          <Footer />
        </>
      } />
    </Routes>
  )
}

export default App
