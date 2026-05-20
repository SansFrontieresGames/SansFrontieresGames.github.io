function initNavbar() {
  const btn = document.querySelector('.nav-toggle')
  const links = document.querySelector('.nav-links')
  const nav = document.querySelector('.site-nav')
  if (!btn || !links) return

  const focusableSelector = 'a, button, input, [tabindex]:not([tabindex="-1"])'
  let isOpen = false

  function openMenu() {
    isOpen = true
    links.style.display = 'flex'
    links.style.flexDirection = 'column'
    links.classList.add('open')
    btn.setAttribute('aria-expanded', 'true')
    btn.setAttribute('aria-label', 'Cerrar menu')
    btn.innerHTML = '&#10005;'

    const firstLink = links.querySelector('a')
    if (firstLink) firstLink.focus()
  }

  function closeMenu() {
    isOpen = false
    links.style.display = 'none'
    links.classList.remove('open')
    btn.setAttribute('aria-expanded', 'false')
    btn.setAttribute('aria-label', 'Abrir menu')
    btn.innerHTML = '&#9776;'
    btn.focus()
  }

  btn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu()
    }
  })

  links.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !isOpen) return

    const focusable = links.querySelectorAll(focusableSelector)
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  })

  document.addEventListener('click', (e) => {
    if (isOpen && !nav.contains(e.target)) {
      closeMenu()
    }
  })

  function onScroll() {
    if (!nav) return
    const y = window.scrollY || document.documentElement.scrollTop
    nav.classList.toggle('scrolled', y > 20)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

document.addEventListener('DOMContentLoaded', initNavbar)
