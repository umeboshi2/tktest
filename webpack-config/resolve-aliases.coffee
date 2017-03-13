# webpack config resolve.alias
path = require 'path'
nodeModulesPath = path.resolve __dirname, '..', 'node_modules'

phaserbuild = path.resolve nodeModulesPath, 'phaser/build/custom'
phaser = path.resolve phaserbuild, 'phaser-split.js'
pixi = path.resolve phaserbuild, 'pixi.js'
p2 = path.resolve phaserbuild, 'p2.js'

module.exports =
  jquery: 'jquery/src/jquery'
  'bootstrap-fileinput-css': 'bootstrap-fileinput/css/fileinput.min.css'
  'bootstrap-fileinput-js': 'bootstrap-fileinput/js/fileinput.min.js'
  tablednd: 'TableDnD/js/jquery.tablednd.js'
  request: 'browser-request'
  'tag-it': 'tag-it/js/tag-it.js'
  common: path.join __dirname, '../coffee/common'
  phaser: phaser
  pixi: pixi
  p2: p2
  
