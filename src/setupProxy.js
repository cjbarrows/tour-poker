const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api',
    { target: 'https://tour-poker-server.herokuapp.com:3001/' }
  ));
}