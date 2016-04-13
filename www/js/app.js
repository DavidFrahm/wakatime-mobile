Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    return JSON.parse(this.getItem(key));
};

angular.module('wakatime', ['ionic', 'ngCordova', 'nvd3'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                requestError: function (rejection) {
                    $rootScope.$broadcast('loading:hide');
                    return q.reject(rejection)
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                },
                responseError: function (rejection) {
                    $rootScope.$broadcast('loading:hide');
                    return $q.reject(rejection)
                }
            }
        })
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                },
                cache: false
            })

            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })

    .run(function ($ionicPlatform, $ionicLoading, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        });
    });
