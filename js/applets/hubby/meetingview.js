var Backbone, HubChannel, Marionette, ShowMeetingView, capitalize, compare_meeting_item, compare_property_function, make_actions_section, make_agenda_link, make_attachments_section, make_item_object, make_meeting_header, make_meeting_item_list, make_meeting_items, show_meeting_template, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

require('jquery-ui/ui/widgets/draggable');

HubChannel = Backbone.Radio.channel('hubby');

capitalize = require('agate/src/apputil').capitalize;

compare_property_function = function(property) {
  return function(a, b) {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  };
};

compare_meeting_item = compare_property_function('item_order');

make_meeting_items = function(meeting) {
  var i, item, items, len, meeting_items, mitem, ref;
  meeting_items = [];
  items = meeting.items;
  ref = meeting.items;
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    mitem = item.lgr_meeting_item;
    meeting_items.push(item.lgr_meeting_item);
  }
  meeting_items.sort(compare_meeting_item);
  return meeting_items;
};

make_item_object = function(meeting) {
  var Items, i, item, len, ref;
  Items = {};
  ref = meeting.items;
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    Items[item.id] = item;
  }
  return Items;
};

make_agenda_link = function(meeting, dtype) {
  var qry;
  if (dtype == null) {
    dtype = 'A';
  }
  qry = "M=" + dtype + "&ID=" + meeting.id + "&GUID=" + meeting.guid;
  return "http://hattiesburg.legistar.com/View.ashx?" + qry;
};

make_meeting_header = tc.renderable(function(meeting) {
  return tc.div('.media.hubby-meeting-header', function() {
    tc.div('.media-left.media-middle', function() {
      return tc.div('.media-object.hubby-meeting-header-agenda', function() {
        tc.i('.fa.fa-newspaper-o');
        return tc.a({
          href: make_agenda_link(meeting)
        }, "Agenda: " + meeting.agenda_status);
      });
    });
    tc.div('.media-body.hubby-meeting-header-text-foo', function() {
      return tc.h3('.text-center', "" + meeting.title);
    });
    return tc.div('.media-right.media-middle', function() {
      return tc.div('.media-object.hubby-meeting-header-minutes', function() {
        tc.i('.fa.fa-commenting-o');
        return tc.a({
          href: make_agenda_link(meeting, 'M')
        }, "Minutes: " + meeting.minutes_status);
      });
    });
  });
});

make_attachments_section = tc.renderable(function(item) {
  var marker;
  if (item.attachments !== void 0 && item.attachments.length) {
    marker = "One Attachment";
    if (item.attachments.length > 1) {
      marker = item.attachments.length + " Attachments";
    }
    tc.span('.btn.btn-sm.hubby-meeting-item-attachment-marker', marker);
    return tc.div('.hubby-meeting-item-attachments', function() {
      var att, i, len, ref, results;
      tc.div('.hubby-meeting-item-attachments-header', 'Attachments');
      ref = item.attachments;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        att = ref[i];
        results.push(tc.div(function() {
          var url;
          url = "http://hattiesburg.legistar.com/" + att.link;
          return tc.a({
            href: url
          }, att.name);
        }));
      }
      return results;
    });
  }
});

make_actions_section = tc.renderable(function(item) {
  var marker;
  if ((item.actions != null) && item.actions.length) {
    marker = 'Action';
    if (item.actions.length > 1) {
      marker = 'Actions';
    }
    tc.span('.btn.btn-sm.hubby-meeting-item-action-marker', marker);
    return tc.div('.hubby-meeting-item-actions', function() {
      var action, i, len, lines, nl, ref, results;
      ref = item.actions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        nl = /\r?\n/;
        lines = action.action_text.split(nl);
        results.push(tc.div('.hubby-action-text', {
          width: 80
        }, function() {
          var j, len1, line, results1;
          tc.hr();
          results1 = [];
          for (j = 0, len1 = lines.length; j < len1; j++) {
            line = lines[j];
            results1.push(tc.p(line));
          }
          return results1;
        }));
      }
      return results;
    });
  }
});

