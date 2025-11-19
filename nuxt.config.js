export default {
  target: 'static',
  modules: ['@nuxt/content'],
  components: true,
publicRuntimeConfig: {
    snipcartKey: process.env.SNIPCART_API_KEY
  }
}
