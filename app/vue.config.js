module.exports = {
  configureWebpack: {
    devServer: {
      clientLogLevel: 'info',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['node_modules', 'dist'],
      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/lib/main.scss";
          @import "@/assets/scss/variable/main.scss";
          @import "@/assets/scss/mixin/main.scss";
        `,
      },
    },
  },
}
