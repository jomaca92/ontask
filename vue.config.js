module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "OnTask"
                return args
            })
    },

    pluginOptions: {
      browserExtension: {
        componentOptions: {
          background: {
            entry: 'src/background.js'
          },
          override: true
        }
      }
    }
}
