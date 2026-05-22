function initNavbar() {
  const btn = document.querySelector('.nav-toggle')
  const links = document.querySelector('.nav-links')
  const nav = document.querySelector('.site-nav')
  if (!btn || !links || !nav) return

  const focusableSelector = 'a, button, input, [tabindex]:not([tabindex="-1"])'
  let isOpen = false
  let transitionTimeout = null

  function updateNavHeight() {
    links.style.setProperty('--nav-height', nav.offsetHeight + 'px')
  }

  function openMenu() {
    isOpen = true
    clearTimeout(transitionTimeout)
    updateNavHeight()
    links.style.display = 'flex'
    links.style.flexDirection = 'column'
    links.style.opacity = '0'
    links.classList.add('open')
    btn.setAttribute('aria-expanded', 'true')
    btn.setAttribute('aria-label', 'Cerrar men\u00fa')
    btn.classList.add('open')
    btn.textContent = '\u2715'
    document.body.style.overflow = 'hidden'

    getComputedStyle(links).opacity
    links.style.transition = 'opacity 0.35s ease'
    links.style.opacity = '1'

    const firstLink = links.querySelector('a')
    if (firstLink) firstLink.focus()
  }

  function closeMenu() {
    isOpen = false
    links.style.transition = 'none'
    getComputedStyle(links).opacity
    links.style.transition = 'opacity 0.25s ease'
    links.style.opacity = '0'
    btn.setAttribute('aria-expanded', 'false')
    btn.setAttribute('aria-label', 'Abrir men\u00fa')
    btn.classList.remove('open')
    btn.textContent = '\u2630'

    let settled = false
    function onTransitionEnd() {
      if (settled) return
      settled = true
      links.removeEventListener('transitionend', onTransitionEnd)
      links.style.display = 'none'
      links.classList.remove('open')
      links.style.transition = ''
      document.body.style.overflow = ''
      btn.focus()
    }
    links.addEventListener('transitionend', onTransitionEnd)
    transitionTimeout = setTimeout(onTransitionEnd, 400)
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

    const focusable = [btn, ...links.querySelectorAll(focusableSelector)]
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
