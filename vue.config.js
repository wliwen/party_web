module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:2020/party/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
  }