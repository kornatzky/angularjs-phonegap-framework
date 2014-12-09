'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCordova',
  'ngTouch',
  'angular-loading-bar', 
  'myApp.view1',
  'myApp.view2',
  'myApp.services',
  'myApp.directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/entrance'});
}]);



var onDeviceReady = function() {
	console.log("onDeviceReady");
	angular.bootstrap(document, ['myApp']);
};

document.addEventListener('deviceready', onDeviceReady);