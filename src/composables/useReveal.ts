export function initReveals() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -48px 0px',
    },
  )

  nodes.forEach((node) => observer.observe(node))
}
