config = require 'agate/src/base-tkapp-config'

misc_menu = 
  label: 'Misc Applets'
  menu: [
    {
      label: 'bumblr'
      url: '#bumblr'
    }
    {
      label: 'Hubby'
      url: '#hubby'
    }
  ]

config.navbarEntries = [
  {
    label: 'New App'
    url: '/newpage'
  }
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
        label: 'Login'
        url: '#frontdoor/login'
      }
    ]
  }
  ]


module.exports = config
