# inspired by https://github.com/KyleAMathews/coffee-react-quickstart
# 
fs = require 'fs'
path = require 'path'

gulp = require 'gulp'
gutil = require 'gulp-util'
size = require 'gulp-size'
shell = require 'shelljs'
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'


coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'devpages', (cb) ->
  pages = require './src/pages'
  dname = './_devpages'
  if not shell.test '-d', dname
    fs.mkdirSync dname
    console.log "Created directory", dname
  for tmpl of pages.templates
    page = pages.make_page_html tmpl
    fname = path.join dname, "#{tmpl}.html"
    fs.writeFileSync fname, page
    console.log "Created new page #{fname}"

gulp.task 'pages', (cb) ->
  process.env.PRODUCTION_BUILD = 'true'
  process.env.NODE_ENV = 'production'
  pages = require './src/pages'
  for tmpl of pages.templates
    page = pages.make_page_html tmpl
    fname = "#{tmpl}.html"
    fs.writeFileSync fname, page
    console.log "Created new page #{fname}"

gulp.task 'coffee', () ->
  gulp.src('./client/**/*.coffee')
  .pipe sourcemaps.init()
  .pipe coffee
    bare: true
  .pipe sourcemaps.write()
  .on 'error', gutil.log
  .pipe size
    showFiles: true
  .pipe gulp.dest './js'


devServer = {}
gulp.task "webpack-dev-server", ['devpages'], (callback) ->
  # Start a webpack-dev-server.
  webpackConfig = require "./webpack.config"
  devServer = new WebpackDevServer(webpack(webpackConfig))
  devServer.listen 8080, "0.0.0.0", (err) ->
    throw new gutil.PluginError("webpack-dev-server", err) if err
    gutil.log "[webpack-dev-server]", "http://localhost:8080"
    callback()
  return


gulp.task 'webpack:build-prod', (callback) ->
  statopts = 
    colors: true
    chunks: true
    modules: false
    reasons: true
    maxModules: 9999
  # run webpack
  process.env.NODE_ENV = 'production'
  process.env.PRODUCTION_BUILD = 'true'
  ProdConfig = require './webpack.config'
  prodCompiler = webpack ProdConfig
  prodCompiler.run (err, stats) ->
    throw new gutil.PluginError('webpack:build-prod', err) if err
    gutil.log "[webpack:build-prod]", stats.toString statopts
    callback()
    return
  return


gulp.task "production", ['webpack:build-prod'], (callback) ->
  gulp.start 'pages'
  
gulp.task 'default', ->
  gulp.start 'webpack-dev-server'
  
#gulp.task 'production', ->
#  gulp.start 'webpack:build-prod'
