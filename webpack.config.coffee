path = require 'path'

webpack = require 'webpack'

ManifestPlugin = require 'webpack-manifest-plugin'
StatsPlugin = require 'stats-webpack-plugin'

loaders = require './webpack-config/loaders'
resolve = require './webpack-config/resolve'
vendor = require './webpack-config/vendor'

local_build_dir = "build"

BuildEnvironment = 'dev'
if process.env.PRODUCTION_BUILD
  BuildEnvironment = 'production'
  Clean = require 'clean-webpack-plugin'
  CompressionPlugin = require 'compression-webpack-plugin'
  ChunkManifestPlugin = require 'chunk-manifest-webpack-plugin'
  console.log "==============PRODUCTION BUILD=============="
  
WebPackOutputFilename =
  dev: '[name].js'
  production: '[name]-[chunkhash].js'
  
WebPackOutput =
  filename: WebPackOutputFilename[BuildEnvironment]
  path: path.join __dirname, local_build_dir
  publicPath: 'build/'

DefinePluginOpts =
  dev:
    __DEV__: 'true'
    DEBUG: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  production:
    __DEV__: 'false'
    DEBUG: 'false'
    'process.env':
      'NODE_ENV': JSON.stringify 'production'
    
StatsPluginFilename =
  dev: 'stats-dev.json'
  production: 'stats.json'

common_plugins = [
  new webpack.DefinePlugin DefinePluginOpts[BuildEnvironment]
  # FIXME common chunk names in reverse order
  # https://github.com/webpack/webpack/issues/1016#issuecomment-182093533
  new webpack.optimize.CommonsChunkPlugin
    names: ['common', 'vendor']
    filename: WebPackOutputFilename[BuildEnvironment]
  new webpack.optimize.AggressiveMergingPlugin()
  new StatsPlugin StatsPluginFilename[BuildEnvironment], chunkModules: true
  new ManifestPlugin()
  # FIXME, figure out how to load FC locales on demand
  # This is to ignore moment locales with fullcalendar
  # https://github.com/moment/moment/issues/2416#issuecomment-111713308
  new webpack.IgnorePlugin /^\.\/locale$/, /moment$/
  ]

if BuildEnvironment is 'dev'
  dev_only_plugins = []
  AllPlugins = common_plugins.concat dev_only_plugins
else if BuildEnvironment is 'production'
  prod_only_plugins = [
    # production only plugins below
    new webpack.HashedModuleIdsPlugin()
    new webpack.optimize.UglifyJsPlugin
      compress:
        warnings: true
    new CompressionPlugin()
    new Clean local_build_dir
    ]
  AllPlugins = common_plugins.concat prod_only_plugins
else
  console.error "Bad BuildEnvironment", BuildEnvironment
  


WebPackConfig =
  entry:
    vendor: vendor
    index: './js/entries/index.js'
    newpage: './js/entries/newpage.js'
  output: WebPackOutput
  plugins: AllPlugins
  module:
    loaders: loaders
  resolve: resolve

if BuildEnvironment is 'dev'
  WebPackConfig.devServer =
    host: 'localhost'
    #proxy:
    #  '/api/*': 'http://localhost:8081'
    historyApiFallback:
      rewrites: [
        {from: /^\/$/, to: '/_devpages/index.html'}
        {from: /^\/newpage/, to: '/_devpages/newpage.html'}
        ]
    stats:
      colors: true
      modules: false
      chunks: true
      #reasons: true
      #maxModules: 9999
  WebPackConfig.devtool = 'source-map'

module.exports = WebPackConfig
