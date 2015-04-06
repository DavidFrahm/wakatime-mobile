angular.module('wakatime').factory('SettingsService', function () {
  return {
    set: function (settings) {
      return localStorage.setObject('settings', settings);
    },
    get: function () {
      return localStorage.getObject('settings');
    }
  }
});
