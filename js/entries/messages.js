var Backbone, BaseMessage, BaseMessageCollection, MainChannel, Marionette, MessageChannel, MessageView, MessagesApp, MessagesView, Toolkit, display_message, fn, i, len, level, main_message_collection, message_box, ref, tc,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

Marionette = require('backbone.marionette');

Toolkit = require('marionette.toolkit');

tc = require('teacup');

MainChannel = Backbone.Radio.channel('global');

MessageChannel = Backbone.Radio.channel('messages');

BaseMessage = (function(superClass) {
  extend(BaseMessage, superClass);

  function BaseMessage() {
    return BaseMessage.__super__.constructor.apply(this, arguments);
  }

  BaseMessage.prototype.defaults = {
    level: 'info'
  };

  return BaseMessage;

})(Backbone.Model);

BaseMessageCollection = (function(superClass) {
  extend(BaseMessageCollection, superClass);

  function BaseMessageCollection() {
    return BaseMessageCollection.__super__.constructor.apply(this, arguments);
  }

  BaseMessageCollection.prototype.model = BaseMessage;

  return BaseMessageCollection;

})(Backbone.Collection);

main_message_collection = new BaseMessageCollection;

MessageChannel.reply('messages', function() {
  return main_message_collection;
});

display_message = (function(_this) {
  return function(msg, level, icon, delay) {
    var destroy, message;
    if (icon == null) {
      icon = false;
    }
    if (delay == null) {
      delay = 6000;
    }
    message = new BaseMessage({
      content: msg,
      level: level,
      icon: icon
    });
    if (level !== 'danger') {
      destroy = function() {
        return main_message_collection.remove(message);
      };
      setTimeout(destroy, delay);
    }
    return main_message_collection.add(message);
  };
})(this);

MessageChannel.reply('display-message', (function(_this) {
  return function(msg, lvl, icon) {
    if (lvl == null) {
      lvl = 'info';
    }
    if (icon == null) {
      icon = false;
    }
    console.warn('icon', icon);
    return display_message(msg, lvl, icon);
  };
})(this));

ref = ['success', 'info', 'warning', 'danger', 'brand'];
fn = function(level) {
  return MessageChannel.reply(level, (function(_this) {
    return function(msg, icon) {
      if (icon == null) {
        icon = false;
      }
      return display_message(msg, level, icon);
    };
  })(this));
};
for (i = 0, len = ref.length; i < len; i++) {
  level = ref[i];
  fn(level);
}

MessageChannel.reply('delete-message', (function(_this) {
  return function(model) {
    return main_message_collection.remove(model);
  };
})(this));

message_box = tc.renderable(function(msg) {
  var lvl;
  lvl = msg.level;
  if (lvl === 'error') {
    lvl = 'danger';
  }
  return tc.div(".alert.alert-" + lvl, function() {
    tc.button('.close', {
      type: 'button',
      'aria-hidden': true
    }, function() {
      return tc.raw('&times;');
    });
    if (msg.icon) {
      tc.span(".glyphicon.glyphicon-" + msg.icon);
    }
    return tc.text(msg.content);
  });
});

MessageView = (function(superClass) {
  extend(MessageView, superClass);

  function MessageView() {
    return MessageView.__super__.constructor.apply(this, arguments);
  }

  MessageView.prototype.template = message_box;

  MessageView.prototype.ui = {
    close_button: 'button.close'
  };

  MessageView.prototype.events = {
    'click @ui.close_button': 'destroy_message'
  };

  MessageView.prototype.destroy_message = function() {
    return MessageChannel.request('delete-message', this.model);
  };

  return MessageView;

})(Backbone.Marionette.View);

MessagesView = (function(superClass) {
  extend(MessagesView, superClass);

  function MessagesView() {
    return MessagesView.__super__.constructor.apply(this, arguments);
  }

  MessagesView.prototype.childView = MessageView;

  return MessagesView;

})(Backbone.Marionette.CollectionView);

MessagesApp = (function(superClass) {
  extend(MessagesApp, superClass);

  function MessagesApp() {
    return MessagesApp.__super__.constructor.apply(this, arguments);
  }

  MessagesApp.prototype.onBeforeStart = function() {
    this.collection = MessageChannel.request('messages');
    return this.setRegion(this.options.parentApp.getView().getRegion('messages'));
  };

  MessagesApp.prototype.onStart = function() {
    this.initPage();
    if (this.getState('startHistory')) {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    }
  };

  MessagesApp.prototype.initPage = function() {
    var view;
    view = new MessagesView({
      collection: this.collection
    });
    return this.showView(view);
  };

  return MessagesApp;

})(Toolkit.App);

