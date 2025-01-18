export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',
  // devtools: { enabled: true },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Tasc',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },


    // Alternatively, ensure static is used correctly
    dir: {
      static: 'public', // If you're using 'public' as the folder
    },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    // '@/assets/css/transitions.css',
    '@/assets/css/typography.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  // ],

  // plugins: [
  //   { src: '@plugins/masonry', mode: 'client' },
  //   { src: '@plugins/lazy', mode: 'client' },
  //   { src: '@plugins/slider', mode: 'client' },
  //   '~/plugins/preview.client.js',
  // ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    // '@nuxtjs/sanity/module',
    // '@nuxtjs/tailwindcss',
    // '@nuxt/image',
    // 'nuxt-gsap-module',
  ],

  // // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ['vue-scrollto/nuxt', "nuxt-gsap-module"],

  // sanity: {
  //   // module options
  //   projectId: '0i1cdi6a',
  //   apiVersion: '2023-09-05',
  //   useCdn: false, 
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // image: {
  //   sanity: {
  //     projectId: '0i1cdi6a',
  //     dataset: 'production',
  //   },
  // },
  build: {
    // extend(config, ctx) {
    //   config.module.rules.push({
    //     test: /\.mjs$/,
    //     include: /node_modules\/@studio-freight\/lenis/,
    //     type: 'javascript/auto',
    //     use: {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env'],
    //       },
    //     },
    //   });
    // },

    // build: {
      postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    // },    
  },

  compatibilityDate: '2025-01-17',
};