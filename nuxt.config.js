const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/test2030watch/'
  }
} : {}

module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'de'
    },
    title: 'Testseite',
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Chivo:400,700|Roboto+Mono:400,700', defer: true }
    ]
  },
  css: [
    // Load a node module directly (here it's a SASS file)
    'normalize-scss',
    // CSS file in the project
    '@/assets/style/base.scss'
  ],
  generate: {
    routes: function () {
      const indicators = Object.keys(JSON.parse(require('fs').readFileSync('data/indicators.json', 'utf8'))).map((data) => {
        return '/indicator/' + data
      })
      const sdgs = Object.keys(JSON.parse(require('fs').readFileSync('data/sdgs.json', 'utf8'))).map((data) => {
        return '/sdg/' + data
      })
      return [...indicators, ...sdgs]
    },
    fallback: '404.html'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['babel-polyfill'],
    analyze: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          require('webpack-node-externals')({
            whitelist: [/^vue-slick/]
          })
        ]
      }
    }
  }
}
