config = require 'tbirds/app-config'

config.brand.label = 'TKTest'
config.brand.url = '#'
misc_menu = 
  label: 'Misc Applets'
  menu: [
    {
      label: 'Bumblr'
      url: '#bumblr'
    }
    {
      label: 'Hubby'
      url: '#hubby'
    }
  ]

config.navbarEntries = [
  misc_menu
  {
    label: 'Hubby'
    url: '#hubby'
  }
  {
    label: 'Bumblr'
    url: '#bumblr'
  }
  {
    label: 'Another'
    menu: [
      {
        label: 'New App'
        url: '/another'
      }
      {
        label: 'Login'
        url: '#frontdoor/login'
      }
    ]
  }
  ]


module.exports = config
