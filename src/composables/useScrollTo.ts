export function scrollToId(id: string) {
  const target = document.getElementById(id)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
