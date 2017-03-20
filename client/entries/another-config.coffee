config = require 'tbirds/base-tkapp-config'

config.brand.url = '/'

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
    label: 'Yet Another'
    menu: [
      {
        label: 'Login'
        url: '#frontdoor/login'
      }
    ]
  }
  ]


module.exports = config
