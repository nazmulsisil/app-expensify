const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js', //'./src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.s?css$/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
