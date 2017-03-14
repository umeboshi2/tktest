var config, misc_menu;

config = require('./base-app-config');

misc_menu = {
  label: 'Misc Applets',
  menu: [
    {
      label: 'Bumblr',
      url: '#bumblr'
    }, {
      label: 'Hubby',
      url: '#hubby'
    }
  ]
};

config.navbarEntries = [
  {
    label: 'Old Style',
    url: '/'
  }, {
    label: 'Hubby',
    url: '#hubby'
  }, {
    label: 'Bumblr',
    url: '#bumblr'
  }, misc_menu, {
    label: 'Another',
    menu: [
      {
        label: 'Intro',
        url: '#pages/README'
      }, {
        label: 'Login',
        url: '#frontdoor/login'
      }
    ]
  }
];

module.exports = config;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9uZXdwYWdlLWNvbmZpZy5qcyIsInNvdXJjZXMiOlsiZW50cmllcy9uZXdwYWdlLWNvbmZpZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLG1CQUFSOztBQUVULFNBQUEsR0FDRTtFQUFBLEtBQUEsRUFBTyxjQUFQO0VBQ0EsSUFBQSxFQUFNO0lBQ0o7TUFDRSxLQUFBLEVBQU8sUUFEVDtNQUVFLEdBQUEsRUFBSyxTQUZQO0tBREksRUFLSjtNQUNFLEtBQUEsRUFBTyxPQURUO01BRUUsR0FBQSxFQUFLLFFBRlA7S0FMSTtHQUROOzs7QUFZRixNQUFNLENBQUMsYUFBUCxHQUF1QjtFQUNyQjtJQUNFLEtBQUEsRUFBTyxXQURUO0lBRUUsR0FBQSxFQUFLLEdBRlA7R0FEcUIsRUFLckI7SUFDRSxLQUFBLEVBQU8sT0FEVDtJQUVFLEdBQUEsRUFBSyxRQUZQO0dBTHFCLEVBU3JCO0lBQ0UsS0FBQSxFQUFPLFFBRFQ7SUFFRSxHQUFBLEVBQUssU0FGUDtHQVRxQixFQWFyQixTQWJxQixFQWNyQjtJQUNFLEtBQUEsRUFBTyxTQURUO0lBRUUsSUFBQSxFQUFNO01BQ0o7UUFDRSxLQUFBLEVBQU8sT0FEVDtRQUVFLEdBQUEsRUFBSyxlQUZQO09BREksRUFLSjtRQUNFLEtBQUEsRUFBTyxPQURUO1FBRUUsR0FBQSxFQUFLLGtCQUZQO09BTEk7S0FGUjtHQWRxQjs7O0FBOEJ2QixNQUFNLENBQUMsT0FBUCxHQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImNvbmZpZyA9IHJlcXVpcmUgJy4vYmFzZS1hcHAtY29uZmlnJ1xuXG5taXNjX21lbnUgPSBcbiAgbGFiZWw6ICdNaXNjIEFwcGxldHMnXG4gIG1lbnU6IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ0J1bWJscidcbiAgICAgIHVybDogJyNidW1ibHInXG4gICAgfVxuICAgIHtcbiAgICAgIGxhYmVsOiAnSHViYnknXG4gICAgICB1cmw6ICcjaHViYnknXG4gICAgfVxuICBdXG5cbmNvbmZpZy5uYXZiYXJFbnRyaWVzID0gW1xuICB7XG4gICAgbGFiZWw6ICdPbGQgU3R5bGUnXG4gICAgdXJsOiAnLydcbiAgfVxuICB7XG4gICAgbGFiZWw6ICdIdWJieSdcbiAgICB1cmw6ICcjaHViYnknXG4gIH1cbiAge1xuICAgIGxhYmVsOiAnQnVtYmxyJ1xuICAgIHVybDogJyNidW1ibHInXG4gIH1cbiAgbWlzY19tZW51XG4gIHtcbiAgICBsYWJlbDogJ0Fub3RoZXInXG4gICAgbWVudTogW1xuICAgICAge1xuICAgICAgICBsYWJlbDogJ0ludHJvJ1xuICAgICAgICB1cmw6ICcjcGFnZXMvUkVBRE1FJ1xuICAgICAgfVxuICAgICAge1xuICAgICAgICBsYWJlbDogJ0xvZ2luJ1xuICAgICAgICB1cmw6ICcjZnJvbnRkb29yL2xvZ2luJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuICBdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWdcbiJdfQ==
