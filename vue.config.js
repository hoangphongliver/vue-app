const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 2
      }),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|en-us|ko|zh-tw|zh-cn/),
    ]
  },
  filenameHashing: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/_mixins.scss";
          `
      }
    }
  }
}