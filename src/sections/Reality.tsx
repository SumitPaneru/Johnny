import { useEffect, useRef } from 'react'

const stats = [
  { value: '1.4K', label: 'Happy Customers' },
  { value: '4.9', label: 'Client Reviews' },
  { value: '15+', label: 'Years of Experience' },
]

export default function Reality() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.reveal-item')
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reality"
      className="relative w-full bg-[#f4f4f5] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div>
            <h2
              className="font-display text-[#0a0a0a] reveal-item"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              THE REALITY
            </h2>

            <div
              className="mt-8 space-y-6 text-[#0a0a0a]/80 text-base md:text-lg leading-relaxed reveal-item"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              <p>
                The exhaustion isn&apos;t just physical — it&apos;s soulful. The overwhelm is real,
                and the breaking point is closer than you think. This is where it stops.
              </p>
              <p>
                You were not created to choose between the business you built and the person you love.
                But I know that right now, those two worlds don&apos;t just coexist — they collide.
                I lived this for seven years, navigating the relentless, 24-hour overlap of executive
                responsibility and primary caregiving.
              </p>
              <p className="text-[#c27a4e] font-medium">
                God placed the strength for both inside you — and it is not gone. It is waiting to be reclaimed.
              </p>
            </div>

            {/* Scripture quote */}
            <blockquote
              className="mt-8 pl-6 border-l-2 border-[#c27a4e]/40 text-[#0a0a0a]/60 italic reveal-item"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <p className="text-sm md:text-base">
                &ldquo;God gives energy to the tired and increases the power of the weak.
                Those who trust in the Lord will renew their strength. They will soar on
                wings like eagles.&rdquo;
              </p>
              <cite className="block mt-2 text-sm not-italic text-[#0a0a0a]/40">
                — Isaiah 40:29, 31
              </cite>
            </blockquote>
          </div>

          {/* Image */}
          <div
            className="relative reveal-item"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <img
                src="/images/founder.jpg"
                alt="Leadership coaching"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(11,11,11,0.3) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 reveal-item"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[#0a0a0a]" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                {stat.value}
              </div>
              <div className="text-[#0a0a0a]/50 text-xs md:text-sm uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
