import { useEffect, useState, useRef } from 'react'

interface HeaderProps {
  scrollRef: React.RefObject<{ y: number; speed: number }>
}

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'The Story', href: '#about' },
  { label: 'The Impact', href: '#impact' },
  { label: 'The Approach', href: '#approach' },
  { label: 'The Vault', href: '#vault' },
]

export default function Header({ scrollRef }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = scrollRef.current?.y ?? window.scrollY
      setScrolled(y > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={
            'mt-4 flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ' +
            (scrolled
              ? 'bg-[#0b0b0b]/80 backdrop-blur-md border border-white/5 shadow-lg'
              : 'bg-transparent')
          }
        >
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#c27a4e]/50 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c27a4e" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-white font-display text-lg tracking-wide">
              FORTIS<span className="text-[#c27a4e]">INVICTUS</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-[#0b0b0b]/95 backdrop-blur-md border border-white/5 p-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-white/70 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
