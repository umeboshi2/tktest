beautify = require('js-beautify').html

pages = require './templates'

# Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

try
  webpackManifest = require '../../build/manifest.json'
catch err
  webpackManifest =
      'common.js': 'common.js'
      'vendor.js': 'vendor.js'


# FIXME require this  
UseMiddleware = false or process.env.__DEV_MIDDLEWARE__ is 'true'

get_manifest = (name) ->
  if process.env.NODE_ENV == 'development'
    manifest =
      'common.js': 'common.js'
      'vendor.js': 'vendor.js'
    filename = "#{name}.js"
    manifest[filename] = filename
  else
    manifest = webpackManifest
  return manifest


create_page_html = (name, manifest, theme, clients) ->
  page = pages[name] manifest, theme, clients
  beautify page

make_page_header = (res, page) ->
  res.writeHead 200,
    'Content-Length': Buffer.byteLength page
    'Content-Type': 'text/html'
  
write_page = (page, res, next) ->
  make_page_header res, page
  res.write page
  res.end()
  next()      

make_page = (name) ->
  (req, res, next) ->
    # FIXME make a site config
    #theme = 'custom'
    theme = 'cornsilk'
    manifest = get_manifest name
    page = create_page_html name, manifest, theme
    write_page page, res, next
  
make_page_html = (name) ->
  # FIXME make a site config
  theme = 'cornsilk'
  manifest = get_manifest name
  page = create_page_html name, manifest, theme
  return page

module.exports =
  make_page: make_page
  make_page_html: make_page_html
  templates: pages
  
