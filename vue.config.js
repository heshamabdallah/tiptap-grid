module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': __dirname + '/src'
      }
    }
  }
}
