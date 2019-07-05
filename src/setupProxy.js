const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  // remote:
  app.use(proxy('/api',
    {
      target: 'https://tour-poker-server.herokuapp.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api/player': '/player' // remove base path
      },
    }
  ));
}