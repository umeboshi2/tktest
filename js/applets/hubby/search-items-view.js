var Backbone, BootstrapFormView, HubChannel, ListItemsView, ListItemsViewComposite, Marionette, SimpleItemView, make_field_input, make_field_textarea, make_item_div, ref, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

tc = require('teacup');

BootstrapFormView = require('agate/src/bootstrap_formview');

ref = require('agate/src/templates/forms'), make_field_input = ref.make_field_input, make_field_textarea = ref.make_field_textarea;

HubChannel = Backbone.Radio.channel('hubby');

make_item_div = tc.renderable(function(item) {
  tc.div('.hubby-meeting-item-info', function() {
    tc.div('.hubby-meeting-item-agenda-num', "!agenda_num");
    tc.div('.hubby-meeting-item-fileid', item.file_id);
    return tc.div('.hubby-meeting-item-status', item.status);
  });
  return tc.div('.hubby-meeting-item-content', function() {
    return tc.p('.hubby-meeting-item-text', item.title);
  });
});

SimpleItemView = (function(superClass) {
  extend(SimpleItemView, superClass);

  function SimpleItemView() {
    return SimpleItemView.__super__.constructor.apply(this, arguments);
  }

  SimpleItemView.prototype.template = make_item_div;

  return SimpleItemView;

})(Backbone.Marionette.View);

ListItemsViewComposite = (function(superClass) {
  extend(ListItemsViewComposite, superClass);

  function ListItemsViewComposite() {
    return ListItemsViewComposite.__super__.constructor.apply(this, arguments);
  }

  ListItemsViewComposite.prototype.childView = SimpleItemView;

  ListItemsViewComposite.prototype.template = tc.renderable(function() {
    tc.div('.listview-header', function() {
      return tc.text("Items");
    });
    tc.hr();
    return tc.ul("#items-container.list-group");
  });

  return ListItemsViewComposite;

})(Backbone.Marionette.CompositeView);

ListItemsView = (function(superClass) {
  extend(ListItemsView, superClass);

  function ListItemsView() {
    return ListItemsView.__super__.constructor.apply(this, arguments);
  }

  ListItemsView.prototype.childView = SimpleItemView;

  ListItemsView.prototype.template = tc.renderable(function() {
    console.log("ListItemsView options", this.options);
    tc.div('.listview-header', function() {
      return tc.text("Items");
    });
    tc.hr();
    return tc.ul("#items-container.list-group");
  });

  return ListItemsView;

})(Backbone.Marionette.CollectionView);

