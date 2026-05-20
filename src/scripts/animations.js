import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCardGrid(gridSelector, cardSelector) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    document.querySelectorAll(cardSelector).forEach(el => {
      el.style.opacity = '1'
    })
    return
  }

  const grid = document.querySelector(gridSelector)
  if (!grid) return

  const cards = grid.querySelectorAll(cardSelector)
  if (!cards.length) return

  gsap.from(cards, {
    opacity: 0,
    y: 24,
    scale: 0.98,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: grid,
      start: 'top 75%',
      once: true,
    },
  })
}
