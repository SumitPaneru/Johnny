import { useEffect, useRef, useState } from 'react'

const faqs = [
  {
    question: 'What is a Life Coach?',
    answer:
      'A life coach is a professional who helps you identify your goals, overcome obstacles, and create actionable plans to achieve the life you desire. Unlike a therapist who focuses on healing past trauma, a coach focuses on your present and future — helping you move forward with clarity, purpose, and accountability.',
  },
  {
    question: 'What is a Christian Life Coach?',
    answer:
      'A Christian life coach integrates biblical principles and faith-based wisdom into the coaching process. We believe that true transformation comes from aligning your life with God\'s design and purpose. Scripture, prayer, and spiritual discernment are woven into every session as foundational tools for growth.',
  },
  {
    question: 'Why would I want a Christian Coach?',
    answer:
      'If your faith is central to who you are, you need a coach who understands that dimension of your life. A Christian coach doesn\'t separate your spiritual life from your business or caregiving responsibilities — we help you integrate all of it under God\'s guidance. You get both professional expertise and spiritual partnership.',
  },
  {
    question: 'What is Caregiver Relief?',
    answer:
      'Caregiver Relief is a specialized coaching framework designed for business owners who are also primary caregivers for loved ones with Alzheimer\'s or dementia. It addresses the unique intersection of executive leadership and caregiving — helping you maintain your business performance while preserving your emotional, physical, and spiritual well-being.',
  },
]

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-white font-medium text-base md:text-lg pr-8 group-hover:text-[#c27a4e] transition-colors duration-300">
          {question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c27a4e]/50 transition-colors duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-6 text-white/50 text-sm md:text-base leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.faq-reveal')
            els.forEach((el, i) => {
              setTimeout(() => {
                ;(el as HTMLElement).style.opacity = '1'
                ;(el as HTMLElement).style.transform = 'translateY(0)'
              }, i * 100)
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
      className="relative w-full bg-[#0b0b0b] py-24 md:py-32"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-[#c27a4e] text-xs uppercase tracking-[0.2em] mb-4 faq-reveal"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Have Questions?
          </p>
          <h2
            className="font-display text-white faq-reveal"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div
          className="faq-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div
          id="contact-form"
          className="mt-20 p-8 md:p-12 rounded-2xl border border-white/5 bg-white/[0.02] faq-reveal"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-white text-2xl md:text-3xl">
              Ready to Reclaim Your Strength?
            </h3>
            <p className="text-white/50 text-sm mt-3">
              Fill out the form below and I&apos;ll reach out within 24 hours.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Strategy Call',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/trpc/contact.create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          json: formData,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ fullName: '', email: '', phone: '', inquiryType: 'Strategy Call', message: '' })
      }
    } catch {
      // silently handle
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[#c27a4e]/20 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c27a4e" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <h4 className="text-white font-medium text-lg">Thank You!</h4>
        <p className="text-white/50 text-sm mt-2">
          Your message has been received. I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c27a4e]/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c27a4e]/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Phone (Optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c27a4e]/50 transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Inquiry Type</label>
          <select
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#c27a4e]/50 transition-colors appearance-none"
          >
            <option value="Strategy Call" className="bg-[#151515]">Strategy Call</option>
            <option value="Coaching Program" className="bg-[#151515]">Coaching Program</option>
            <option value="Speaking Engagement" className="bg-[#151515]">Speaking Engagement</option>
            <option value="General Inquiry" className="bg-[#151515]">General Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Message (Optional)</label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#c27a4e]/50 transition-colors resize-none"
          placeholder="Tell me a bit about your situation..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-[#c27a4e] text-white text-sm font-medium rounded-full hover:bg-[#b06a40] transition-colors duration-300 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
