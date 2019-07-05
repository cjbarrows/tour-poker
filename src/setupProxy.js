const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/player',
    { target: 'http://tour-poker-server.herokuapp.com/' }
  ));
}