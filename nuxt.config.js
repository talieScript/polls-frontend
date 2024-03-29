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
    '~/assets/css/style.css'
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
    'dayjs',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
     ['nuxt-fontawesome', {
            component: 'fa',
            imports: [
              {
                set: '@fortawesome/free-solid-svg-icons',
                icons: [
                  'faGripLines',
                  'faTrash',
                  'faPlus',
                  'faLongArrowAltRight',
                  'faCalendarWeek',
                  'faChevronDown',
                  'faAngleUp',
                  'faAngleDown',
                  'faQuestionCircle',
                  'faCheck',
                  'faLink',
                  'faQrcode',
                  'faSpinner',
                  'faCheckCircle',
                  'faUser',
                  'faTimes',
                  'faArrowDown'
                  ]
              },
              {
                set: '@fortawesome/free-brands-svg-icons',
                icons: [
                  'faFacebook',
                  'faTwitter',
                  'faWhatsapp',
                  'faLine',
                  'faFacebookMessenger',
                  'faGoogle',
                  'faDiscord',
                ]
              }
            ]
          }
      ]
  ],

  auth: {
    redirect: {
      home: '/redirect'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
        },
        endpoints: {
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    },
  },

  router: {},

  generate: {
    fallback: true
  },

  env: {
    vueAppPollsApi: process.env.VUE_APP_POLLS_API || 'https://api.pollsimply.com',
    vueAppIpGetter: process.env.VUE_APP_IP_GETTER || 'https://icanhazip.com/',
    browserBaseUrl: process.env.BROWSER_BASE_URL || 'https://pollsimply.com'
  },

  axios: {
    baseURL: process.env.VUE_APP_POLLS_API,
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
  },

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  }
}

