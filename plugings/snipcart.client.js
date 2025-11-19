export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script')
    script.src = 'https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.js'
    script.async = true
    document.head.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.css'
    document.head.appendChild(link)
  }
})
