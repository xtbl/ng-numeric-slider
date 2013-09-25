'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('numericSliderCtrl',['$scope', function($scope) {
    $scope.numericSliderConfig = { "help":"helpurl", "minValue":1,"maxValue":100 };
  }]);