"use strict";

/**
 * viewmodel.Settings
 * The viewmodel.Settings module.
 * @author rishabhsrao
 */
define([
  "lib.use!lib.debug",
  "util.Constants",
  "util.ErrorHandler",
  "util.Storage",
  "util.GeoLocation",
  "util.Network",
  "model.City",
  "model.Settings",
  "knockout",
  "jquery"
],
function(
  debug,
  Constants,
  ErrorHandler,
  Storage,
  GeoLocation,
  Network,
  City,
  Settings,
  ko,
  jQuery
) {
  debug.log("Loading viewmodel.Settings");
  var Module = function() {
    var self = this;

    Module.prototype.init = function() {
      debug.log("viewmodel.Settings", "init");

      self.settings = Settings.create();

      self.autoDetectLocationOptions = ko.observableArray([
        { value: 0, text: "Off" },
        { value: 1, text: "On" }
      ]);

      self.storage = Storage.create();

      self.load();
    };

    Module.prototype.save = function() {
      debug.log("viewmodel.Settings", "save");

      self.storage.save(Constants.keyrings.storage.SETTINGS, self.settings);

      // Allow default action by returning true.
      // See http://knockoutjs.com/documentation/click-binding.html#note_3_allowing_the_default_click_action
      return true;
    };

    Module.prototype.load = function() {
      debug.log("viewmodel.Settings", "load");

      var data = null;

      if(Constants.errors.storage.FOUND === self.storage.isAlreadyAvailable(Constants.keyrings.storage.SETTINGS)) {
        data = self.storage.load(Constants.keyrings.storage.SETTINGS);
        self.settings.applyMappings(data);

        return true;
      } else {
        return false;
      }
    };

    self.init();

    return self;
  };

  return {
    create: function() {
      return new Module();
    }
  };
});