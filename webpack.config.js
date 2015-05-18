var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var serverBase = "http://localhost:8080";

var isPrerelease = JSON.parse(process.env.BUILD_PRERELEASE || 'false');
var definePlugin = new webpack.DefinePlugin({
  __PRERELEASE__: isPrerelease
});

var plugins = [definePlugin];
var entries = ['./index'];

if (isPrerelease) {
  var uglifyPlugin = webpack.optimize.UglifyJsPlugin;
  plugins.push(
    new uglifyPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        dead_code: true
      },
      mangle: {
        reserved: '$,require,exports,L,d3,webpackJsonp'
      }
    })
  );

  var CompressionPlugin = require("compression-webpack-plugin");
  plugins.push(
    new CompressionPlugin({
        asset: "{file}.gz",
        algorithm: "gzip",
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  );
}else{
  plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ]);
  entries.concat([
    'webpack-dev-server/client?'+serverBase,
    'webpack/hot/only-dev-server'
  ]);
};



if (!isPrerelease) {
  entries['dev'] = 'webpack/hot/only-dev-server';
  entries['dev.client'] = 'webpack-dev-server/client?http://localhost:8080/';
};


module.exports = {
  // 'context' sets the directory where webpack looks for module files you list in
  // your 'require' statements
  context: __dirname,
  devtool: 'eval',
  entry: entries,
  output: {
    path: __dirname + '/public/assets/',
    filename: 'bundle.js',
    publicPath: (isPrerelease ? './assets/' : '/assets/'),
    // This is my custom config –– not required by Webpack.
    serverBase: serverBase
  },
  resolve: {
    extensions: ['', '.js'],
    root: [__dirname]
  },
  plugins: plugins,
  postcss: [ autoprefixer({ browsers: ['last 2 version'] }) ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname)
        ],
        exclude: /node_modules\/(?!react-bootstrap)|(bootstrap(-sass)?\.config.*)/
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
};
