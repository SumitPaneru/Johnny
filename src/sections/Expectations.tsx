import { useEffect, useRef } from 'react'

const benefits = [
  {
    title: 'Crushing decision fatigue',
    subtitle: 'before it paralyzes your leadership.',
  },
  {
    title: 'Restoring emotional strength',
    subtitle: 'and mental clarity.',
  },
  {
    title: 'Protecting your energy—',
    subtitle: 'your company\'s most valuable asset and your family\'s greatest need.',
  },
  {
    title: 'Building faith-anchored endurance',
    subtitle: 'that outlasts any season.',
  },
  {
    title: 'Reconnecting with the calling',
    subtitle: 'God placed on your life—before the weight made you forget it.',
  },
]

export default function Expectations() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.expect-reveal')
            els.forEach((el, i) => {
              setTimeout(() => {
                ;(el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 120)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full bg-[#0b0b0b] py-24 md:py-32 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/videos/impact-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0b0b0b]/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: heading */}
          <div>
            <p
              className="text-[#c27a4e] text-xs uppercase tracking-[0.2em] mb-4 expect-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              What You Can Expect
            </p>
            <h2
              className="font-display text-white expect-reveal"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              This is not therapy. This is not a support group.
            </h2>
            <p
              className="mt-6 text-white/50 text-base leading-relaxed expect-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              This is a strategic, confidential partnership — battle-tested guidance from someone
              who has navigated the exact storm you are in. You set the agenda. Every session is
              focused, practical, and immediately actionable.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 expect-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <button
                onClick={() => document.querySelector('#vault')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#c27a4e] text-white text-sm font-medium rounded-full hover:bg-[#b06a40] transition-colors duration-300 tracking-wide"
              >
                Learn More
              </button>
              <a
                href="tel:+18001234567"
                className="px-8 py-3 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all duration-300 tracking-wide inline-flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Make a Call
              </a>
            </div>
          </div>

          {/* Right: benefits list */}
          <div className="space-y-0">
            <p
              className="text-white/40 text-xs uppercase tracking-[0.15em] mb-6 expect-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
              }}
            >
              We go to work on:
            </p>
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="expect-reveal group py-6 border-b border-white/5 first:border-t"
                style={{
                  opacity: 0,
                  transform: 'translateY(24px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 3) * 0.08}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full border border-[#c27a4e]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c27a4e]/20 transition-colors duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c27a4e" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg group-hover:text-[#c27a4e] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">{benefit.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
