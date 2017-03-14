var Backbone, FullCalendar, HubChannel, Marionette, MeetingCalendarView, apiroot, calendar_view_render, loading_calendar_events, meeting_calendar, render_calendar_event, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

FullCalendar = require('fullcalendar');

apiroot = require('./collections').apiroot;

require('fullcalendar/dist/fullcalendar.css');

HubChannel = Backbone.Radio.channel('hubby');

tc = require('teacup');

meeting_calendar = tc.renderable(function() {
  tc.div('.listview-header', 'Meetings');
  tc.div('#loading', function() {
    return tc.h2(function() {
      tc.i('.fa.fa-spinner.fa-spin');
      return tc.text('Loading Meetings');
    });
  });
  return tc.div('#maincalendar');
});

render_calendar_event = function(calEvent, element) {
  calEvent.url = "#hubby/viewmeeting/" + calEvent.id;
  return element.css({
    cursor: 'pointer',
    'font-size': '0.9em',
    'font-family': 'Rambla'
  });
};

calendar_view_render = function(view, element) {
  return HubChannel.request('maincalendar:set-date');
};

loading_calendar_events = function(bool) {
  var header, loading;
  loading = $('#loading');
  header = $('.fc-toolbar');
  if (bool) {
    loading.show();
    return header.hide();
  } else {
    loading.hide();
    return header.show();
  }
};

MeetingCalendarView = (function(superClass) {
  extend(MeetingCalendarView, superClass);

  function MeetingCalendarView() {
    return MeetingCalendarView.__super__.constructor.apply(this, arguments);
  }

  MeetingCalendarView.prototype.template = meeting_calendar;

  MeetingCalendarView.prototype.ui = {
    calendar: '#maincalendar'
  };

  MeetingCalendarView.prototype.options = {
    minicalendar: false,
    layout: false
  };

  MeetingCalendarView.prototype.onDomRefresh = function() {
    var cal, calEventClick, date;
    calEventClick = (function(_this) {
      return function(event) {
        var meeting_id, url;
        if (!_this.options.minicalendar) {
          url = event.url;
          return Backbone.history.navigate(url, {
            trigger: true
          });
        } else {
          meeting_id = event.id;
          return HubChannel.request('view-meeting', _this.options.layout, 'meeting', meeting_id);
        }
      };
    })(this);
    date = HubChannel.request('maincalendar:get-date');
    cal = this.ui.calendar;
    cal.fullCalendar({
      header: {
        left: 'prevYear, nextYear',
        center: 'title',
        right: 'prev, next'
      },
      theme: false,
      defaultView: 'month',
      eventSources: [
        {
          url: apiroot + "/meetings/hubcal"
        }
      ],
      eventRender: render_calendar_event,
      viewRender: calendar_view_render,
      loading: loading_calendar_events,
      eventClick: calEventClick
    });
    if (date !== void 0) {
      return cal.fullCalendar('gotoDate', date);
    }
  };

  return MeetingCalendarView;

})(Backbone.Marionette.View);