make_meeting_item_list = tc.renderable(function(meeting) {
  return tc.div('.hubby-meeting-item-list', function() {
    var agenda_section, i, item, len, mitem, ref, results, section_header;
    agenda_section = 'start';
    ref = meeting.meeting_items;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      mitem = ref[i];
      item = meeting.Items[mitem.item_id];
      if (mitem.type !== agenda_section && mitem.type) {
        agenda_section = mitem.type;
        section_header = capitalize(agenda_section + ' Agenda');
        tc.h3('.hubby-meeting-agenda-header', section_header);
      }
      results.push(tc.div('.hubby-meeting-item', function() {
        tc.div('.hubby-meeting-item-info', function() {
          var agenda_num;
          agenda_num = mitem.agenda_num;
          if (!agenda_num) {
            agenda_num = "(--)";
          }
          tc.div('.hubby-meeting-item-agenda-num', agenda_num);
          tc.div('.hubby-meeting-item-fileid', item.file_id);
          return tc.div('.hubby-meeting-item-status', item.status);
        });
        return tc.div('.hubby-meeting-item-content', function() {
          tc.p('.hubby-meeting-item-text', item.title);
          return tc.div(function() {
            make_attachments_section(item);
            return make_actions_section(item);
          });
        });
      }));
    }
    return results;
  });
});

show_meeting_template = tc.renderable(function(meeting) {
  meeting.meeting_items = make_meeting_items(meeting);
  meeting.Items = make_item_object(meeting);
  window.meeting = meeting;
  make_meeting_header(meeting);
  return make_meeting_item_list(meeting);
});

ShowMeetingView = (function(superClass) {
  extend(ShowMeetingView, superClass);

  function ShowMeetingView() {
    return ShowMeetingView.__super__.constructor.apply(this, arguments);
  }

  ShowMeetingView.prototype.template = show_meeting_template;

  ShowMeetingView.prototype.onDomRefresh = function() {
    var actions, attachments;
    attachments = $('.hubby-meeting-item-attachments');
    attachments.hide();
    actions = $('.hubby-meeting-item-actions');
    actions.hide();
    attachments.draggable();
    $('.hubby-meeting-item-info').click(function() {
      return $(this).next().toggle();
    });
    $('.hubby-meeting-item-attachment-marker').click(function() {
      return $(this).next().toggle();
    });
    return $('.hubby-meeting-item-action-marker').click(function() {
      return $(this).next().toggle();
    });
  };

  return ShowMeetingView;

})(Backbone.Marionette.View);

