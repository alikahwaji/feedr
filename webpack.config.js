const path = require('path')
const webpack = require('webpack')
const DotenvPlugin = require('webpack-dotenv-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.EnvironmentPlugin(['HOST', 'PORT']),
    new DotenvPlugin({
      path: './.env',
      sample: './.env.example'
    })
  ],
  devtool: 'source-map'
}
