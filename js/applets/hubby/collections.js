var Backbone, HubChannel, ItemCollection, MainMeetingModel, MeetingCollection, SimpleItemModel, SimpleMeetingModel, apiroot, main_meeting_list, qs,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Backbone = require('backbone');

qs = require('qs');

HubChannel = Backbone.Radio.channel('hubby');

apiroot = 'https://infidel-frobozz.rhcloud.com/api/dev/lgr';

SimpleMeetingModel = (function(superClass) {
  extend(SimpleMeetingModel, superClass);

  function SimpleMeetingModel() {
    return SimpleMeetingModel.__super__.constructor.apply(this, arguments);
  }

  SimpleMeetingModel.prototype.url = function() {
    return apiroot + "/meetings/" + this.id;
  };

  return SimpleMeetingModel;

})(Backbone.Model);

MainMeetingModel = (function(superClass) {
  extend(MainMeetingModel, superClass);

  function MainMeetingModel() {
    return MainMeetingModel.__super__.constructor.apply(this, arguments);
  }

  MainMeetingModel.prototype.url = function() {
    return apiroot + "/meetings/" + this.id;
  };

  return MainMeetingModel;

})(Backbone.Model);

MeetingCollection = (function(superClass) {
  extend(MeetingCollection, superClass);

  function MeetingCollection() {
    return MeetingCollection.__super__.constructor.apply(this, arguments);
  }

  MeetingCollection.prototype.model = SimpleMeetingModel;

  MeetingCollection.prototype.url = apiroot + "/meetings";

  return MeetingCollection;

})(Backbone.Collection);

SimpleItemModel = (function(superClass) {
  extend(SimpleItemModel, superClass);

  function SimpleItemModel() {
    return SimpleItemModel.__super__.constructor.apply(this, arguments);
  }

  SimpleItemModel.prototype.url = function() {
    return apiroot + "/items/" + this.id;
  };

  return SimpleItemModel;

})(Backbone.Model);

ItemCollection = (function(superClass) {
  extend(ItemCollection, superClass);

  function ItemCollection() {
    return ItemCollection.__super__.constructor.apply(this, arguments);
  }

  ItemCollection.prototype.model = SimpleItemModel;

  ItemCollection.prototype.url = function() {
    return apiroot + "/items/search?" + (qs.stringify(this.searchParams));
  };

  return ItemCollection;

})(Backbone.Collection);

main_meeting_list = new MeetingCollection;

HubChannel.reply('meetinglist', function() {
  return main_meeting_list;
});