module.exports = ShowMeetingView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9tZWV0aW5ndmlldy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9odWJieS9tZWV0aW5ndmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4UkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsT0FBQSxDQUFRLGdDQUFSOztBQUVBLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBS1gsYUFBZSxPQUFBLENBQVEsbUJBQVI7O0FBRWpCLHlCQUFBLEdBQTRCLFNBQUMsUUFBRDtTQUMxQixTQUFDLENBQUQsRUFBRyxDQUFIO0lBQ0UsSUFBRyxDQUFFLENBQUEsUUFBQSxDQUFGLEdBQWMsQ0FBRSxDQUFBLFFBQUEsQ0FBbkI7QUFDRSxhQUFPLENBQUMsRUFEVjs7SUFFQSxJQUFHLENBQUUsQ0FBQSxRQUFBLENBQUYsR0FBYyxDQUFFLENBQUEsUUFBQSxDQUFuQjtBQUNFLGFBQU8sRUFEVDs7QUFFQSxXQUFPO0VBTFQ7QUFEMEI7O0FBUTVCLG9CQUFBLEdBQXVCLHlCQUFBLENBQTBCLFlBQTFCOztBQUV2QixrQkFBQSxHQUFxQixTQUFDLE9BQUQ7QUFDbkIsTUFBQTtFQUFBLGFBQUEsR0FBZ0I7RUFDaEIsS0FBQSxHQUFRLE9BQU8sQ0FBQztBQUNoQjtBQUFBLE9BQUEscUNBQUE7O0lBQ0UsS0FBQSxHQUFRLElBQUksQ0FBQztJQUNiLGFBQWEsQ0FBQyxJQUFkLENBQW1CLElBQUksQ0FBQyxnQkFBeEI7QUFGRjtFQUdBLGFBQWEsQ0FBQyxJQUFkLENBQW1CLG9CQUFuQjtTQUNBO0FBUG1COztBQVNyQixnQkFBQSxHQUFtQixTQUFDLE9BQUQ7QUFDakIsTUFBQTtFQUFBLEtBQUEsR0FBUTtBQUNSO0FBQUEsT0FBQSxxQ0FBQTs7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UixDQUFBLENBQWMsQ0FBQyxNQUFmLENBQUE7SUFEa0MsQ0FBcEM7SUFFQSxDQUFBLENBQUUsdUNBQUYsQ0FBMEMsQ0FBQyxLQUEzQyxDQUFpRCxTQUFBO2FBQy9DLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQUEsQ0FBYyxDQUFDLE1BQWYsQ0FBQTtJQUQrQyxDQUFqRDtXQUVBLENBQUEsQ0FBRSxtQ0FBRixDQUFzQyxDQUFDLEtBQXZDLENBQTZDLFNBQUE7YUFDM0MsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBQSxDQUFjLENBQUMsTUFBZixDQUFBO0lBRDJDLENBQTdDO0VBVlk7Ozs7R0FIYyxRQUFRLENBQUMsVUFBVSxDQUFDOztBQWdCbEQsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5cbnRjID0gcmVxdWlyZSAndGVhY3VwJ1xuXG5yZXF1aXJlICdqcXVlcnktdWkvdWkvd2lkZ2V0cy9kcmFnZ2FibGUnXG5cbkh1YkNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdodWJieSdcblxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIHRlbXBsYXRlc1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG57IGNhcGl0YWxpemUgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy9hcHB1dGlsJ1xuXG5jb21wYXJlX3Byb3BlcnR5X2Z1bmN0aW9uID0gKHByb3BlcnR5KSAtPlxuICAoYSxiKSAtPlxuICAgIGlmIGFbcHJvcGVydHldIDwgYltwcm9wZXJ0eV1cbiAgICAgIHJldHVybiAtMVxuICAgIGlmIGFbcHJvcGVydHldID4gYltwcm9wZXJ0eV1cbiAgICAgIHJldHVybiAxXG4gICAgcmV0dXJuIDBcblxuY29tcGFyZV9tZWV0aW5nX2l0ZW0gPSBjb21wYXJlX3Byb3BlcnR5X2Z1bmN0aW9uICdpdGVtX29yZGVyJ1xuXG5tYWtlX21lZXRpbmdfaXRlbXMgPSAobWVldGluZykgLT5cbiAgbWVldGluZ19pdGVtcyA9IFtdXG4gIGl0ZW1zID0gbWVldGluZy5pdGVtc1xuICBmb3IgaXRlbSBpbiBtZWV0aW5nLml0ZW1zXG4gICAgbWl0ZW0gPSBpdGVtLmxncl9tZWV0aW5nX2l0ZW1cbiAgICBtZWV0aW5nX2l0ZW1zLnB1c2ggaXRlbS5sZ3JfbWVldGluZ19pdGVtXG4gIG1lZXRpbmdfaXRlbXMuc29ydCBjb21wYXJlX21lZXRpbmdfaXRlbVxuICBtZWV0aW5nX2l0ZW1zXG5cbm1ha2VfaXRlbV9vYmplY3QgPSAobWVldGluZykgLT5cbiAgSXRlbXMgPSB7fVxuICBmb3IgaXRlbSBpbiBtZWV0aW5nLml0ZW1zXG4gICAgSXRlbXNbaXRlbS5pZF0gPSBpdGVtXG4gIEl0ZW1zXG5cbm1ha2VfYWdlbmRhX2xpbmsgPSAobWVldGluZywgZHR5cGU9J0EnKSAtPlxuICBxcnkgPSBcIk09I3tkdHlwZX0mSUQ9I3ttZWV0aW5nLmlkfSZHVUlEPSN7bWVldGluZy5ndWlkfVwiXG4gIHJldHVybiBcImh0dHA6Ly9oYXR0aWVzYnVyZy5sZWdpc3Rhci5jb20vVmlldy5hc2h4PyN7cXJ5fVwiXG5cbm1ha2VfbWVldGluZ19oZWFkZXIgPSB0Yy5yZW5kZXJhYmxlIChtZWV0aW5nKSAtPlxuICB0Yy5kaXYgJy5tZWRpYS5odWJieS1tZWV0aW5nLWhlYWRlcicsIC0+XG4gICAgdGMuZGl2ICcubWVkaWEtbGVmdC5tZWRpYS1taWRkbGUnLCAtPlxuICAgICAgdGMuZGl2ICcubWVkaWEtb2JqZWN0Lmh1YmJ5LW1lZXRpbmctaGVhZGVyLWFnZW5kYScsIC0+XG4gICAgICAgIHRjLmkgJy5mYS5mYS1uZXdzcGFwZXItbydcbiAgICAgICAgdGMuYSBocmVmOm1ha2VfYWdlbmRhX2xpbmsobWVldGluZyksIFwiQWdlbmRhOiAje21lZXRpbmcuYWdlbmRhX3N0YXR1c31cIlxuICAgIHRjLmRpdiAnLm1lZGlhLWJvZHkuaHViYnktbWVldGluZy1oZWFkZXItdGV4dC1mb28nLCAtPlxuICAgICAgdGMuaDMgJy50ZXh0LWNlbnRlcicsIFwiI3ttZWV0aW5nLnRpdGxlfVwiXG4gICAgdGMuZGl2ICcubWVkaWEtcmlnaHQubWVkaWEtbWlkZGxlJywgLT5cbiAgICAgIHRjLmRpdiAnLm1lZGlhLW9iamVjdC5odWJieS1tZWV0aW5nLWhlYWRlci1taW51dGVzJywgLT5cbiAgICAgICAgdGMuaSAnLmZhLmZhLWNvbW1lbnRpbmctbydcbiAgICAgICAgdGMuYSBocmVmOm1ha2VfYWdlbmRhX2xpbmsobWVldGluZywgJ00nKSwgXCJNaW51dGVzOiAje21lZXRpbmcubWludXRlc19zdGF0dXN9XCJcblxubWFrZV9hdHRhY2htZW50c19zZWN0aW9uID0gdGMucmVuZGVyYWJsZSAoaXRlbSkgLT5cbiAgaWYgaXRlbS5hdHRhY2htZW50cyAhPSB1bmRlZmluZWQgYW5kIGl0ZW0uYXR0YWNobWVudHMubGVuZ3RoXG4gICAgbWFya2VyID0gXCJPbmUgQXR0YWNobWVudFwiXG4gICAgaWYgaXRlbS5hdHRhY2htZW50cy5sZW5ndGggPiAxXG4gICAgICBtYXJrZXIgPSBcIiN7aXRlbS5hdHRhY2htZW50cy5sZW5ndGh9IEF0dGFjaG1lbnRzXCJcbiAgICB0Yy5zcGFuICcuYnRuLmJ0bi1zbS5odWJieS1tZWV0aW5nLWl0ZW0tYXR0YWNobWVudC1tYXJrZXInLCBtYXJrZXJcbiAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tYXR0YWNobWVudHMnLCAtPlxuICAgICAgdGMuZGl2ICcuaHViYnktbWVldGluZy1pdGVtLWF0dGFjaG1lbnRzLWhlYWRlcicsICdBdHRhY2htZW50cydcbiAgICAgIGZvciBhdHQgaW4gaXRlbS5hdHRhY2htZW50c1xuICAgICAgICB0Yy5kaXYgLT5cbiAgICAgICAgICB1cmwgPSBcImh0dHA6Ly9oYXR0aWVzYnVyZy5sZWdpc3Rhci5jb20vI3thdHQubGlua31cIlxuICAgICAgICAgIHRjLmEgaHJlZjp1cmwsIGF0dC5uYW1lXG4gIFxubWFrZV9hY3Rpb25zX3NlY3Rpb24gPSB0Yy5yZW5kZXJhYmxlIChpdGVtKSAtPlxuICBpZiBpdGVtLmFjdGlvbnM/IGFuZCBpdGVtLmFjdGlvbnMubGVuZ3RoXG4gICAgbWFya2VyID0gJ0FjdGlvbidcbiAgICBpZiBpdGVtLmFjdGlvbnMubGVuZ3RoID4gMVxuICAgICAgbWFya2VyID0gJ0FjdGlvbnMnXG4gICAgdGMuc3BhbiAnLmJ0bi5idG4tc20uaHViYnktbWVldGluZy1pdGVtLWFjdGlvbi1tYXJrZXInLCBtYXJrZXJcbiAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tYWN0aW9ucycsIC0+XG4gICAgICBmb3IgYWN0aW9uIGluIGl0ZW0uYWN0aW9uc1xuICAgICAgICBubCA9IC9cXHI/XFxuL1xuICAgICAgICBsaW5lcyA9IGFjdGlvbi5hY3Rpb25fdGV4dC5zcGxpdCBubFxuICAgICAgICB0Yy5kaXYgJy5odWJieS1hY3Rpb24tdGV4dCcsIHdpZHRoOjgwLCAtPlxuICAgICAgICAgICN0Yy5icigpXG4gICAgICAgICAgI3RjLmJyKClcbiAgICAgICAgICAjIEZJWE1FLCB0aGlzIGlzIHVzZWQgZm9yIHNwYWNpbmdcbiAgICAgICAgICB0Yy5ocigpXG4gICAgICAgICAgZm9yIGxpbmUgaW4gbGluZXNcbiAgICAgICAgICAgIHRjLnAgbGluZVxuICBcbm1ha2VfbWVldGluZ19pdGVtX2xpc3QgPSB0Yy5yZW5kZXJhYmxlIChtZWV0aW5nKSAtPlxuICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tbGlzdCcsIC0+XG4gICAgYWdlbmRhX3NlY3Rpb24gPSAnc3RhcnQnXG4gICAgZm9yIG1pdGVtIGluIG1lZXRpbmcubWVldGluZ19pdGVtc1xuICAgICAgaXRlbSA9IG1lZXRpbmcuSXRlbXNbbWl0ZW0uaXRlbV9pZF1cbiAgICAgIGlmIG1pdGVtLnR5cGUgIT0gYWdlbmRhX3NlY3Rpb24gYW5kIG1pdGVtLnR5cGVcbiAgICAgICAgYWdlbmRhX3NlY3Rpb24gPSBtaXRlbS50eXBlXG4gICAgICAgIHNlY3Rpb25faGVhZGVyID0gY2FwaXRhbGl6ZSBhZ2VuZGFfc2VjdGlvbiArICcgQWdlbmRhJ1xuICAgICAgICB0Yy5oMyAnLmh1YmJ5LW1lZXRpbmctYWdlbmRhLWhlYWRlcicsIHNlY3Rpb25faGVhZGVyXG4gICAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0nLCAtPlxuICAgICAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0taW5mbycsIC0+XG4gICAgICAgICAgYWdlbmRhX251bSA9IG1pdGVtLmFnZW5kYV9udW1cbiAgICAgICAgICBpZiBub3QgYWdlbmRhX251bVxuICAgICAgICAgICAgYWdlbmRhX251bSA9IFwiKC0tKVwiXG4gICAgICAgICAgdGMuZGl2ICcuaHViYnktbWVldGluZy1pdGVtLWFnZW5kYS1udW0nLCBhZ2VuZGFfbnVtXG4gICAgICAgICAgdGMuZGl2ICcuaHViYnktbWVldGluZy1pdGVtLWZpbGVpZCcsIGl0ZW0uZmlsZV9pZFxuICAgICAgICAgIHRjLmRpdiAnLmh1YmJ5LW1lZXRpbmctaXRlbS1zdGF0dXMnLCBpdGVtLnN0YXR1c1xuICAgICAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tY29udGVudCcsIC0+XG4gICAgICAgICAgdGMucCAnLmh1YmJ5LW1lZXRpbmctaXRlbS10ZXh0JywgaXRlbS50aXRsZVxuICAgICAgICAgIHRjLmRpdiAtPlxuICAgICAgICAgICAgbWFrZV9hdHRhY2htZW50c19zZWN0aW9uIGl0ZW1cbiAgICAgICAgICAgIG1ha2VfYWN0aW9uc19zZWN0aW9uIGl0ZW1cblxuICAgICAgICAgIFxuc2hvd19tZWV0aW5nX3RlbXBsYXRlID0gdGMucmVuZGVyYWJsZSAobWVldGluZykgLT5cbiAgbWVldGluZy5tZWV0aW5nX2l0ZW1zID0gbWFrZV9tZWV0aW5nX2l0ZW1zIG1lZXRpbmdcbiAgbWVldGluZy5JdGVtcyA9IG1ha2VfaXRlbV9vYmplY3QgbWVldGluZ1xuICB3aW5kb3cubWVldGluZyA9IG1lZXRpbmdcbiAgI3RjLmRpdiAnLmh1YmJ5LW1lZXRpbmctaGVhZGVyJywgLT5cbiAgbWFrZV9tZWV0aW5nX2hlYWRlciBtZWV0aW5nXG4gIG1ha2VfbWVldGluZ19pdGVtX2xpc3QgbWVldGluZ1xuICBcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmNsYXNzIFNob3dNZWV0aW5nVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogc2hvd19tZWV0aW5nX3RlbXBsYXRlXG4gIFxuICBvbkRvbVJlZnJlc2g6ICgpIC0+XG4gICAgYXR0YWNobWVudHMgPSAkICcuaHViYnktbWVldGluZy1pdGVtLWF0dGFjaG1lbnRzJ1xuICAgIGF0dGFjaG1lbnRzLmhpZGUoKVxuICAgIGFjdGlvbnMgPSAkICcuaHViYnktbWVldGluZy1pdGVtLWFjdGlvbnMnXG4gICAgYWN0aW9ucy5oaWRlKClcbiAgICBhdHRhY2htZW50cy5kcmFnZ2FibGUoKVxuICAgICQoJy5odWJieS1tZWV0aW5nLWl0ZW0taW5mbycpLmNsaWNrIC0+XG4gICAgICAkKHRoaXMpLm5leHQoKS50b2dnbGUoKVxuICAgICQoJy5odWJieS1tZWV0aW5nLWl0ZW0tYXR0YWNobWVudC1tYXJrZXInKS5jbGljayAtPlxuICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlKClcbiAgICAkKCcuaHViYnktbWVldGluZy1pdGVtLWFjdGlvbi1tYXJrZXInKS5jbGljayAtPlxuICAgICAgJCh0aGlzKS5uZXh0KCkudG9nZ2xlKClcbiAgIFxubW9kdWxlLmV4cG9ydHMgPSBTaG93TWVldGluZ1ZpZXdcbiAgXG4iXX0=
