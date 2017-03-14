var Backbone, Controller, HubChannel, MainChannel, MainController, Marionette, MessageChannel, SlideDownRegion, ToolbarAppletLayout, ToolbarView, Util, ms, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

ms = require('ms');

MainController = require('agate/src/controllers').MainController;

SlideDownRegion = require('agate/src/regions').SlideDownRegion;

ToolbarAppletLayout = require('agate/src/views/layout').ToolbarAppletLayout;

Util = require('agate/src/apputil');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

HubChannel = Backbone.Radio.channel('hubby');

ToolbarView = (function(superClass) {
  extend(ToolbarView, superClass);

  function ToolbarView() {
    return ToolbarView.__super__.constructor.apply(this, arguments);
  }

  ToolbarView.prototype.template = tc.renderable(function() {
    tc.div('.btn-group.btn-group-justified', function() {
      tc.div('#show-calendar-button.btn.btn-default', function() {
        return tc.i('.fa.fa-calendar', ' Calendar');
      });
      return tc.div('#list-meetings-button.btn.btn-default', function() {
        return tc.i('.fa.fa-list', ' List Meetings');
      });
    });
    return tc.div('.input-group', function() {
      tc.input('.form-control', {
        type: 'text',
        placeholder: 'search',
        name: 'search'
      });
      return tc.span('.input-group-btn', function() {
        return tc.button('#search-button.btn.btn-default', function() {
          return tc.i('.fa.fa-search', 'Search');
        });
      });
    });
  });

  ToolbarView.prototype.ui = {
    search_bth: '#search-button',
    show_cal_btn: '#show-calendar-button',
    list_btn: '#list-meetings-button',
    search_entry: '.form-control'
  };

  ToolbarView.prototype.events = {
    'click @ui.show_cal_btn': 'show_calendar',
    'click @ui.list_btn': 'list_meetings',
    'click @ui.search_bth': 'search_hubby'
  };

  ToolbarView.prototype.show_calendar = function() {
    var controller, hash, l;
    l = window.location;
    hash = '#hubby';
    if (window.location.hash === hash) {
      controller = HubChannel.request('main-controller');
      return controller.mainview();
    } else {
      if (__DEV__) {
        console.log("current url", window.location);
      }
      return Util.navigate_to_url('#hubby');
    }
  };

  ToolbarView.prototype.list_meetings = function() {
    return Util.navigate_to_url('#hubby/listmeetings');
  };

  ToolbarView.prototype.search_hubby = function() {
    var controller, options;
    controller = HubChannel.request('main-controller');
    options = {
      searchParams: {
        title: this.ui.search_entry.val()
      }
    };
    console.log("search for", options);
    return controller.view_items(options);
  };

  return ToolbarView;

})(Backbone.Marionette.View);

