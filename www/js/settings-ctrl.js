angular.module('wakatime').controller('SettingsCtrl', function ($scope, $log, SettingsService, $state) {
  $log.info("SettingsCtrl()");

  $scope.init = function () {
    $scope.settings = SettingsService.get();
  };

  $scope.saveSettings = function (SettingsForm, settings) {
    $log.debug("saveSettings()");
    $log.debug("SettingsForm", SettingsForm);
    $log.debug("settings", settings);
    $log.debug("SettingsForm.$valid:", SettingsForm.$valid);

		if (SettingsForm.$invalid) {
			return;
		}
    SettingsService.set(settings);
    $state.go('tab.dash');
  };

  $scope.init();
});