module.exports = ListItemsView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9zZWFyY2gtaXRlbXMtdmlldy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9odWJieS9zZWFyY2gtaXRlbXMtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5S0FBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFFYixFQUFBLEdBQUssT0FBQSxDQUFRLFFBQVI7O0FBRUwsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLDhCQUFSOztBQUNwQixNQUMwQixPQUFBLENBQVEsMkJBQVIsQ0FEMUIsRUFBRSx1Q0FBRixFQUNFOztBQUdGLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBTWIsYUFBQSxHQUFnQixFQUFFLENBQUMsVUFBSCxDQUFjLFNBQUMsSUFBRDtFQUM1QixFQUFFLENBQUMsR0FBSCxDQUFPLDBCQUFQLEVBQW1DLFNBQUE7SUFDakMsRUFBRSxDQUFDLEdBQUgsQ0FBTyxnQ0FBUCxFQUF5QyxhQUF6QztJQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sNEJBQVAsRUFBcUMsSUFBSSxDQUFDLE9BQTFDO1dBQ0EsRUFBRSxDQUFDLEdBQUgsQ0FBTyw0QkFBUCxFQUFxQyxJQUFJLENBQUMsTUFBMUM7RUFIaUMsQ0FBbkM7U0FJQSxFQUFFLENBQUMsR0FBSCxDQUFPLDZCQUFQLEVBQXNDLFNBQUE7V0FDcEMsRUFBRSxDQUFDLENBQUgsQ0FBSywwQkFBTCxFQUFpQyxJQUFJLENBQUMsS0FBdEM7RUFEb0MsQ0FBdEM7QUFMNEIsQ0FBZDs7QUFRVjs7Ozs7OzsyQkFDSixRQUFBLEdBQVU7Ozs7R0FEaUIsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7QUFHM0M7Ozs7Ozs7bUNBQ0osU0FBQSxHQUFXOzttQ0FDWCxRQUFBLEdBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxTQUFBO0lBQ3RCLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsU0FBQTthQUN6QixFQUFFLENBQUMsSUFBSCxDQUFRLE9BQVI7SUFEeUIsQ0FBM0I7SUFFQSxFQUFFLENBQUMsRUFBSCxDQUFBO1dBQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSw2QkFBTjtFQUpzQixDQUFkOzs7O0dBRnlCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBUW5EOzs7Ozs7OzBCQUNKLFNBQUEsR0FBVzs7MEJBQ1gsUUFBQSxHQUFVLEVBQUUsQ0FBQyxVQUFILENBQWMsU0FBQTtJQUN0QixPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFaLEVBQXFDLElBQUMsQ0FBQSxPQUF0QztJQUNBLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVAsRUFBMkIsU0FBQTthQUN6QixFQUFFLENBQUMsSUFBSCxDQUFRLE9BQVI7SUFEeUIsQ0FBM0I7SUFFQSxFQUFFLENBQUMsRUFBSCxDQUFBO1dBQ0EsRUFBRSxDQUFDLEVBQUgsQ0FBTSw2QkFBTjtFQUxzQixDQUFkOzs7O0dBRmdCLFFBQVEsQ0FBQyxVQUFVLENBQUM7O0FBVWhELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiQmFja2JvbmUgPSByZXF1aXJlICdiYWNrYm9uZSdcbk1hcmlvbmV0dGUgPSByZXF1aXJlICdiYWNrYm9uZS5tYXJpb25ldHRlJ1xuXG50YyA9IHJlcXVpcmUgJ3RlYWN1cCdcblxuQm9vdHN0cmFwRm9ybVZpZXcgPSByZXF1aXJlICdhZ2F0ZS9zcmMvYm9vdHN0cmFwX2Zvcm12aWV3J1xueyBtYWtlX2ZpZWxkX2lucHV0XG4gIG1ha2VfZmllbGRfdGV4dGFyZWEgfSA9IHJlcXVpcmUgJ2FnYXRlL3NyYy90ZW1wbGF0ZXMvZm9ybXMnXG5cblxuSHViQ2hhbm5lbCA9IEJhY2tib25lLlJhZGlvLmNoYW5uZWwgJ2h1YmJ5J1xuXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgdGVtcGxhdGVzXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxubWFrZV9pdGVtX2RpdiA9IHRjLnJlbmRlcmFibGUgKGl0ZW0pIC0+XG4gIHRjLmRpdiAnLmh1YmJ5LW1lZXRpbmctaXRlbS1pbmZvJywgLT5cbiAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tYWdlbmRhLW51bScsIFwiIWFnZW5kYV9udW1cIlxuICAgIHRjLmRpdiAnLmh1YmJ5LW1lZXRpbmctaXRlbS1maWxlaWQnLCBpdGVtLmZpbGVfaWRcbiAgICB0Yy5kaXYgJy5odWJieS1tZWV0aW5nLWl0ZW0tc3RhdHVzJywgaXRlbS5zdGF0dXNcbiAgdGMuZGl2ICcuaHViYnktbWVldGluZy1pdGVtLWNvbnRlbnQnLCAtPlxuICAgIHRjLnAgJy5odWJieS1tZWV0aW5nLWl0ZW0tdGV4dCcsIGl0ZW0udGl0bGVcblxuY2xhc3MgU2ltcGxlSXRlbVZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLlZpZXdcbiAgdGVtcGxhdGU6IG1ha2VfaXRlbV9kaXZcbiAgXG5jbGFzcyBMaXN0SXRlbXNWaWV3Q29tcG9zaXRlIGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3XG4gIGNoaWxkVmlldzogU2ltcGxlSXRlbVZpZXdcbiAgdGVtcGxhdGU6IHRjLnJlbmRlcmFibGUgKCkgLT5cbiAgICB0Yy5kaXYgJy5saXN0dmlldy1oZWFkZXInLCAtPlxuICAgICAgdGMudGV4dCBcIkl0ZW1zXCJcbiAgICB0Yy5ocigpXG4gICAgdGMudWwgXCIjaXRlbXMtY29udGFpbmVyLmxpc3QtZ3JvdXBcIlxuXG5jbGFzcyBMaXN0SXRlbXNWaWV3IGV4dGVuZHMgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db2xsZWN0aW9uVmlld1xuICBjaGlsZFZpZXc6IFNpbXBsZUl0ZW1WaWV3XG4gIHRlbXBsYXRlOiB0Yy5yZW5kZXJhYmxlICgpIC0+XG4gICAgY29uc29sZS5sb2cgXCJMaXN0SXRlbXNWaWV3IG9wdGlvbnNcIiwgQG9wdGlvbnNcbiAgICB0Yy5kaXYgJy5saXN0dmlldy1oZWFkZXInLCAtPlxuICAgICAgdGMudGV4dCBcIkl0ZW1zXCJcbiAgICB0Yy5ocigpXG4gICAgdGMudWwgXCIjaXRlbXMtY29udGFpbmVyLmxpc3QtZ3JvdXBcIlxuICBcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0SXRlbXNWaWV3XG4gIFxuIl19
