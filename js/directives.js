'use strict';

/* directives */



var app = angular.module('myApp.directives', [])

.directive('topbar', function ($log, $location) {
  return {
   restrict: 'A',
   replace: true,
   scope: {
     title: "@",
     previous: "&",
     kind: "@"
   },
   templateUrl: 'partials/topbar.html',
    controller: function($scope) {
      $scope.goMainMenu = function() {
        $location.url("/main");
      };
      $scope.goPrevious = function() {
        $scope.previous();
      };
    }
  };
});