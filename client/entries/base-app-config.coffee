MainPageLayout = require './layout'

module.exports =
  # This is the html element to attach
  # the app.  This is to be marionette Region
  appRegion: 'body'
  # This is a marionette view with regions
  layout: MainPageLayout
  # here you can set options to be passed
  # to the layout
  layoutOptions: {}
  # set this to false if you don't need
  # messages
  useMessages: true
  # set useNavbar to false to skip
  # using a navbar in the app
  useNavbar: true
  # this is the brand entry for the navbar
  brand:
    label: 'Tk-Test'
    url: '#'
  # navbar entries is an array of objects
  navbarEntries: []
  # appletRoutes lets you place
  # the applet name as a property
  # with the applet directory name
  # as a value.  The AppRouter should
  # respond to property prefixes urls.
  appletRoutes:
    pages: 'frontdoor'
    
