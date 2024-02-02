const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 22222,
    proxy: {
      '/api': {
        target: 'http://localhost:20000',
        changeOrigin: true,
      },
    },
  },
  
})

