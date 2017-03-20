# config resolve.
aliases = require './resolve-aliases' 
modules = require 'agate/src/webpack/resolve-modules'
extensions = require 'agate/src/webpack/resolve-extensions'

module.exports =
  modules: modules
  alias: aliases
  extensions: extensions
