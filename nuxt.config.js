export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'polls-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Roboto:wght@300;400;500&display=swap'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
    'dayjs',
    '@nuxtjs/dotenv',
     ['nuxt-fontawesome', {
            component: 'fa',
            imports: [
              {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['faGripLines', 'faTrash', 'faPlus', 'faLongArrowAltRight', 'faCalendarWeek', 'faChevronDown', 'faAngleUp', 'faAngleDown' ]
              },
            ]
          }
      ]
  ],

  axios: {
    baseURL: 'http://localhost:3000',
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.VUE_APP_POLLS_API
    }
  },

  build: {
  },

  server: {
    port: 8000,
    host: '0.0.0.0',
  }
}