module.exports = MessagesApp;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cmllcy9tZXNzYWdlcy5qcyIsInNvdXJjZXMiOlsiZW50cmllcy9tZXNzYWdlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx5TkFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsVUFBQSxHQUFhLE9BQUEsQ0FBUSxxQkFBUjs7QUFDYixPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBUjs7QUFFTCxXQUFBLEdBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFFBQXZCOztBQUNkLGNBQUEsR0FBaUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFmLENBQXVCLFVBQXZCOztBQUVYOzs7Ozs7O3dCQUNKLFFBQUEsR0FDRTtJQUFBLEtBQUEsRUFBTyxNQUFQOzs7OztHQUZzQixRQUFRLENBQUM7O0FBSTdCOzs7Ozs7O2tDQUNKLEtBQUEsR0FBTzs7OztHQUQyQixRQUFRLENBQUM7O0FBRzdDLHVCQUFBLEdBQTBCLElBQUk7O0FBQzlCLGNBQWMsQ0FBQyxLQUFmLENBQXFCLFVBQXJCLEVBQWlDLFNBQUE7U0FDL0I7QUFEK0IsQ0FBakM7O0FBR0EsZUFBQSxHQUFrQixDQUFBLFNBQUEsS0FBQTtTQUFBLFNBQUMsR0FBRCxFQUFNLEtBQU4sRUFBYSxJQUFiLEVBQXlCLEtBQXpCO0FBQ2hCLFFBQUE7O01BRDZCLE9BQUs7OztNQUFPLFFBQU07O0lBQy9DLE9BQUEsR0FBVSxJQUFJLFdBQUosQ0FDUjtNQUFBLE9BQUEsRUFBUyxHQUFUO01BQ0EsS0FBQSxFQUFPLEtBRFA7TUFFQSxJQUFBLEVBQU0sSUFGTjtLQURRO0lBTVYsSUFBTyxLQUFBLEtBQVMsUUFBaEI7TUFDRSxPQUFBLEdBQVUsU0FBQTtlQUFHLHVCQUF1QixDQUFDLE1BQXhCLENBQStCLE9BQS9CO01BQUg7TUFDVixVQUFBLENBQVcsT0FBWCxFQUFvQixLQUFwQixFQUZGOztXQUdB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LEdBQVUsU0FBQTtBQUNSLFFBQUE7SUFBQSxJQUFBLEdBQU8sSUFBSSxZQUFKLENBQ0w7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLFVBQWI7S0FESztXQUVQLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBVjtFQUhROzs7O0dBWGMsT0FBTyxDQUFDOztBQWdCbEMsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJCYWNrYm9uZSA9IHJlcXVpcmUgJ2JhY2tib25lJ1xuTWFyaW9uZXR0ZSA9IHJlcXVpcmUgJ2JhY2tib25lLm1hcmlvbmV0dGUnXG5Ub29sa2l0ID0gcmVxdWlyZSAnbWFyaW9uZXR0ZS50b29sa2l0J1xudGMgPSByZXF1aXJlICd0ZWFjdXAnXG5cbk1haW5DaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnZ2xvYmFsJ1xuTWVzc2FnZUNoYW5uZWwgPSBCYWNrYm9uZS5SYWRpby5jaGFubmVsICdtZXNzYWdlcydcblxuY2xhc3MgQmFzZU1lc3NhZ2UgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICBkZWZhdWx0czpcbiAgICBsZXZlbDogJ2luZm8nXG4gIFxuY2xhc3MgQmFzZU1lc3NhZ2VDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogQmFzZU1lc3NhZ2VcblxubWFpbl9tZXNzYWdlX2NvbGxlY3Rpb24gPSBuZXcgQmFzZU1lc3NhZ2VDb2xsZWN0aW9uXG5NZXNzYWdlQ2hhbm5lbC5yZXBseSAnbWVzc2FnZXMnLCAtPlxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvblxuXG5kaXNwbGF5X21lc3NhZ2UgPSAobXNnLCBsZXZlbCwgaWNvbj1mYWxzZSwgZGVsYXk9NjAwMCkgPT5cbiAgbWVzc2FnZSA9IG5ldyBCYXNlTWVzc2FnZVxuICAgIGNvbnRlbnQ6IG1zZ1xuICAgIGxldmVsOiBsZXZlbFxuICAgIGljb246IGljb25cbiAgIyMgRklYTUUgbWFrZSBkZWxheSBjb25maWd1cmFibGVcbiAgI2RlbGF5ID0gNjAwMFxuICB1bmxlc3MgbGV2ZWwgaXMgJ2RhbmdlcidcbiAgICBkZXN0cm95ID0gLT4gbWFpbl9tZXNzYWdlX2NvbGxlY3Rpb24ucmVtb3ZlIG1lc3NhZ2VcbiAgICBzZXRUaW1lb3V0IGRlc3Ryb3ksIGRlbGF5XG4gIG1haW5fbWVzc2FnZV9jb2xsZWN0aW9uLmFkZCBtZXNzYWdlXG4gIFxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2Rpc3BsYXktbWVzc2FnZScsIChtc2csIGx2bD0naW5mbycsIGljb249ZmFsc2UpID0+XG4gIGNvbnNvbGUud2FybiAnaWNvbicsIGljb25cbiAgZGlzcGxheV9tZXNzYWdlIG1zZywgbHZsLCBpY29uXG5cbmZvciBsZXZlbCBpbiBbJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJywgJ2RhbmdlcicsICdicmFuZCddXG4gIGRvIChsZXZlbCkgLT5cbiAgICBNZXNzYWdlQ2hhbm5lbC5yZXBseSBsZXZlbCwgKG1zZywgaWNvbj1mYWxzZSkgPT5cbiAgICAgIGRpc3BsYXlfbWVzc2FnZSBtc2csIGxldmVsLCBpY29uXG4gICAgICBcblxuTWVzc2FnZUNoYW5uZWwucmVwbHkgJ2RlbGV0ZS1tZXNzYWdlJywgKG1vZGVsKSA9PlxuICBtYWluX21lc3NhZ2VfY29sbGVjdGlvbi5yZW1vdmUgbW9kZWxcblxuXG5tZXNzYWdlX2JveCA9IHRjLnJlbmRlcmFibGUgKG1zZykgLT5cbiAgbHZsID0gbXNnLmxldmVsXG4gIGlmIGx2bCA9PSAnZXJyb3InXG4gICAgbHZsID0gJ2RhbmdlcidcbiAgdGMuZGl2IFwiLmFsZXJ0LmFsZXJ0LSN7bHZsfVwiLCAtPlxuICAgIHRjLmJ1dHRvbiAnLmNsb3NlJywgdHlwZTonYnV0dG9uJywgJ2FyaWEtaGlkZGVuJzogdHJ1ZSwgLT5cbiAgICAgIHRjLnJhdyAnJnRpbWVzOydcbiAgICBpZiBtc2cuaWNvblxuICAgICAgdGMuc3BhbiBcIi5nbHlwaGljb24uZ2x5cGhpY29uLSN7bXNnLmljb259XCJcbiAgICB0Yy50ZXh0IG1zZy5jb250ZW50XG4gICAgXG5jbGFzcyBNZXNzYWdlVmlldyBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuVmlld1xuICB0ZW1wbGF0ZTogbWVzc2FnZV9ib3hcbiAgdWk6XG4gICAgY2xvc2VfYnV0dG9uOiAnYnV0dG9uLmNsb3NlJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgQHVpLmNsb3NlX2J1dHRvbic6ICdkZXN0cm95X21lc3NhZ2UnXG5cbiAgZGVzdHJveV9tZXNzYWdlOiAtPlxuICAgIE1lc3NhZ2VDaGFubmVsLnJlcXVlc3QgJ2RlbGV0ZS1tZXNzYWdlJywgQG1vZGVsXG4gICAgXG5jbGFzcyBNZXNzYWdlc1ZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3XG4gIGNoaWxkVmlldzogTWVzc2FnZVZpZXdcbiAgXG5cblxuY2xhc3MgTWVzc2FnZXNBcHAgZXh0ZW5kcyBUb29sa2l0LkFwcFxuICBvbkJlZm9yZVN0YXJ0OiAtPlxuICAgIEBjb2xsZWN0aW9uID0gTWVzc2FnZUNoYW5uZWwucmVxdWVzdCAnbWVzc2FnZXMnXG4gICAgQHNldFJlZ2lvbiBAb3B0aW9ucy5wYXJlbnRBcHAuZ2V0VmlldygpLmdldFJlZ2lvbiAnbWVzc2FnZXMnXG4gICAgI2NvbnNvbGUubG9nIFwiUmVnaW9uIHNob3VsZCBiZSBzZXRcIiwgQGdldFJlZ2lvbigpXG4gICAgXG4gIG9uU3RhcnQ6IC0+XG4gICAgQGluaXRQYWdlKClcbiAgICBpZiBAZ2V0U3RhdGUgJ3N0YXJ0SGlzdG9yeSdcbiAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKSB1bmxlc3MgQmFja2JvbmUuaGlzdG9yeS5zdGFydGVkXG5cbiAgaW5pdFBhZ2U6IC0+XG4gICAgdmlldyA9IG5ldyBNZXNzYWdlc1ZpZXdcbiAgICAgIGNvbGxlY3Rpb246IEBjb2xsZWN0aW9uXG4gICAgQHNob3dWaWV3IHZpZXdcblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlc0FwcFxuICBcblxuIl19