module.exports = MeetingCalendarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9jYWxlbmRhcnZpZXcuanMiLCJzb3VyY2VzIjpbImFwcGxldHMvaHViYnkvY2FsZW5kYXJ2aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHdLQUFBO0VBQUE7OztBQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsVUFBUjs7QUFDWCxVQUFBLEdBQWEsT0FBQSxDQUFRLHFCQUFSOztBQUViLFlBQUEsR0FBZSxPQUFBLENBQVEsY0FBUjs7QUFFYixVQUFZLE9BQUEsQ0FBUSxlQUFSOztBQUlkLE9BQUEsQ0FBUSxvQ0FBUjs7QUFFQSxVQUFBLEdBQWEsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLE9BQXZCOztBQU1iLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxnQkFBQSxHQUFtQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUE7RUFDL0IsRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUCxFQUEyQixVQUEzQjtFQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sVUFBUCxFQUFtQixTQUFBO1dBQ2pCLEVBQUUsQ0FBQyxFQUFILENBQU0sU0FBQTtNQUNKLEVBQUUsQ0FBQyxDQUFILENBQUssd0JBQUw7YUFDQSxFQUFFLENBQUMsSUFBSCxDQUFRLGtCQUFSO0lBRkksQ0FBTjtFQURpQixDQUFuQjtTQUlBLEVBQUUsQ0FBQyxHQUFILENBQU8sZUFBUDtBQU4rQixDQUFkOztBQVNuQixxQkFBQSxHQUF3QixTQUFDLFFBQUQsRUFBVyxPQUFYO0VBQ3RCLFFBQVEsQ0FBQyxHQUFULEdBQWUscUJBQUEsR0FBc0IsUUFBUSxDQUFDO1NBQzlDLE9BQU8sQ0FBQyxHQUFSLENBQ0U7SUFBQSxNQUFBLEVBQVEsU0FBUjtJQUNBLFdBQUEsRUFBYSxPQURiO0lBRUEsYUFBQSxFQUFlLFFBRmY7R0FERjtBQUZzQjs7QUFPeEIsb0JBQUEsR0FBdUIsU0FBQyxJQUFELEVBQU8sT0FBUDtTQUNyQixVQUFVLENBQUMsT0FBWCxDQUFtQix1QkFBbkI7QUFEcUI7O0FBR3ZCLHVCQUFBLEdBQTBCLFNBQUMsSUFBRDtBQUN4QixNQUFBO0VBQUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxVQUFGO0VBQ1YsTUFBQSxHQUFTLENBQUEsQ0FBRSxhQUFGO0VBQ1QsSUFBRyxJQUFIO0lBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBQTtXQUNBLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFGRjtHQUFBLE1BQUE7SUFJRSxPQUFPLENBQUMsSUFBUixDQUFBO1dBQ0EsTUFBTSxDQUFDLElBQVAsQ0FBQSxFQUxGOztBQUh3Qjs7QUFVcEI7Ozs7Ozs7Z0NBQ0osUUFBQSxHQUFVOztnQ0FDVixFQUFBLEdBQ0U7SUFBQSxRQUFBLEVBQVUsZUFBVjs7O2dDQUNGLE9BQUEsR0FDRTtJQUFBLFlBQUEsRUFBYyxLQUFkO0lBQ0EsTUFBQSxFQUFRLEtBRFI7OztnQ0FHRixZQUFBLEdBQWMsU0FBQTtBQUlaLFFBQUE7SUFBQSxhQUFBLEdBQWdCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxLQUFEO0FBQ2QsWUFBQTtRQUFBLElBQUcsQ0FBSSxLQUFDLENBQUEsT0FBTyxDQUFDLFlBQWhCO1VBQ0UsR0FBQSxHQUFNLEtBQUssQ0FBQztpQkFDWixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQWpCLENBQTBCLEdBQTFCLEVBQStCO1lBQUEsT0FBQSxFQUFTLElBQVQ7V0FBL0IsRUFGRjtTQUFBLE1BQUE7VUFJRSxVQUFBLEdBQWEsS0FBSyxDQUFDO2lCQUNuQixVQUFVLENBQUMsT0FBWCxDQUFtQixjQUFuQixFQUFtQyxLQUFDLENBQUEsT0FBTyxDQUFDLE1BQTVDLEVBQW9ELFNBQXBELEVBQStELFVBQS9ELEVBTEY7O01BRGM7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBO0lBT2hCLElBQUEsR0FBTyxVQUFVLENBQUMsT0FBWCxDQUFtQix1QkFBbkI7SUFDUCxHQUFBLEdBQU0sSUFBQyxDQUFBLEVBQUUsQ0FBQztJQUNWLEdBQUcsQ0FBQyxZQUFKLENBQ0U7TUFBQSxNQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sb0JBQU47UUFDQSxNQUFBLEVBQVEsT0FEUjtRQUVBLEtBQUEsRUFBTyxZQUZQO09BREY7TUFJQSxLQUFBLEVBQU8sS0FKUDtNQUtBLFdBQUEsRUFBYSxPQUxiO01BTUEsWUFBQSxFQUNFO1FBQ0U7VUFBQSxHQUFBLEVBQVEsT0FBRCxHQUFTLGtCQUFoQjtTQURGO09BUEY7TUFVQSxXQUFBLEVBQWEscUJBVmI7TUFXQSxVQUFBLEVBQVksb0JBWFo7TUFZQSxPQUFBLEVBQVMsdUJBWlQ7TUFhQSxVQUFBLEVBQVksYUFiWjtLQURGO0lBaUJBLElBQUcsSUFBQSxLQUFRLE1BQVg7YUFDRSxHQUFHLENBQUMsWUFBSixDQUFpQixVQUFqQixFQUE2QixJQUE3QixFQURGOztFQTlCWTs7OztHQVJrQixRQUFRLENBQUMsVUFBVSxDQUFDOztBQTJDdEQsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbkZ1bGxDYWxlbmRhciA9IHJlcXVpcmUgJ2Z1bGxjYWxlbmRhcidcblxueyBhcGlyb290IH0gPSByZXF1aXJlICcuL2NvbGxlY3Rpb25zJ1xuXG4jIEZJWE1FXG4jcmVxdWlyZSAnLi4vLi4vbm9kZV9tb2R1bGVzL2Z1bGxjYWxlbmRhci9kaXN0L2Z1bGxjYWxlbmRhci5jc3MnXG5yZXF1aXJlICdmdWxsY2FsZW5kYXIvZGlzdC9mdWxsY2FsZW5kYXIuY3NzJ1xuXG5IdWJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnaHViYnknXG5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyB0ZW1wbGF0ZXNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxubWVldGluZ19jYWxlbmRhciA9IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgdGMuZGl2ICcubGlzdHZpZXctaGVhZGVyJywgJ01lZXRpbmdzJ1xuICB0Yy5kaXYgJyNsb2FkaW5nJywgLT5cbiAgICB0Yy5oMiAtPlxuICAgICAgdGMuaSAnLmZhLmZhLXNwaW5uZXIuZmEtc3BpbidcbiAgICAgIHRjLnRleHQgJ0xvYWRpbmcgTWVldGluZ3MnXG4gIHRjLmRpdiAnI21haW5jYWxlbmRhcidcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5yZW5kZXJfY2FsZW5kYXJfZXZlbnQgPSAoY2FsRXZlbnQsIGVsZW1lbnQpIC0+XG4gIGNhbEV2ZW50LnVybCA9IFwiI2h1YmJ5L3ZpZXdtZWV0aW5nLyN7Y2FsRXZlbnQuaWR9XCJcbiAgZWxlbWVudC5jc3NcbiAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICdmb250LXNpemUnOiAnMC45ZW0nXG4gICAgJ2ZvbnQtZmFtaWx5JzogJ1JhbWJsYSdcbiAgICBcbmNhbGVuZGFyX3ZpZXdfcmVuZGVyID0gKHZpZXcsIGVsZW1lbnQpIC0+XG4gIEh1YkNoYW5uZWwucmVxdWVzdCAnbWFpbmNhbGVuZGFyOnNldC1kYXRlJ1xuICBcbmxvYWRpbmdfY2FsZW5kYXJfZXZlbnRzID0gKGJvb2wpIC0+XG4gIGxvYWRpbmcgPSAkICcjbG9hZGluZydcbiAgaGVhZGVyID0gJCAnLmZjLXRvb2xiYXInXG4gIGlmIGJvb2xcbiAgICBsb2FkaW5nLnNob3coKVxuICAgIGhlYWRlci5oaWRlKClcbiAgZWxzZVxuICAgIGxvYWRpbmcuaGlkZSgpXG4gICAgaGVhZGVyLnNob3coKVxuICBcbmNsYXNzIE1lZXRpbmdDYWxlbmRhclZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IG1lZXRpbmdfY2FsZW5kYXJcbiAgdWk6XG4gICAgY2FsZW5kYXI6ICcjbWFpbmNhbGVuZGFyJ1xuICBvcHRpb25zOlxuICAgIG1pbmljYWxlbmRhcjogZmFsc2VcbiAgICBsYXlvdXQ6IGZhbHNlXG5cbiAgb25Eb21SZWZyZXNoOiAoKSAtPlxuICAgICMkKCcubGlzdHZpZXctaGVhZGVyJykuY3NzXG4gICAgIyAgJ2ZvbnQtZmFtaWx5JzogJ1BsYXknXG4gICAgIyQoJy5saXN0dmlldy1oZWFkZXInKS50ZXh0IFwiTWVldGluZ3MuLi5cIlxuICAgIGNhbEV2ZW50Q2xpY2sgPSAoZXZlbnQpID0+XG4gICAgICBpZiBub3QgQG9wdGlvbnMubWluaWNhbGVuZGFyXG4gICAgICAgIHVybCA9IGV2ZW50LnVybFxuICAgICAgICBCYWNrYm9uZS5oaXN0b3J5Lm5hdmlnYXRlIHVybCwgdHJpZ2dlcjogdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBtZWV0aW5nX2lkID0gZXZlbnQuaWRcbiAgICAgICAgSHViQ2hhbm5lbC5yZXF1ZXN0ICd2aWV3LW1lZXRpbmcnLCBAb3B0aW9ucy5sYXlvdXQsICdtZWV0aW5nJywgbWVldGluZ19pZFxuICAgIGRhdGUgPSBIdWJDaGFubmVsLnJlcXVlc3QgJ21haW5jYWxlbmRhcjpnZXQtZGF0ZSdcbiAgICBjYWwgPSBAdWkuY2FsZW5kYXJcbiAgICBjYWwuZnVsbENhbGVuZGFyXG4gICAgICBoZWFkZXI6XG4gICAgICAgIGxlZnQ6ICdwcmV2WWVhciwgbmV4dFllYXInXG4gICAgICAgIGNlbnRlcjogJ3RpdGxlJ1xuICAgICAgICByaWdodDogJ3ByZXYsIG5leHQnXG4gICAgICB0aGVtZTogZmFsc2VcbiAgICAgIGRlZmF1bHRWaWV3OiAnbW9udGgnXG4gICAgICBldmVudFNvdXJjZXM6XG4gICAgICAgIFtcbiAgICAgICAgICB1cmw6IFwiI3thcGlyb290fS9tZWV0aW5ncy9odWJjYWxcIlxuICAgICAgICBdXG4gICAgICBldmVudFJlbmRlcjogcmVuZGVyX2NhbGVuZGFyX2V2ZW50XG4gICAgICB2aWV3UmVuZGVyOiBjYWxlbmRhcl92aWV3X3JlbmRlclxuICAgICAgbG9hZGluZzogbG9hZGluZ19jYWxlbmRhcl9ldmVudHNcbiAgICAgIGV2ZW50Q2xpY2s6IGNhbEV2ZW50Q2xpY2tcbiAgICAjIGlmIHRoZSBjdXJyZW50IGNhbGVuZGFyIGRhdGUgdGhhdCBoYXMgYmVlbiBzZXQsXG4gICAgIyBnbyB0byB0aGF0IGRhdGVcbiAgICBpZiBkYXRlICE9IHVuZGVmaW5lZFxuICAgICAgY2FsLmZ1bGxDYWxlbmRhcignZ290b0RhdGUnLCBkYXRlKVxuICAgICAgICBcbiAgICAgIFxuICAgIFxubW9kdWxlLmV4cG9ydHMgPSBNZWV0aW5nQ2FsZW5kYXJWaWV3XG4gIFxuIl19
