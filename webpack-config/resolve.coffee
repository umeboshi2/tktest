# config resolve.
modules = require 'tbirds/src/webpack/resolve-modules'
extensions = require 'tbirds/src/webpack/resolve-extensions'
aliases = require './resolve-aliases'

module.exports =
  modules: modules
  alias: aliases
  extensions: extensions