Controller = (function(superClass) {
  extend(Controller, superClass);

  function Controller() {
    return Controller.__super__.constructor.apply(this, arguments);
  }

  Controller.prototype.layoutClass = ToolbarAppletLayout;

  Controller.prototype.setup_layout_if_needed = function() {
    Controller.__super__.setup_layout_if_needed.call(this);
    return this.layout.showChildView('toolbar', new ToolbarView);
  };

  Controller.prototype.show_calendar = function(layout, region) {
    return require.ensure([], (function(_this) {
      return function() {
        var MeetingCalendarView, options, view;
        MeetingCalendarView = require('./calendarview');
        options = {};
        if (region === 'minicalendar') {
          options.minicalendar = true;
          options.layout = layout;
        }
        view = new MeetingCalendarView(options);
        return layout.showChildView(region, view);
      };
    })(this), 'hubby-show-calendar');
  };

  Controller.prototype.mainview = function() {
    this.setup_layout_if_needed();
    return this.show_calendar(this.layout, 'content');
  };

  Controller.prototype.list_meetings = function() {
    this.setup_layout_if_needed();
    return require.ensure([], (function(_this) {
      return function() {
        var ListMeetingsView, MainMeetingModel, meetings, response;
        MainMeetingModel = require('./collections').MainMeetingModel;
        meetings = HubChannel.request('meetinglist');
        ListMeetingsView = require('./listmeetingsview');
        response = meetings.fetch();
        response.done(function() {
          var view;
          view = new ListMeetingsView({
            collection: meetings
          });
          return _this.layout.showChildView('content', view);
        });
        return response.fail(function() {
          return MessageChannel.request('danger', 'Failed to load meeting list');
        });
      };
    })(this), 'hubby-list-meetings-view');
  };

  Controller.prototype.show_meeting = function(layout, region, meeting_id) {
    return require.ensure([], (function(_this) {
      return function() {
        var MainMeetingModel, ShowMeetingView, meeting, response;
        MainMeetingModel = require('./collections').MainMeetingModel;
        ShowMeetingView = require('./meetingview');
        meeting = new MainMeetingModel({
          id: meeting_id
        });
        response = meeting.fetch();
        response.done(function() {
          var view;
          view = new ShowMeetingView({
            model: meeting
          });
          return layout.showChildView(region, view);
        });
        return response.fail(function() {
          return MessageChannel.request('danger', 'Failed to load meeting');
        });
      };
    })(this), 'hubby-meetingview');
  };

  Controller.prototype.view_meeting = function(meeting_id) {
    this.setup_layout_if_needed();
    return this.show_meeting(this.layout, 'content', meeting_id);
  };

  Controller.prototype.view_items = function(options) {
    this.setup_layout_if_needed();
    return this.list_items(this.layout, 'content', options);
  };

  Controller.prototype.list_items = function(layout, region, options) {
    return require.ensure([], (function(_this) {
      return function() {
        var ItemCollection, ListItemsView, items, response;
        ItemCollection = require('./collections').ItemCollection;
        ListItemsView = require('./search-items-view');
        items = new ItemCollection([]);
        items.searchParams = options.searchParams;
        console.log('ItemCollection', items);
        response = items.fetch();
        return response.done(function() {
          var view;
          view = new ListItemsView({
            collection: items
          });
          return layout.showChildView(region, view);
        });
      };
    })(this), 'hubby-search-items-view');
  };

  return Controller;

})(MainController);

