const Target = 'http://127.0.0.1:3000';

module.exports = {
  '/api/goods': {
    target: Target,
    changeOrigin: true,
    pathRewrite: {'^/api/goods': '/api/goods'}
  },
  '/api/index': {
    target: Target,
    changeOrigin: true,
    pathRewrite: {'^/api/index': '/api/index'}
  },
  '/api/users': {
    target: Target,
    changeOrigin: true,
    pathRewrite: {'^/api/users': '/api/users'}
  },
  '/api/users/login': {
    target: Target,
    changeOrigin: true,
    pathRewrite: {'^/api/users/login': '/api/users/login'}
  },
}
