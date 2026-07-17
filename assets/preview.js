(() => {
  const dropdowns = [...document.querySelectorAll('.nav-dropdown')]
  const closeAll = (except) => {
    for (const dropdown of dropdowns) {
      if (dropdown === except) continue
      dropdown.classList.remove('is-open')
      const button = dropdown.querySelector(':scope > button')
      const panel = dropdown.querySelector(':scope > .nav-dropdown-panel')
      button?.setAttribute('aria-expanded', 'false')
      if (panel) panel.hidden = true
    }
  }
  for (const dropdown of dropdowns) {
    const button = dropdown.querySelector(':scope > button')
    const panel = dropdown.querySelector(':scope > .nav-dropdown-panel')
    button?.addEventListener('click', () => {
      const open = !dropdown.classList.contains('is-open')
      closeAll(dropdown)
      dropdown.classList.toggle('is-open', open)
      button.setAttribute('aria-expanded', String(open))
      if (panel) panel.hidden = !open
    })
  }
  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.desktop-navigation')) closeAll()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll()
  })
  document.querySelectorAll('form[data-preview-disabled]').forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault())
  })
})()