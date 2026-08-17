import './style.css'

function init() {
  const menuButton = document.querySelector('.menu-button')
  const mobileNav = document.querySelector('#mobile-nav')

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true'
    menuButton.setAttribute('aria-expanded', String(!open))
    menuButton.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる')
    mobileNav.hidden = open
  })

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false')
      menuButton.setAttribute('aria-label', 'メニューを開く')
      mobileNav.hidden = true
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) {
      menuButton.setAttribute('aria-expanded', 'false')
      menuButton.setAttribute('aria-label', 'メニューを開く')
      mobileNav.hidden = true
      menuButton.focus()
    }
  })

  // FAXリスト別トラッキング: URLの ?src= を診断ツールへのリンクに引き継ぐ
  try {
    const src = new URLSearchParams(window.location.search).get('src')
    if (src) {
      document.querySelectorAll('a.cta-diag').forEach((link) => {
        const url = new URL(link.href)
        url.searchParams.set('src', src)
        link.href = url.toString()
      })
    }
  } catch (e) { /* URL APIが使えない環境では素通し */ }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
    { threshold: 0.12 }
  )

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
