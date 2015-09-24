var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
  // , hot: true
  , historyApiFallback: true
  // // webpack-dev-server options
  , contentBase: "./public"
  // webpack-dev-middleware options
  , quiet: false
  , noInfo: false
  , watchDelay: 100
  // , lazy: true
  , headers: { "X-Custom-Header": "yes", "Access-Control-Allow-Origin": "*" }
  , stats: { colors: true }

})

server.listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:8081');
});
