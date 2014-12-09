'use strict';

angular.module('myApp.taxis', ['ngRoute', 'ngCordova', 'ngTouch',   
  'angular-loading-bar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/taxis', {
    templateUrl: 'views/taxis/taxis.html',
    controller: 'taxisCtrl'
  });
}])

.controller('taxisCtrl', ['$scope', '$log', '$window', '$location',
  function($scope, $log, $window, $location) {
    $log.debug("taxisCtrl");
    $scope.clickPrevious = function() {
      $window.history.back();
    };
}]);
