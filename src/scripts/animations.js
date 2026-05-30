import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCardGrid(gridSelector, cardSelector) {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelectorAll(cardSelector).forEach(el => {
      el.style.opacity = '1'
      el.style.visibility = 'visible'
    })
  })

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const cards = document.querySelectorAll(cardSelector)
    if (!cards.length) return

    const isMobile = window.innerWidth < 768

    ScrollTrigger.batch(cards, {
      start: 'top 85%',
      once: true,
      batchMax: isMobile ? 2 : 4,
      interval: 0.1,
      onEnter: (batch) => {
        gsap.set(batch, { visibility: 'visible' })
        gsap.from(batch, {
          autoAlpha: 0,
          y: 24,
          scale: 0.98,
          duration: 0.6,
          stagger: { amount: 0.4, from: 'start' },
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
    })
  })

  return () => mm.revert()
}