module.exports = {
  apiroot: apiroot,
  MeetingCollection: MeetingCollection,
  MainMeetingModel: MainMeetingModel,
  ItemCollection: ItemCollection
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGV0cy9odWJieS9jb2xsZWN0aW9ucy5qcyIsInNvdXJjZXMiOlsiYXBwbGV0cy9odWJieS9jb2xsZWN0aW9ucy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4SUFBQTtFQUFBOzs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVI7O0FBQ1gsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztBQUVMLFVBQUEsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQWYsQ0FBdUIsT0FBdkI7O0FBRWIsT0FBQSxHQUFVOztBQUVKOzs7Ozs7OytCQUNKLEdBQUEsR0FBSyxTQUFBO1dBQ0EsT0FBRCxHQUFTLFlBQVQsR0FBcUIsSUFBQyxDQUFBO0VBRHJCOzs7O0dBRDBCLFFBQVEsQ0FBQzs7QUFJcEM7Ozs7Ozs7NkJBQ0osR0FBQSxHQUFLLFNBQUE7V0FDQSxPQUFELEdBQVMsWUFBVCxHQUFxQixJQUFDLENBQUE7RUFEckI7Ozs7R0FEd0IsUUFBUSxDQUFDOztBQUlsQzs7Ozs7Ozs4QkFDSixLQUFBLEdBQU87OzhCQUNQLEdBQUEsR0FBUSxPQUFELEdBQVM7Ozs7R0FGYyxRQUFRLENBQUM7O0FBSW5DOzs7Ozs7OzRCQUNKLEdBQUEsR0FBSyxTQUFBO1dBQ0EsT0FBRCxHQUFTLFNBQVQsR0FBa0IsSUFBQyxDQUFBO0VBRGxCOzs7O0dBRHVCLFFBQVEsQ0FBQzs7QUFLakM7Ozs7Ozs7MkJBQ0osS0FBQSxHQUFPOzsyQkFDUCxHQUFBLEdBQUssU0FBQTtXQUNBLE9BQUQsR0FBUyxnQkFBVCxHQUF3QixDQUFDLEVBQUUsQ0FBQyxTQUFILENBQWEsSUFBQyxDQUFBLFlBQWQsQ0FBRDtFQUR2Qjs7OztHQUZzQixRQUFRLENBQUM7O0FBTXRDLGlCQUFBLEdBQW9CLElBQUk7O0FBQ3hCLFVBQVUsQ0FBQyxLQUFYLENBQWlCLGFBQWpCLEVBQWdDLFNBQUE7U0FDOUI7QUFEOEIsQ0FBaEM7O0FBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtFQUFBLE9BQUEsRUFBUyxPQUFUO0VBQ0EsaUJBQUEsRUFBbUIsaUJBRG5CO0VBRUEsZ0JBQUEsRUFBa0IsZ0JBRmxCO0VBR0EsY0FBQSxFQUFnQixjQUhoQiIsInNvdXJjZXNDb250ZW50IjpbIkJhY2tib25lID0gcmVxdWlyZSAnYmFja2JvbmUnXG5xcyA9IHJlcXVpcmUgJ3FzJ1xuXG5IdWJDaGFubmVsID0gQmFja2JvbmUuUmFkaW8uY2hhbm5lbCAnaHViYnknXG5cbmFwaXJvb3QgPSAnaHR0cHM6Ly9pbmZpZGVsLWZyb2JvenoucmhjbG91ZC5jb20vYXBpL2Rldi9sZ3InXG5cbmNsYXNzIFNpbXBsZU1lZXRpbmdNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIHVybDogKCkgLT5cbiAgICBcIiN7YXBpcm9vdH0vbWVldGluZ3MvI3tAaWR9XCJcblxuY2xhc3MgTWFpbk1lZXRpbmdNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsXG4gIHVybDogKCkgLT5cbiAgICBcIiN7YXBpcm9vdH0vbWVldGluZ3MvI3tAaWR9XCJcbiAgICBcbmNsYXNzIE1lZXRpbmdDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvblxuICBtb2RlbDogU2ltcGxlTWVldGluZ01vZGVsXG4gIHVybDogXCIje2FwaXJvb3R9L21lZXRpbmdzXCJcbiAgXG5jbGFzcyBTaW1wbGVJdGVtTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbFxuICB1cmw6ICgpIC0+XG4gICAgXCIje2FwaXJvb3R9L2l0ZW1zLyN7QGlkfVwiXG4gIFxuXG5jbGFzcyBJdGVtQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb25cbiAgbW9kZWw6IFNpbXBsZUl0ZW1Nb2RlbFxuICB1cmw6ICgpIC0+XG4gICAgXCIje2FwaXJvb3R9L2l0ZW1zL3NlYXJjaD8je3FzLnN0cmluZ2lmeSBAc2VhcmNoUGFyYW1zfVwiXG4gICAgXG4gIFxubWFpbl9tZWV0aW5nX2xpc3QgPSBuZXcgTWVldGluZ0NvbGxlY3Rpb25cbkh1YkNoYW5uZWwucmVwbHkgJ21lZXRpbmdsaXN0JywgLT5cbiAgbWFpbl9tZWV0aW5nX2xpc3RcblxubW9kdWxlLmV4cG9ydHMgPVxuICBhcGlyb290OiBhcGlyb290XG4gIE1lZXRpbmdDb2xsZWN0aW9uOiBNZWV0aW5nQ29sbGVjdGlvblxuICBNYWluTWVldGluZ01vZGVsOiBNYWluTWVldGluZ01vZGVsXG4gIEl0ZW1Db2xsZWN0aW9uOiBJdGVtQ29sbGVjdGlvblxuICBcbiJdfQ==
