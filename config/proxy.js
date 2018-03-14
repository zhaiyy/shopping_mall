const Target = 'http://127.0.0.1:3000';

module.exports = {
  '/api/goods': {
    target: Target,
    changeOrigin: true,
    pathRewrite: {'^/api/goods': '/api/goods'}
  },
}
