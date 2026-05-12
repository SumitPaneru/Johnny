import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }

    const handleScroll = () => {
      if (!sectionRef.current) return
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const progress = Math.min(scrollY / vh, 1)
      const scale = 1.05 - progress * 0.05
      const opacity = 1 - progress * 0.6

      const vid = sectionRef.current.querySelector('video') as HTMLVideoElement
      if (vid) {
        vid.style.transform = `scale(${scale})`
      }
      const overlay = sectionRef.current.querySelector('.hero-content') as HTMLElement
      if (overlay) {
        overlay.style.opacity = String(opacity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToReality = () => {
    document.querySelector('#reality')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.05)' }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.1) 30%, rgba(11,11,11,0.1) 70%, rgba(11,11,11,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-white/70 text-sm md:text-base tracking-[0.15em] uppercase mb-6">
          Deep within every caregiver lies the heart, spirit &amp;
        </p>

        {/* Main headline */}
        <h1 className="font-display text-white leading-none tracking-tight mb-2">
          <span
            className="block italic"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            UNCONQUERED STRENGTH
          </span>
          <span className="flex items-center justify-center gap-3 md:gap-6">
            <span
              className="italic"
              style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
            >
              of a
            </span>
            <span
              className="font-display"
              style={{ fontSize: 'clamp(48px, 10vw, 140px)', fontWeight: 400, letterSpacing: '-0.02em' }}
            >
              WARRIOR
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-base md:text-lg mt-8 max-w-2xl mx-auto leading-relaxed">
          Certified Business Performance &amp; Leadership Coaching
        </p>

        <p className="text-white/50 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Serving Christian Business Owners navigating the dual demands of leading a business
          while providing primary care for a loved one with Alzheimer&apos;s.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollToReality}
            className="px-8 py-3 bg-[#c27a4e] text-white text-sm font-medium rounded-full hover:bg-[#b06a40] transition-colors duration-300 tracking-wide"
          >
            Get Started
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all duration-300 tracking-wide"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Bottom logo watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    </section>
  )
}
