# webpack config resolve.alias
path = require 'path'

make_aliases = require 'tbirds/dist/webpack/resolve-aliases'
aliases = make_aliases __dirname
aliases.tbirds = 'tbirds/src'
#nodeModulesPath = path.resolve __dirname, '..', 'node_modules'
console.log aliases

module.exports = aliases
