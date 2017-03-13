# config resolve.
path = require 'path'
webpack = require 'webpack'

aliases = require './resolve-aliases'

module.exports =
  modules: [
    path.join __dirname, '..', 'src'
    'node_modules'
    'bower_components'
    ]
  alias: aliases
  extensions: [
    # fixed webpack2
    # MUST include empty string
    # https://webpack.github.io/docs/configuration.html#resolve-extensions
    #''
    '.webpack.js'
    '.web.js'
    '.js'
    # add coffescript files to the list
    '.coffee'
  ]
  # FIXME determine if bower resolve works
  #plugins: [
  #  new webpack.ResolverPlugin
  #    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin
  #      "bower.json", ["main"]
  #    ['normal', 'loader']
  #]


