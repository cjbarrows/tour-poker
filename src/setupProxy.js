const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  // remote:
  app.use(proxy('/api',
    {
      // target: 'https://tour-poker-server.herokuapp.com/',
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/player': '/player', // remove base path
        '^/api/users/authenticate': '/users/authenticate' // remove base path
      },
    }
  ));
}