module.exports = Controller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9jb250cm9sbGVyLmpzIiwic291cmNlcyI6WyJhcHBsZXRzL2h1YmJ5L2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsMEpBQUE7RUFBQTs7O0FBQUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxVQUFSOztBQUNYLFVBQUEsR0FBYSxPQUFBLENBQVEscUJBQVI7O0FBQ2IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxRQUFSOztBQUNMLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFFSCxpQkFBbUIsT0FBQSxDQUFRLHVCQUFSOztBQUNuQixrQkFBb0IsT0FBQSxDQUFRLG1CQUFSOztBQUNwQixzQkFBd0IsT0FBQSxDQUFRLHdCQUFSOztBQUMxQixJQUFBLEdBQU8sT0FBQSxDQUFRLG1CQUFSOztBQUVQLFdBQUEsR0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7O0FBQ2QsY0FBQSxHQUFpQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsVUFBdkI7O0FBQ2pCLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBRVA7Ozs7Ozs7d0JBQ0osUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtJQUN0QixFQUFFLENBQUMsR0FBSCxDQUFPLGdDQUFQLEVBQXlDLFNBQUE7TUFDdkMsRUFBRSxDQUFDLEdBQUgsQ0FBTyx1Q0FBUCxFQUFnRCxTQUFBO2VBQzlDLEVBQUUsQ0FBQyxDQUFILENBQUssaUJBQUwsRUFBd0IsV0FBeEI7TUFEOEMsQ0FBaEQ7YUFFQSxFQUFFLENBQUMsR0FBSCxDQUFPLHVDQUFQLEVBQWdELFNBQUE7ZUFDOUMsRUFBRSxDQUFDLENBQUgsQ0FBSyxhQUFMLEVBQW9CLGdCQUFwQjtNQUQ4QyxDQUFoRDtJQUh1QyxDQUF6QztXQUtBLEVBQUUsQ0FBQyxHQUFILENBQU8sY0FBUCxFQUF1QixTQUFBO01BQ3JCLEVBQUUsQ0FBQyxLQUFILENBQVMsZUFBVCxFQUEwQjtRQUFBLElBQUEsRUFBSyxNQUFMO1FBQWEsV0FBQSxFQUFZLFFBQXpCO1FBQzFCLElBQUEsRUFBSyxRQURxQjtPQUExQjthQUVBLEVBQUUsQ0FBQyxJQUFILENBQVEsa0JBQVIsRUFBNEIsU0FBQTtlQUMxQixFQUFFLENBQUMsTUFBSCxDQUFVLGdDQUFWLEVBQTRDLFNBQUE7aUJBQzFDLEVBQUUsQ0FBQyxDQUFILENBQUssZUFBTCxFQUFzQixRQUF0QjtRQUQwQyxDQUE1QztNQUQwQixDQUE1QjtJQUhxQixDQUF2QjtFQU5zQixDQUFkOzt3QkFhVixFQUFBLEdBQ0U7SUFBQSxVQUFBLEVBQVksZ0JBQVo7SUFDQSxZQUFBLEVBQWMsdUJBRGQ7SUFFQSxRQUFBLEVBQVUsdUJBRlY7SUFHQSxZQUFBLEVBQWMsZUFIZDs7O3dCQUtGLE1BQUEsR0FDRTtJQUFBLHdCQUFBLEVBQTBCLGVBQTFCO0lBQ0Esb0JBQUEsRUFBc0IsZUFEdEI7SUFFQSxzQkFBQSxFQUF3QixjQUZ4Qjs7O3dCQUlGLGFBQUEsR0FBZSxTQUFBO0FBQ2IsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFDWCxJQUFBLEdBQU87SUFDUCxJQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsS0FBd0IsSUFBM0I7TUFDRSxVQUFBLEdBQWEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsaUJBQW5CO2FBQ2IsVUFBVSxDQUFDLFFBQVgsQ0FBQSxFQUZGO0tBQUEsTUFBQTtNQUlFLElBQUcsT0FBSDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBWixFQUEyQixNQUFNLENBQUMsUUFBbEMsRUFERjs7YUFFQSxJQUFJLENBQUMsZUFBTCxDQUFxQixRQUFyQixFQU5GOztFQUhhOzt3QkFXZixhQUFBLEdBQWUsU0FBQTtXQUNiLElBQUksQ0FBQyxlQUFMLENBQXFCLHFCQUFyQjtFQURhOzt3QkFHZixZQUFBLEdBQWMsU0FBQTtBQUNaLFFBQUE7SUFBQSxVQUFBLEdBQWEsVUFBVSxDQUFDLE9BQVgsQ0FBbUIsaUJBQW5CO0lBQ2IsT0FBQSxHQUNFO01BQUEsWUFBQSxFQUNFO1FBQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQWpCLENBQUEsQ0FBUDtPQURGOztJQUVGLE9BQU8sQ0FBQyxHQUFSLENBQVksWUFBWixFQUEwQixPQUExQjtXQUNBLFVBQVUsQ0FBQyxVQUFYLENBQXNCLE9BQXRCO0VBTlk7Ozs7R0F2Q1UsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUErQ3hDOzs7Ozs7O3VCQUNKLFdBQUEsR0FBYTs7dUJBQ2Isc0JBQUEsR0FBd0IsU0FBQTtJQUN0QixxREFBQTtXQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFJLFdBQXJDO0VBRnNCOzt1QkFJeEIsYUFBQSxHQUFlLFNBQUMsTUFBRCxFQUFTLE1BQVQ7V0FFYixPQUFPLENBQUMsTUFBUixDQUFlLEVBQWYsRUFBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ2pCLFlBQUE7UUFBQSxtQkFBQSxHQUF1QixPQUFBLENBQVEsZ0JBQVI7UUFDdkIsT0FBQSxHQUFVO1FBQ1YsSUFBRyxNQUFBLEtBQVUsY0FBYjtVQUNFLE9BQU8sQ0FBQyxZQUFSLEdBQXVCO1VBQ3ZCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE9BRm5COztRQUdBLElBQUEsR0FBTyxJQUFJLG1CQUFKLENBQXdCLE9BQXhCO2VBQ1AsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsTUFBckIsRUFBNkIsSUFBN0I7TUFQaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBU0UscUJBVEY7RUFGYTs7dUJBYWYsUUFBQSxHQUFVLFNBQUE7SUFDUixJQUFDLENBQUEsc0JBQUQsQ0FBQTtXQUVBLElBQUMsQ0FBQSxhQUFELENBQWUsSUFBQyxDQUFBLE1BQWhCLEVBQXdCLFNBQXhCO0VBSFE7O3VCQU1WLGFBQUEsR0FBZSxTQUFBO0lBQ2IsSUFBQyxDQUFBLHNCQUFELENBQUE7V0FDQSxPQUFPLENBQUMsTUFBUixDQUFlLEVBQWYsRUFBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ2pCLFlBQUE7UUFBRSxtQkFBcUIsT0FBQSxDQUFRLGVBQVI7UUFDdkIsUUFBQSxHQUFXLFVBQVUsQ0FBQyxPQUFYLENBQW1CLGFBQW5CO1FBQ1gsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLG9CQUFSO1FBQ25CLFFBQUEsR0FBVyxRQUFRLENBQUMsS0FBVCxDQUFBO1FBQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFBO0FBQ1osY0FBQTtVQUFBLElBQUEsR0FBTyxJQUFJLGdCQUFKLENBQ0w7WUFBQSxVQUFBLEVBQVksUUFBWjtXQURLO2lCQUVQLEtBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixTQUF0QixFQUFpQyxJQUFqQztRQUhZLENBQWQ7ZUFJQSxRQUFRLENBQUMsSUFBVCxDQUFjLFNBQUE7aUJBQ1osY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsNkJBQWpDO1FBRFksQ0FBZDtNQVRpQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsRUFZRSwwQkFaRjtFQUZhOzt1QkFrQmYsWUFBQSxHQUFjLFNBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsVUFBakI7V0FDWixPQUFPLENBQUMsTUFBUixDQUFlLEVBQWYsRUFBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO0FBQ2pCLFlBQUE7UUFBRSxtQkFBcUIsT0FBQSxDQUFRLGVBQVI7UUFDdkIsZUFBQSxHQUFtQixPQUFBLENBQVEsZUFBUjtRQUNuQixPQUFBLEdBQVUsSUFBSSxnQkFBSixDQUNSO1VBQUEsRUFBQSxFQUFJLFVBQUo7U0FEUTtRQUVWLFFBQUEsR0FBVyxPQUFPLENBQUMsS0FBUixDQUFBO1FBQ1gsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFBO0FBQ1osY0FBQTtVQUFBLElBQUEsR0FBTyxJQUFJLGVBQUosQ0FDTDtZQUFBLEtBQUEsRUFBTyxPQUFQO1dBREs7aUJBRVAsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsTUFBckIsRUFBNkIsSUFBN0I7UUFIWSxDQUFkO2VBSUEsUUFBUSxDQUFDLElBQVQsQ0FBYyxTQUFBO2lCQUNaLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLHdCQUFqQztRQURZLENBQWQ7TUFWaUI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBYUUsbUJBYkY7RUFEWTs7dUJBZ0JkLFlBQUEsR0FBYyxTQUFDLFVBQUQ7SUFDWixJQUFDLENBQUEsc0JBQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLE1BQWYsRUFBdUIsU0FBdkIsRUFBa0MsVUFBbEM7RUFGWTs7dUJBSWQsVUFBQSxHQUFZLFNBQUMsT0FBRDtJQUNWLElBQUMsQ0FBQSxzQkFBRCxDQUFBO1dBQ0EsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsTUFBYixFQUFxQixTQUFyQixFQUFnQyxPQUFoQztFQUZVOzt1QkFJWixVQUFBLEdBQVksU0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixPQUFqQjtXQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsRUFBZixFQUFtQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7QUFDakIsWUFBQTtRQUFFLGlCQUFtQixPQUFBLENBQVEsZUFBUjtRQUNyQixhQUFBLEdBQWlCLE9BQUEsQ0FBUSxxQkFBUjtRQUNqQixLQUFBLEdBQVEsSUFBSSxjQUFKLENBQW1CLEVBQW5CO1FBQ1IsS0FBSyxDQUFDLFlBQU4sR0FBcUIsT0FBTyxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsS0FBOUI7UUFDQSxRQUFBLEdBQVcsS0FBSyxDQUFDLEtBQU4sQ0FBQTtlQUNYLFFBQVEsQ0FBQyxJQUFULENBQWMsU0FBQTtBQUNaLGNBQUE7VUFBQSxJQUFBLEdBQU8sSUFBSSxhQUFKLENBQ0w7WUFBQSxVQUFBLEVBQVksS0FBWjtXQURLO2lCQUVQLE1BQU0sQ0FBQyxhQUFQLENBQXFCLE1BQXJCLEVBQTZCLElBQTdCO1FBSFksQ0FBZDtNQVBpQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsRUFZRSx5QkFaRjtFQURVOzs7O0dBbkVXOztBQWtGekIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcbm1zID0gcmVxdWlyZSAnbXMnXG5cbnsgTWFpbkNvbnRyb2xsZXIgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9jb250cm9sbGVycydcbnsgU2xpZGVEb3duUmVnaW9uIH0gPSByZXF1aXJlICdhZ2F0ZS9zcmMvcmVnaW9ucydcbnsgVG9vbGJhckFwcGxldExheW91dCB9ID0gcmVxdWlyZSAnYWdhdGUvc3JjL3ZpZXdzL2xheW91dCdcblV0aWwgPSByZXF1aXJlICdhZ2F0ZS9zcmMvYXBwdXRpbCdcblxuTWFpbkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdnbG9iYWwnXG5NZXNzYWdlQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ21lc3NhZ2VzJ1xuSHViQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2h1YmJ5J1xuXG5jbGFzcyBUb29sYmFyVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogdGMucmVuZGVyYWJsZSAoKSAtPlxuICAgIHRjLmRpdiAnLmJ0bi1ncm91cC5idG4tZ3JvdXAtanVzdGlmaWVkJywgLT5cbiAgICAgIHRjLmRpdiAnI3Nob3ctY2FsZW5kYXItYnV0dG9uLmJ0bi5idG4tZGVmYXVsdCcsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1jYWxlbmRhcicsICcgQ2FsZW5kYXInXG4gICAgICB0Yy5kaXYgJyNsaXN0LW1lZXRpbmdzLWJ1dHRvbi5idG4uYnRuLWRlZmF1bHQnLCAtPlxuICAgICAgICB0Yy5pICcuZmEuZmEtbGlzdCcsICcgTGlzdCBNZWV0aW5ncydcbiAgICB0Yy5kaXYgJy5pbnB1dC1ncm91cCcsIC0+XG4gICAgICB0Yy5pbnB1dCAnLmZvcm0tY29udHJvbCcsIHR5cGU6J3RleHQnLCBwbGFjZWhvbGRlcjonc2VhcmNoJyxcbiAgICAgIG5hbWU6J3NlYXJjaCdcbiAgICAgIHRjLnNwYW4gJy5pbnB1dC1ncm91cC1idG4nLCAtPlxuICAgICAgICB0Yy5idXR0b24gJyNzZWFyY2gtYnV0dG9uLmJ0bi5idG4tZGVmYXVsdCcsIC0+XG4gICAgICAgICAgdGMuaSAnLmZhLmZhLXNlYXJjaCcsICdTZWFyY2gnXG4gICAgICAgIFxuICB1aTpcbiAgICBzZWFyY2hfYnRoOiAnI3NlYXJjaC1idXR0b24nXG4gICAgc2hvd19jYWxfYnRuOiAnI3Nob3ctY2FsZW5kYXItYnV0dG9uJ1xuICAgIGxpc3RfYnRuOiAnI2xpc3QtbWVldGluZ3MtYnV0dG9uJ1xuICAgIHNlYXJjaF9lbnRyeTogJy5mb3JtLWNvbnRyb2wnXG4gICAgXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLnNob3dfY2FsX2J0bic6ICdzaG93X2NhbGVuZGFyJ1xuICAgICdjbGljayBAdWkubGlzdF9idG4nOiAnbGlzdF9tZWV0aW5ncydcbiAgICAnY2xpY2sgQHVpLnNlYXJjaF9idGgnOiAnc2VhcmNoX2h1YmJ5J1xuXG4gIHNob3dfY2FsZW5kYXI6IC0+XG4gICAgbCA9IHdpbmRvdy5sb2NhdGlvblxuICAgIGhhc2ggPSAnI2h1YmJ5J1xuICAgIGlmIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09IGhhc2hcbiAgICAgIGNvbnRyb2xsZXIgPSBIdWJDaGFubmVsLnJlcXVlc3QgJ21haW4tY29udHJvbGxlcidcbiAgICAgIGNvbnRyb2xsZXIubWFpbnZpZXcoKVxuICAgIGVsc2VcbiAgICAgIGlmIF9fREVWX19cbiAgICAgICAgY29uc29sZS5sb2cgXCJjdXJyZW50IHVybFwiLCB3aW5kb3cubG9jYXRpb25cbiAgICAgIFV0aWwubmF2aWdhdGVfdG9fdXJsICcjaHViYnknXG5cbiAgbGlzdF9tZWV0aW5nczogLT5cbiAgICBVdGlsLm5hdmlnYXRlX3RvX3VybCAnI2h1YmJ5L2xpc3RtZWV0aW5ncydcblxuICBzZWFyY2hfaHViYnk6IC0+XG4gICAgY29udHJvbGxlciA9IEh1YkNoYW5uZWwucmVxdWVzdCAnbWFpbi1jb250cm9sbGVyJ1xuICAgIG9wdGlvbnMgPVxuICAgICAgc2VhcmNoUGFyYW1zOlxuICAgICAgICB0aXRsZTogQHVpLnNlYXJjaF9lbnRyeS52YWwoKVxuICAgIGNvbnNvbGUubG9nIFwic2VhcmNoIGZvclwiLCBvcHRpb25zXG4gICAgY29udHJvbGxlci52aWV3X2l0ZW1zIG9wdGlvbnNcbiAgICBcbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYWluQ29udHJvbGxlclxuICBsYXlvdXRDbGFzczogVG9vbGJhckFwcGxldExheW91dFxuICBzZXR1cF9sYXlvdXRfaWZfbmVlZGVkOiAtPlxuICAgIHN1cGVyKClcbiAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ3Rvb2xiYXInLCBuZXcgVG9vbGJhclZpZXdcblxuICBzaG93X2NhbGVuZGFyOiAobGF5b3V0LCByZWdpb24pIC0+XG4gICAgI2NvbnNvbGUubG9nIFwic2hvd19jYWxlbmRhclwiLCBsYXlvdXQsIHJlZ2lvblxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgTWVldGluZ0NhbGVuZGFyVmlldyAgPSByZXF1aXJlICcuL2NhbGVuZGFydmlldydcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgICAgaWYgcmVnaW9uID09ICdtaW5pY2FsZW5kYXInXG4gICAgICAgIG9wdGlvbnMubWluaWNhbGVuZGFyID0gdHJ1ZVxuICAgICAgICBvcHRpb25zLmxheW91dCA9IGxheW91dFxuICAgICAgdmlldyA9IG5ldyBNZWV0aW5nQ2FsZW5kYXJWaWV3IG9wdGlvbnNcbiAgICAgIGxheW91dC5zaG93Q2hpbGRWaWV3IHJlZ2lvbiwgdmlld1xuICAgICMgbmFtZSB0aGUgY2h1bmtcbiAgICAsICdodWJieS1zaG93LWNhbGVuZGFyJ1xuICAgIFxuICBtYWludmlldzogLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgI2NvbnNvbGUubG9nIFwibWFpbnZpZXdcIlxuICAgIEBzaG93X2NhbGVuZGFyIEBsYXlvdXQsICdjb250ZW50J1xuICAgIFxuXG4gIGxpc3RfbWVldGluZ3M6IC0+XG4gICAgQHNldHVwX2xheW91dF9pZl9uZWVkZWQoKVxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgeyBNYWluTWVldGluZ01vZGVsIH0gPSByZXF1aXJlICcuL2NvbGxlY3Rpb25zJ1xuICAgICAgbWVldGluZ3MgPSBIdWJDaGFubmVsLnJlcXVlc3QgJ21lZXRpbmdsaXN0J1xuICAgICAgTGlzdE1lZXRpbmdzVmlldyA9IHJlcXVpcmUgJy4vbGlzdG1lZXRpbmdzdmlldydcbiAgICAgIHJlc3BvbnNlID0gbWVldGluZ3MuZmV0Y2goKVxuICAgICAgcmVzcG9uc2UuZG9uZSA9PlxuICAgICAgICB2aWV3ID0gbmV3IExpc3RNZWV0aW5nc1ZpZXdcbiAgICAgICAgICBjb2xsZWN0aW9uOiBtZWV0aW5nc1xuICAgICAgICBAbGF5b3V0LnNob3dDaGlsZFZpZXcgJ2NvbnRlbnQnLCB2aWV3XG4gICAgICByZXNwb25zZS5mYWlsID0+XG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsICdGYWlsZWQgdG8gbG9hZCBtZWV0aW5nIGxpc3QnXG4gICAgIyBuYW1lIHRoZSBjaHVua1xuICAgICwgJ2h1YmJ5LWxpc3QtbWVldGluZ3MtdmlldydcblxuICAgIFxuXG4gIHNob3dfbWVldGluZzogKGxheW91dCwgcmVnaW9uLCBtZWV0aW5nX2lkKSAtPlxuICAgIHJlcXVpcmUuZW5zdXJlIFtdLCAoKSA9PlxuICAgICAgeyBNYWluTWVldGluZ01vZGVsIH0gPSByZXF1aXJlICcuL2NvbGxlY3Rpb25zJ1xuICAgICAgU2hvd01lZXRpbmdWaWV3ICA9IHJlcXVpcmUgJy4vbWVldGluZ3ZpZXcnXG4gICAgICBtZWV0aW5nID0gbmV3IE1haW5NZWV0aW5nTW9kZWxcbiAgICAgICAgaWQ6IG1lZXRpbmdfaWRcbiAgICAgIHJlc3BvbnNlID0gbWVldGluZy5mZXRjaCgpXG4gICAgICByZXNwb25zZS5kb25lID0+XG4gICAgICAgIHZpZXcgPSBuZXcgU2hvd01lZXRpbmdWaWV3XG4gICAgICAgICAgbW9kZWw6IG1lZXRpbmdcbiAgICAgICAgbGF5b3V0LnNob3dDaGlsZFZpZXcgcmVnaW9uLCB2aWV3XG4gICAgICByZXNwb25zZS5mYWlsID0+XG4gICAgICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RhbmdlcicsICdGYWlsZWQgdG8gbG9hZCBtZWV0aW5nJ1xuICAgICMgbmFtZSB0aGUgY2h1bmtcbiAgICAsICdodWJieS1tZWV0aW5ndmlldydcbiAgICBcbiAgdmlld19tZWV0aW5nOiAobWVldGluZ19pZCkgLT5cbiAgICBAc2V0dXBfbGF5b3V0X2lmX25lZWRlZCgpXG4gICAgQHNob3dfbWVldGluZyBAbGF5b3V0LCAnY29udGVudCcsIG1lZXRpbmdfaWRcbiAgICBcbiAgdmlld19pdGVtczogKG9wdGlvbnMpIC0+XG4gICAgQHNldHVwX2xheW91dF9pZl9uZWVkZWQoKVxuICAgIEBsaXN0X2l0ZW1zIEBsYXlvdXQsICdjb250ZW50Jywgb3B0aW9uc1xuXG4gIGxpc3RfaXRlbXM6IChsYXlvdXQsIHJlZ2lvbiwgb3B0aW9ucykgLT5cbiAgICByZXF1aXJlLmVuc3VyZSBbXSwgKCkgPT5cbiAgICAgIHsgSXRlbUNvbGxlY3Rpb24gfSA9IHJlcXVpcmUgJy4vY29sbGVjdGlvbnMnXG4gICAgICBMaXN0SXRlbXNWaWV3ICA9IHJlcXVpcmUgJy4vc2VhcmNoLWl0ZW1zLXZpZXcnXG4gICAgICBpdGVtcyA9IG5ldyBJdGVtQ29sbGVjdGlvbiBbXVxuICAgICAgaXRlbXMuc2VhcmNoUGFyYW1zID0gb3B0aW9ucy5zZWFyY2hQYXJhbXNcbiAgICAgIGNvbnNvbGUubG9nICdJdGVtQ29sbGVjdGlvbicsIGl0ZW1zXG4gICAgICByZXNwb25zZSA9IGl0ZW1zLmZldGNoKClcbiAgICAgIHJlc3BvbnNlLmRvbmUgPT5cbiAgICAgICAgdmlldyA9IG5ldyBMaXN0SXRlbXNWaWV3XG4gICAgICAgICAgY29sbGVjdGlvbjogaXRlbXNcbiAgICAgICAgbGF5b3V0LnNob3dDaGlsZFZpZXcgcmVnaW9uLCB2aWV3XG4gICAgIyBuYW1lIHRoZSBjaHVua1xuICAgICwgJ2h1YmJ5LXNlYXJjaC1pdGVtcy12aWV3J1xuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyXG5cbiJdfQ==
