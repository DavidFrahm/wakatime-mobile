angular.module('wakatime').controller('LeaderboardsCtrl', function ($scope, SettingsService, $http, $log) {
  $log.info("LeaderboardsCtrl()");

  var controller = this;

  $scope.init = function () {
    if (SettingsService.get() && SettingsService.get().apiKey) {
      var apiKey = SettingsService.get().apiKey;
      $http.get('https://wakatime.com/api/v1/leaders?api_key=' + apiKey)
        .then(function (response) {
          $scope.stats = response.data.data;
          //controller.initChart($scope.stats);
        });
    } else {
      $log.warn("No API key yet");
      $scope.noApiKey = true;
    }
  };

  $scope.init();
});
