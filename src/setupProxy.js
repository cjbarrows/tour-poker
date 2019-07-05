const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/player',
    { target: 'https://tour-poker-server.herokuapp.com/' }
  ));
}