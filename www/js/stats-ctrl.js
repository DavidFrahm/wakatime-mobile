angular.module('wakatime').controller('DashCtrl', function ($scope, SettingsService, $http, $log) {
  $log.info("DashCtrl()");

  var controller = this;

  $scope.init = function () {
    if (SettingsService.get() && SettingsService.get().apiKey) {
      var apiKey = SettingsService.get().apiKey;
      $http.get('https://wakatime.com/api/v1/users/current/?api_key=' + apiKey)
        .then(function (response) {
          $log.debug("Current user:", response.data);
        });
      $http.get('https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=' + apiKey)
        .then(function (response) {
          $log.debug("Stats:", response.data.data);
          $scope.stats = response.data.data;
          controller.initChart($scope.stats);
        });
    } else {
      $log.warn("No API key yet");
      $scope.noApiKey = true;
    }
  };

  $scope.chartOptions = {
    chart: {
      type: 'pieChart',
      height: 400,
      donut: true,
      x: function (d) {
        return d.key;
      },
      y: function (d) {
        return d.y;
      },
      showLabels: true,

      //pie: {
      //    startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
      //    endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
      //},
      transitionDuration: 500,
      legend: {
        margin: {
          top: 5,
          right: 100,
          bottom: 0,
          left: 0
        }
      }
    }
  };

  controller.initChart = function (stats) {
    $scope.chartProjectData = [];
    $scope.chartLanguageData = [];

    for (var i = 0; i < stats.projects.length; i++) {
      var project = stats.projects[i];
      $scope.chartProjectData.push({key: project.name, y: project.total_seconds});
    }

    for (var i = 0; i < stats.languages.length; i++) {
      var language = stats.languages[i];
      $scope.chartLanguageData.push({key: language.name, y: language.total_seconds});
    }
  };

  $scope.init();
});
