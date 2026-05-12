import { useEffect, useRef } from 'react'

const painPoints = [
  {
    title: 'Navigating the Constant Overlap:',
    description:
      'Managing a company and a care plan simultaneously — where business decisions and caregiving needs intertwine all day, every day.',
  },
  {
    title: 'Deciding Through the Fog:',
    description:
      'Trying to make high-stakes professional choices with a mind clouded by the heavy, 24/7 details of Alzheimer\'s care.',
  },
  {
    title: 'Carrying the "Double-Guilt":',
    description:
      'Feeling like you\'re failing your team when you\'re caregiving, and failing your loved one when you\'re working.',
  },
  {
    title: 'The Silent Mourner:',
    description:
      'Keeping a business alive and growing while your heart is breaking.',
  },
]

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.pain-reveal')
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
      id="pain-points"
      className="relative w-full bg-[#0b0b0b] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className="pain-reveal mb-16"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-[#c27a4e] text-xs uppercase tracking-[0.2em] mb-4">
            The Struggle
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Are You a Christian Business Owner Who Is:
          </h2>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="pain-reveal group relative p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 0.1}s`,
              }}
            >
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c27a4e]/30 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c27a4e]/30 rounded-br-lg" />

              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-[#c27a4e] transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
