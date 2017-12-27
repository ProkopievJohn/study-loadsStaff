const path = require('path');

module.exports = {
  entry: './public/javascript/src/index',

  output: {
    path: path.resolve(__dirname, 'public/javascript/dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }      
    ]
  }
};
