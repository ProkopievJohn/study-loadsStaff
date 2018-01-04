const path = require('path');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'public/dist/js'),
    filename: 'bundle.js'
  },
  

  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  })]
}
