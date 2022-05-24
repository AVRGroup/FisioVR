const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    lateralRaise: './src/js/exercises/LateralRaise.js',
    legRaise: './src/js/exercises/LegRaise.js',
    devOmbros: './src/js/exercises/DevOmbros.js',
    ui: './src/js/ui.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home FisioVR',
      template: './src/index.html',
      chunks: []
    }),
    new HtmlWebpackPlugin({
      title: 'Exercise',
      filename: 'lateralRaise.html',
      template: './src/exercise.html',
      chunks: ['lateralRaise', 'ui']
    }),
    new HtmlWebpackPlugin({
      title: 'Exercise',
      filename: 'legRaise.html',
      template: './src/exercise.html',
      chunks: ['legRaise', 'ui']
    }),
    new HtmlWebpackPlugin({
      title: 'Exercise',
      filename: 'devOmbros.html',
      template: './src/exercise.html',
      chunks: ['devOmbros', 'ui']
    }),
  ],
  experiments: {
    topLevelAwait: true,
    // asyncWebAssembly: true,
    // buildHttp: true,
    // layers: true,
    // lazyCompilation: true,
    // outputModule: true,
    // syncWebAssembly: true,
  },
};