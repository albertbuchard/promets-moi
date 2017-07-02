import webpack from 'webpack'

const PROD = JSON.parse(process.env.PROD_ENV || '0')

const libraryName = 'promets'
const outputFile = `${libraryName}${PROD ? '.min' : '.max'}.js`
const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
]
const prodPlugins = plugins.concat(new webpack.optimize.UglifyJsPlugin({ mangle: false }))

export default {
  entry: './src/promets.moi.js',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],

  },
  devtool: PROD ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: PROD ? prodPlugins : plugins,
}
