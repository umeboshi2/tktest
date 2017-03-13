config = require './base-app-config'

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
  {
    label: 'Old Style'
    url: '/'
  }
  {
    label: 'Hubby'
    url: '#hubby'
  }
  {
    label: 'Bumblr'
    url: '#bumblr'
  }
  misc_menu
  {
    label: 'Another'
    menu: [
      {
        label: 'Intro'
        url: '#pages/README'
      }
      {
        label: 'Login'
        url: '#frontdoor/login'
      }
    ]
  }
  ]


module.exports = config
