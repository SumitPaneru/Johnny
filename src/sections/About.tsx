import { useEffect, useRef } from 'react'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.about-reveal')
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#f4f4f5] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div
            className="relative about-reveal order-2 lg:order-1"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src="/images/founder.jpg"
                alt="Founder portrait"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 40%)',
                }}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#c27a4e]/20 rounded-lg -z-10" />
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2">
            <p
              className="text-[#c27a4e] text-xs uppercase tracking-[0.2em] mb-4 about-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              About Me
            </p>
            <h2
              className="font-display text-[#0a0a0a] about-reveal"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              Leadership that understands the weight you carry.
            </h2>

            <div
              className="mt-8 space-y-5 text-[#0a0a0a]/75 text-base leading-relaxed about-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
              }}
            >
              <p>
                I walked this road personally. For seven years, I was the sole caregiver for
                my wife, Vera, following her diagnosis of early-onset Alzheimer&apos;s at age 55.
                During those same years, I was simultaneously launching Fortis Invictus — answering
                a professional calling I could no longer ignore while facing a personal heartbreak
                I could not escape.
              </p>
              <p>
                I bring 30+ years of executive leadership — including roles at Pepsi-Cola,
                Mercedes-Benz, and Harley-Davidson — and a proven framework forged from both
                science and Scripture to help you stabilize, strengthen, and lead again.
              </p>
              <p className="font-medium text-[#0a0a0a]">
                I didn&apos;t just read about this road. I survived it.
              </p>
            </div>

            {/* Scripture quote */}
            <blockquote
              className="mt-8 pl-6 border-l-2 border-[#c27a4e]/40 text-[#0a0a0a]/50 italic about-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
              }}
            >
              <p className="text-sm md:text-base">
                &ldquo;As iron sharpens iron, so one person sharpens another.&rdquo;
              </p>
              <cite className="block mt-2 text-sm not-italic text-[#0a0a0a]/40">
                — Proverbs 27:17
              </cite>
            </blockquote>

            {/* CTA */}
            <div
              className="mt-10 about-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
              }}
            >
              <button
                onClick={() => document.querySelector('#vault')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#0a0a0a]/20 text-[#0a0a0a] text-sm font-medium rounded-full hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 tracking-wide"
              >
                Learn More About My Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
