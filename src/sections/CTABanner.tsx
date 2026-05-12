import { useEffect, useRef } from 'react'

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.cta-reveal')
            els.forEach((el, i) => {
              setTimeout(() => {
                ;(el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="vault"
      className="relative w-full py-24 md:py-40 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/vault-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0b0b0b]/60" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(194, 122, 78, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-[#c27a4e] text-xs uppercase tracking-[0.3em] mb-6 cta-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          Reclaim Your Strength
        </p>

        <h2
          className="font-display text-white cta-reveal"
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          Your business needs a leader.
          <br />
          Your loved one needs a caregiver.
          <br />
          <span className="text-[#c27a4e]">You need a partner.</span>
        </h2>

        <div
          className="mt-10 cta-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
          }}
        >
          <button
            onClick={() => {
              const el = document.querySelector('#contact-form')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-10 py-4 bg-[#c27a4e] text-white text-base font-medium rounded-full hover:bg-[#b06a40] transition-all duration-300 tracking-wide shadow-lg shadow-[#c27a4e]/20"
          >
            Book Your Strategy Call
          </button>
        </div>

        <p
          className="mt-6 text-white/40 text-sm cta-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
          }}
        >
          God never intended for you to carry this burden alone. Let&apos;s reclaim your margin together.
        </p>

        {/* Key metrics display */}
        <div
          className="mt-16 grid grid-cols-3 gap-8 cta-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
          }}
        >
          <div className="text-center">
            <div className="font-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              30+
            </div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
              Years Executive
              <br />
              Leadership
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              7
            </div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
              Years as
              <br />
              Caregiver
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              1.4K
            </div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">
              Lives
              <br />
              Transformed
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
